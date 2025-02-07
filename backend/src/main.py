import bcrypt
from fastapi import FastAPI, __version__, Depends, HTTPException
from fastapi import Response
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.orm import Session

import models
from constants import SALT
from database import sync_engine, get_sync_db_session
from jwt_settings import security
from schemas import RegisterUserEmail, LoginUserEmail, UpdateProfile
from models import Users

models.Base.metadata.create_all(bind=sync_engine)
app = FastAPI()

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
            password_hash = bcrypt.hashpw(bytes(creds.password, 'utf-8'), SALT()),
        )
        database.add(new_user)
        database.commit()
    except IntegrityError as e:
        database.rollback()
        raise HTTPException(status_code=409, detail="User with this email is already registered")
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"{str(e)}") from e

    return {"email": creds.email}





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
        user_password = bcrypt.hashpw(bytes(creds.password, 'utf-8'), SALT())
        if user_password == result.password_hash:
            token = security.create_access_token(uid= f"{result.id}")
            response.set_cookie(token)
            return {"id": result.id}
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

#
# @app.patch("/update_users/{userId}")
# def login_users(userId: int, creds: UpdateProfile):
#     query = db.query(Users).filter(Users.id == userId)
#     user = query.first()
#
#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail=f"User doesn't exist",
#         )
#
#     try:
#         update_data = creds.model_dump()
#         print(update_data)
#         params = {"first_name" : update_data['new_first_name'],
#                     "second_name" : update_data['new_second_name'],
#                     "id": userId
#         }
#         print(params)
#         db.execute(text("UPDATE users SET first_name =:first_name, second_name =: second_name WHERE id =: id"), params= params)
#         # db.commit()
#         # db.refresh(user)
#         return {"success": True}
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(
#             status_code=500,
#             detail=f"{str(e)}",
#         ) from e



