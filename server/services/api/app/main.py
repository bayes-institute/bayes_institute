import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.db.session import dispose_engine


def cors_origins() -> list[str]:
    configured = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
    return [origin.strip() for origin in configured.split(",") if origin.strip()]


app = FastAPI(
    title="Bayes Institute API",
    version="0.0.0",
    description="Shared platform API for Bayes Institute products.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")


@app.on_event("shutdown")
async def shutdown_database() -> None:
    await dispose_engine()
