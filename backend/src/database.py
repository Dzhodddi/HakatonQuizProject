from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine, MetaData
from pydantic_settings import BaseSettings, SettingsConfigDict

SQLITE_DATABASE_URL = "sqlite:///./user.db"

sync_engine = create_engine(
    SQLITE_DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
)
# async_engine = create_async_engine(
#     SQLITE_DATABASE_URL, echo=True, connect_args={"check_same_thread": False}
# )

sync_session_factory = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)
# async_session_factory = async_sessionmaker(autocommit=False, autoflush=False, bind=async_engine)
Base = declarative_base()



def get_sync_db_session():
    db = sync_session_factory()
    try:
        yield db
    finally:
        db.close()


# def get_async_db_session():
#     db = async_session_factory()
#     try:
#         yield db
#     finally:
#         db.close()

def create_tables():
    sync_engine.echo = False
    Base.metadata.create_all(sync_engine)
    sync_engine.echo = True


if __name__ == "__main__":
    create_tables()