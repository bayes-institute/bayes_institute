from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.db.session import check_connection

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "api"


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Report that the API process is available."""
    return HealthResponse()


@router.get("/ready", response_model=HealthResponse)
async def ready() -> HealthResponse:
    """Confirm that the API can reach its required PostgreSQL database."""
    try:
        await check_connection()
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database is not ready.",
        ) from error
    return HealthResponse()
