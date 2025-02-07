from typing import Annotated
from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase

from database import Base

intpk = Annotated[int,mapped_column(primary_key=True)]


class Users(Base):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("email"),)

    id: Mapped[intpk]
    first_name: Mapped[str]
    second_name: Mapped[str]
    email: Mapped[str]
    password_hash: Mapped[bytes]
