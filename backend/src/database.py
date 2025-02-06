from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine, MetaData
from pydantic_settings import BaseSettings, SettingsConfigDict

from models import Base


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    @property
    def database_URL_psycopg(self) -> str:
        return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    @property
    def database_URL_asyncpg(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(env_file="../.env")


settings = Settings()

sync_engine = create_engine(
    url = settings.database_URL_psycopg,
    echo=True,
)


async_engine = create_async_engine(
    url = settings.database_URL_asyncpg,
    echo=True,

)

sync_session_factory = sessionmaker(sync_engine)
async_session_factory = async_sessionmaker(async_engine)




def get_db():
    db = sync_session_factory()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    sync_engine.echo = False
    Base.metadata.create_all(sync_engine)
    sync_engine.echo = True


if __name__ == "__main__":
    create_tables()