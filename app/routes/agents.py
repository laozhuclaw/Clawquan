"""
Agent Routes - CRUD operations for AI Agents
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from ..models import Agent, User
from ..database import get_db
from ..routes.auth import get_current_user

router = APIRouter(prefix="/api/agents", tags=["Agents"])

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
    
    return [{
        "id": str(agent.id),
        "name": agent.name,
        "description": agent.description,
        "category": agent.category,
        "tags": agent.tags or [],
        "icon": agent.icon,
        "is_public": agent.is_public,
        "star_count": agent.star_count,
        "usage_count": agent.usage_count
    } for agent in agents]

@router.get("/{agent_id}", response_model=dict)
async def get_agent(agent_id: str, db: Session = Depends(get_db)):
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
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
        "usage_count": agent.usage_count
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
        "agent": {
            "id": str(new_agent.id),
            "name": new_agent.name,
            "category": new_agent.category
        }
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
