import base64
import uuid
from typing import Annotated
from sqlalchemy import MetaData, UniqueConstraint, text
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase

metadata = MetaData()
intpk = Annotated[int,mapped_column(primary_key=True)]

class Base(DeclarativeBase):

    def __repr__(self):
        columns = []
        for col in self.__table__.columns.keys():
            columns.append(f"{col}={getattr(self, col)}")
        return f"<{self.__class__.__name__} {','.join(columns)}>"

class Users(Base):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("email"),)

    id: Mapped[intpk]
    first_name: Mapped[str]
    second_name: Mapped[str]
    email: Mapped[str]
    password_hash: Mapped[bytes]
