import datetime
from typing import Annotated
from sqlalchemy import UniqueConstraint, ForeignKey, text
from sqlalchemy.orm import mapped_column, Mapped, relationship

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

    quizzes_list: Mapped[list["Quizzes"]] =  relationship(back_populates="user", cascade="all, delete")
    rating_list: Mapped[list["QuizRating"]]= relationship(
        "QuizRating",
        secondary="rating",
        back_populates="users",
        cascade="all, delete",
        primaryjoin="Users.id == rating.c.guest_id",
        secondaryjoin="QuizRating.guest_id == users.c.id",
        viewonly=True,
    )

class Quizzes(Base):
    __tablename__ = "quizzes"

    id: Mapped[intpk]
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    title: Mapped[str]
    description: Mapped[str]
    created_at: Mapped[datetime.datetime] = mapped_column(default=text("datetime()"))

    user: Mapped["Users"] = relationship(back_populates="quizzes_list")

    slides_list: Mapped[list["Slides"]] = relationship(back_populates="quiz", cascade="all, delete")
    rating_list: Mapped[list["QuizRating"]] = relationship(
        "QuizRating",
        secondary="rating",
        back_populates="quizzes",
        cascade="all, delete",
        primaryjoin="Quizzes.id == rating.c.quiz_id",
        secondaryjoin="QuizRating.quiz_id == quizzes.c.id",
        order_by="QuizRating.completed_at.asc()",
        viewonly=True,
    )


class Slides(Base):
    __tablename__ = "slides"
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id", ondelete="CASCADE"))
    answer_id: Mapped[int]
    slide_id: Mapped[int]
    question: Mapped[str]
    answer1: Mapped[str]
    answer2: Mapped[str]
    answer3: Mapped[str]
    answer4: Mapped[str]
    useless_id: Mapped[intpk]

    quiz: Mapped["Quizzes"] = relationship(back_populates="slides_list")




class QuizRating(Base):
    __tablename__ = "rating"

    id: Mapped[intpk]
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id", ondelete="CASCADE"))
    guest_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    rating: Mapped[int]
    completed_at: Mapped[datetime.datetime] = mapped_column(default=text("datetime()"))

    users: Mapped[list["Users"]] = relationship("Users",back_populates="rating_list", cascade="all, delete")
    quizzes: Mapped[list["Quizzes"]] = relationship("Quizzes",back_populates="rating_list", cascade="all, delete")