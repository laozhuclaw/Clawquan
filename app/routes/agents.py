"""
Agent Routes - CRUD operations for AI Agents
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from ..models import Agent, Organization, User
from ..database import get_db
from ..routes.auth import get_current_user

router = APIRouter(prefix="/api/agents", tags=["Agents"])


def _agent_to_dict(agent: Agent) -> dict:
    """Serialize an Agent as a non-human identity for the frontend."""
    return {
        "id": str(agent.id),
        "name": agent.name,
        "description": agent.description,
        "category": agent.category,
        "tags": agent.tags or [],
        "icon": agent.icon,
        "api_endpoint": agent.api_endpoint,
        "is_public": agent.is_public,
        "star_count": agent.star_count,
        "usage_count": agent.usage_count,
        "organization_id": agent.organization_id,
        "organization_name": agent.organization.name if agent.organization else None,
        "owner_id": agent.owner_id,
        "identity_type": "AGENT",
        "is_human": False,
    }


def _split_tags(tags: Optional[str]) -> list[str]:
    if not tags:
        return []
    return [t.strip() for t in tags.split(",") if t.strip()]


@router.get("/", response_model=List[dict])
async def list_agents(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Agent)
    
    if category:
        query = query.filter(Agent.category == category)
    
    if search:
        query = query.filter(
            (Agent.name.ilike(f"%{search}%")) | 
            (Agent.description.ilike(f"%{search}%"))
        )
    
    agents = query.offset(skip).limit(limit).all()

    return [_agent_to_dict(agent) for agent in agents]

@router.get("/{agent_id}", response_model=dict)
async def get_agent(agent_id: str, db: Session = Depends(get_db)):
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    return _agent_to_dict(agent)


@router.post("/auto-register", status_code=status.HTTP_201_CREATED)
async def auto_register_agent(
    name: str,
    description: str = "",
    category: str = "自动注册智能体",
    icon: str = "🤖",
    tags: Optional[str] = None,
    api_endpoint: Optional[str] = None,
    organization_id: Optional[str] = None,
    is_public: bool = True,
    db: Session = Depends(get_db)
):
    """
    自动注册一个非人类 Agent 身份。

    这个入口不会创建 User, 也不会签发人类登录 token。它只创建/复用
    agents 表里的智能体身份, 并在返回值里明确标记 identity_type=AGENT。
    """
    org = None
    if organization_id:
        org = db.query(Organization).filter(Organization.id == organization_id).first()
        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")

    existing = None
    if api_endpoint:
        existing = db.query(Agent).filter(Agent.api_endpoint == api_endpoint).first()
    if not existing:
        query = db.query(Agent).filter(
            Agent.name == name,
            Agent.owner_id.is_(None),
        )
        if organization_id:
            query = query.filter(Agent.organization_id == organization_id)
        else:
            query = query.filter(Agent.organization_id.is_(None))
        existing = query.first()

    if existing:
        return {
            "message": "Agent already registered",
            "created": False,
            "agent": _agent_to_dict(existing),
        }

    agent = Agent(
        id=str(uuid.uuid4()),
        name=name,
        description=description,
        category=category,
        icon=icon or "🤖",
        tags=_split_tags(tags),
        api_endpoint=api_endpoint,
        organization_id=organization_id,
        owner_id=None,
        is_public=is_public,
    )
    db.add(agent)
    db.commit()
    db.refresh(agent)

    return {
        "message": "Agent registered successfully",
        "created": True,
        "agent": _agent_to_dict(agent),
    }

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_agent(
    name: str,
    description: str,
    category: str,
    tags: List[str] = [],
    api_endpoint: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_agent = Agent(
        id=str(uuid.uuid4()),
        name=name,
        description=description,
        category=category,
        tags=tags,
        api_endpoint=api_endpoint,
        owner_id=current_user.id
    )
    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)
    
    return {
        "message": "Agent created successfully",
        "agent": _agent_to_dict(new_agent)
    }

@router.put("/{agent_id}")
async def update_agent(
    agent_id: str,
    name: str = None,
    description: str = None,
    category: str = None,
    tags: List[str] = None,
    api_endpoint: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Only owner can update
    if agent.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if name: agent.name = name
    if description: agent.description = description
    if category: agent.category = category
    if tags: agent.tags = tags
    if api_endpoint: agent.api_endpoint = api_endpoint
    
    db.commit()
    db.refresh(agent)
    
    return {"message": "Agent updated successfully"}

@router.delete("/{agent_id}")
async def delete_agent(
    agent_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Only owner can delete
    if agent.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db.delete(agent)
    db.commit()
    
    return {"message": "Agent deleted successfully"}
