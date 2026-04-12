"""
Routes package
"""
from .auth import router as auth_router
from .agents import router as agents_router
from .comments import router as comments_router

__all__ = ["auth_router", "agents_router", "comments_router"]
