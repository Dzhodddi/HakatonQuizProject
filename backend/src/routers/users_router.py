import os
from typing import Type

from fastapi import Depends, HTTPException, APIRouter
from fastapi import File, UploadFile
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.orm import Session

from constants import SALT, IMAGES_DIR, WEBSOCKET_LOG_DIR
from database import get_sync_db_session
from models import Users
from schemas import RegisterUserEmail, LoginUserEmail, UpdateProfile, DeleteUser

user_router = APIRouter()


@user_router.post("/register")
def register_users(creds: RegisterUserEmail, database: Session = Depends(get_sync_db_session)):

    try:
        new_user = Users(
            first_name = creds.first_name,
            second_name = creds.second_name,
            email = creds.email,
            password_hash = hash(creds.password + SALT())
        )
        database.add(new_user)
        database.commit()
        return {"id": new_user.id, "first_name": new_user.first_name, "second_name": new_user.second_name, "email": new_user.email}
    except IntegrityError as e:
        database.rollback()
        raise HTTPException(status_code=409, detail="User with this email is already registered")
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"{str(e)}") from e


@user_router.post("/login")
def login_users(creds: LoginUserEmail, database: Session = Depends(get_sync_db_session)):
    subquery = (
        select(
            Users
        )
        .select_from(Users)
        .filter(and_(
            Users.email == creds.email,
        ))
    )

    res = database.execute(subquery)

    try:
        result = res.scalars().one()
        user_password = hash(creds.password + SALT())
        if user_password == result.password_hash:
            return {"id": result.id, "first_name": result.first_name, "second_name": result.second_name, "email": result.email}
        else:
            raise HTTPException(
                status_code=404,
                detail="Wrong credentials",
            )

    except NoResultFound:
        raise HTTPException(
            status_code=404,
            detail="NoResultFound",
    )



@user_router.patch("/update_users/{userId}")
def update_users(userId: int, creds: UpdateProfile, database: Session = Depends(get_sync_db_session)):
    user = get_and_check_user(userId, database)

    user.first_name = creds.new_first_name
    user.second_name = creds.new_second_name

    try:
        database.commit()
        database.refresh(user)
        return {"success": True}
    except Exception as e:
        database.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"{str(e)}",
    ) from e



@user_router.delete("/delete_user/{userId}")
def delete_users(userId: int, creds: DeleteUser, database: Session = Depends(get_sync_db_session)):
    user = get_and_check_user(userId, database)
    logo_path: str = f"{IMAGES_DIR}logo_{userId}.jpg"
    if os.path.exists(logo_path):
        os.remove(logo_path)
    user_password = hash(creds.password + SALT())
    if user_password != user.password_hash:
        raise HTTPException(
            status_code=404,
            detail="Wrong password",
        )


    try:
        database.delete(user)
        database.commit()
        with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
            f.write("Updated")
        return {"success" : True}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{str(e)}",
    )


@user_router.get("/users/{userId}", )
def get_user(userId: int, database: Session = Depends(get_sync_db_session)) -> dict:
    user = get_and_check_user(userId, database)
    quizzes_history: set = set()


    for ratings in user.rating_list:
        if ratings.quizzes is not None:
            quizzes_history.add(ratings.quizzes)


    quiz_history = [f'You completed {quiz.id} quiz' for quiz in quizzes_history]
    return {"first_name": user.first_name, "second_name": user.second_name, "email": user.email, "quiz_history": quiz_history}


@user_router.patch("/upload_logo/{userId}")
async def update_file(userId: int, new_file: UploadFile = File(), database: Session = Depends(get_sync_db_session)):
    get_and_check_user(userId, database)

    new_file.filename = f"logo_{userId}.jpg"

    contests = await new_file.read()

    with open(f"{IMAGES_DIR}{new_file.filename}", "wb") as f:
        f.write(contests)

    return {"success": True}

@user_router.post("/get_logo/{userId}")
async def get_logo(userId: int,  database: Session = Depends(get_sync_db_session)):
    get_and_check_user(userId, database)
    files = os.listdir(IMAGES_DIR)
    print(files)
    for file in files:
        if f"_{userId}" in file:
            return {"path": f"{IMAGES_DIR}logo_{userId}.jpg"}
    return {"path": f"{IMAGES_DIR}default_logo.jpg"}


def get_and_check_user(userId: int, database: Session = Depends(get_sync_db_session)) -> Type[Users]:
    user = database.get(Users, userId)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
        )

    return user