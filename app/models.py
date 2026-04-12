"""
Database Models
"""
from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, ForeignKey, ARRAY, UUID
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.sql import func
from .main import Base

# User Model
class User(Base):
    __tablename__ = "users"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    email = Column(String(255), unique=True, nullable=False)
    username = Column(String(100), unique=True)
    password_hash = Column(String(255))
    avatar_url = Column(Text)
    bio = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# Agent Model
class Agent(Base):
    __tablename__ = "agents"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    name = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    tags = Column(ARRAY(String))
    owner_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    api_endpoint = Column(String(500))
    is_public = Column(Boolean, default=True)
    star_count = Column(Integer, default=0)
    usage_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# Comment Model
class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    agent_id = Column(PGUUID(as_uuid=True), ForeignKey("agents.id"))
    content = Column(Text, nullable=False)
    parent_id = Column(PGUUID(as_uuid=True), ForeignKey("comments.id"))
    likes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
