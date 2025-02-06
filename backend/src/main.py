from fastapi import FastAPI, __version__, Depends, HTTPException
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.orm import Session

from database import settings, sync_session_factory, get_db, async_session_factory
from schemas import RegisterUserEmail, LoginUserEmail
from models import Users

app = FastAPI()

@app.get("/")
def get_version():
    return {"version": __version__}


@app.post("/register")
def register_user(creds: RegisterUserEmail, database: Session = Depends(get_db)):
    try:
        new_user = Users(
            first_name = creds.first_name,
            second_name = creds.second_name,
            email = creds.email,
            password = creds.password
        )
        database.add(new_user)
        database.commit()
        # return {"user": new_user.email}
    except IntegrityError as e:
        database.rollback()
        raise HTTPException(status_code=409, detail="User with this email is already registered")
    except Exception as e:
        raise HTTPException(status_code=500, detail= "Something went wrong") from e

    return {"email": creds.email, "user_first_name": creds.first_name,
            "user_second_name": creds.second_name}

@app.post("/login")
async def login_user(creds: LoginUserEmail):
    async with async_session_factory() as session:
        query = (
            select(
                Users
            )
            .select_from(Users)
            .filter(and_(
                Users.email == creds.email,
                Users.password == creds.password
            ))
        )

        result = await session.execute(query)
        try:
            user = result.scalars().one()
            return {"email": creds.email}
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




