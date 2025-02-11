import os

from dotenv import load_dotenv
from fastapi import FastAPI, __version__, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import Response
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict
from starlette.requests import Request
from starlette.responses import RedirectResponse, JSONResponse
import jwt
import models
from database import sync_engine
from routers.websocket_router import ws_router
from routers.quizzes_router import quizzes_router
from routers.users_router import user_router
#
# models.Base.metadata.drop_all(sync_engine)
# models.Base.metadata.create_all(bind=sync_engine)
app = FastAPI()

# load_dotenv()
# SECRET_KEY = os.getenv("SECRET_KEY")
#
#
# class Token(BaseModel):
#     access_token: str
#     token_type: str
# ALGORITHM = "HS256"
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
#
# def create_access_token(data: dict):
#     to_encode = data.copy()
#
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://13.60.96.236:5173",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#, prefix="/api/users"
app.include_router(user_router, tags=["Users"])
#, prefix="/api/quizzes"
app.include_router(quizzes_router, tags = ["Quizzes"])
app.include_router(ws_router, tags=["Ws APIs"])
@app.get("/", tags=["Services"], summary="Get version of FastAPI")
def get_version():
    return {"version": __version__}

@app.get("/live", tags = ["Services"], summary="Check API")
async def get_live():
    return {"status": "Alive"}




