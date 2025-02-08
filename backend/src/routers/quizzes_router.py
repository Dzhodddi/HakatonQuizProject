from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
#
# from database import get_sync_db_session
# from models import Slides
# from schemas import CreateSlides

quizzes_router = APIRouter()


# @quizzes_router.get("/")
# def root():
#     return {"Message": "Hello World"}

# @quizzes_router.post("/create_slide/}")
# def create_slides(creds: CreateSlides, database: Session = Depends(get_sync_db_session)):
#     try:
#         new_slide = Slides(**creds.model_dump())
#
#     except