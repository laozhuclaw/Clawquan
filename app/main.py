"""
ClawQuan Backend API
FastAPI + PostgreSQL + JWT Authentication
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.pool import StaticPool
import os

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./clawquan.db")
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = lambda: Session(engine)
Base = declarative_base()

# App
app = FastAPI(
    title="ClawQuan API",
    description="多智能体协作平台 API",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencies
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models (placeholder)
# from app.models import User, Agent, Comment

# Routes (placeholder)
@app.get("/")
async def root():
    return {"message": "ClawQuan API is running!", "version": "0.1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
