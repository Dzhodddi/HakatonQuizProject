import os
from fastapi import FastAPI, __version__, Depends, HTTPException
from fastapi import Response, File, UploadFile
from pydantic import EmailStr
from sqlalchemy import select, and_, text, update, delete
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models
from constants import SALT, IMAGES_DIR
from database import sync_engine, get_sync_db_session
from jwt_settings import security
from schemas import RegisterUserEmail, LoginUserEmail, UpdateProfile, DeleteUser, UsersInfo, UserImage
from models import Users


models.Base.metadata.create_all(bind=sync_engine)
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.patch("/upload_logo/{userId}")
async def update_file(userId: int, new_file: UploadFile = File(), database: Session = Depends(get_sync_db_session)):
    user = database.get(Users, userId)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
        )

    new_file.filename = f"logo_{userId}.jpg"

    contests = await new_file.read()

    with open(f"{IMAGES_DIR}{new_file.filename}", "wb") as f:
        f.write(contests)

    return {"success": True}

@app.post("/get_logo/{userId}")
async def get_logo(userId: int, database: Session = Depends(get_sync_db_session)):
    user = database.get(Users, userId)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
        )

    files = os.listdir(IMAGES_DIR)
    print(files)
    for file in files:
        if f"_{userId}" in file:
            return {"path": f"{IMAGES_DIR}logo_{userId}.jpg"}
    return {"path": f"{IMAGES_DIR}default_logo.jpg"}


@app.get("/")
def get_version():
    return {"version": __version__}


@app.post("/register")
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



@app.post("/login")
def login_users(creds: LoginUserEmail, response: Response, database: Session = Depends(get_sync_db_session)):
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
            token = security.create_access_token(uid= f"{result.id}")
            response.set_cookie(token)
            return {"id": result.id, "first_name": result.first_name, "second_name": result.second_name, "email": result.email}
        else:
            raise HTTPException(
                status_code=404,
                detail="Wrong credentials",
            )

    except NoResultFound:
        raise HTTPException(
            status_code=404,
            detail="Wrong credentials",
    )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail= f"{str(e)}",
    )


@app.patch("/update_users/{userId}")
def update_users(userId: int, creds: UpdateProfile, database: Session = Depends(get_sync_db_session)):
    user = database.get(Users, userId)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
    )

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


@app.delete("/delete_user/{userId}")
def delete_users(userId: int, creds: DeleteUser, database: Session = Depends(get_sync_db_session)):
    user = database.get(Users, userId)
    logo_path: str = f"{IMAGES_DIR}logo_{userId}.jpg"
    if os.path.exists(logo_path):
        os.remove(logo_path)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
    )

    user_password = hash(creds.password + SALT())
    if user_password != user.password_hash:
        raise HTTPException(
            status_code=404,
            detail="Wrong password",
        )


    try:
        database.delete(user)
        database.commit()
        return {"success" : True}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{str(e)}",
    )


@app.get("/users/{userId}", )
def get_user(userId: int, database: Session = Depends(get_sync_db_session)) -> dict:
    user = database.get(Users, userId)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User doesn't exist",
    )
    return {"first_name": user.first_name, "second_name": user.second_name, "email": user.email}



