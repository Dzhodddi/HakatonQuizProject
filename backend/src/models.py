from typing import Annotated, Optional
from sqlalchemy import UniqueConstraint, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase, relationship

from database import Base

intpk = Annotated[int,mapped_column(primary_key=True)]


class Users(Base):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("email"),)

    id: Mapped[intpk]
    first_name: Mapped[str]
    second_name: Mapped[str]
    email: Mapped[str]
    password_hash: Mapped[int]


    # quizzes: Mapped[list["Quizzes"]] = relationship(
    #     back_populates="quizzes",
    # )

class Quizzes(Base):
    __tablename__ = "quizzes"

    id: Mapped[intpk]
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    title: Mapped[str]
    description: Mapped[str]

    # slides: Mapped[list["Slides"]] = relationship(
    #     back_populates="slides",
    # )

class Slides(Base):
    __tablename__ = "slides"
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id", ondelete="CASCADE"))
    answer_id: Mapped[int]
    slide_id: Mapped[int]
    question1: Mapped[str]
    question2: Mapped[str]
    question3: Mapped[str]
    question4: Mapped[str]
    useless_id: Mapped[intpk]

    # quiz: Mapped["Quizzes"] = relationship(
    #     back_populates="quizzes",
    # )