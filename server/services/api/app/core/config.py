import os


def database_url() -> str:
    """Return the async SQLAlchemy connection URL for the active environment."""
    return os.getenv(
        "DATABASE_URL", "postgresql+asyncpg://bayes:bayes@localhost:5432/bayes"
    )
