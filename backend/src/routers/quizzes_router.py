from fastapi import APIRouter, Depends, HTTPException
import json

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from database import get_sync_db_session
from models import Slides, Quizzes
from schemas import CreateSlides, CreateQuizzes

quizzes_router = APIRouter()


@quizzes_router.get("/")
def root():
    return {"Message": "Hello World"}

@quizzes_router.post("/create_quiz")
def create_quiz(creds: CreateQuizzes, database: Session = Depends(get_sync_db_session)):

    try:
        json_data = jsonable_encoder(creds)
        print(json_data)
        new_quiz = Quizzes(
            author_id = json_data['author_id'],
            title = json_data['title'],
            description = json_data['description']
        )
        database.add(new_quiz)
        database.commit()
        for idx, slide in enumerate(json_data['slides']):
            new_slide = Slides(
                quiz_id = new_quiz.id,
                answer_id = slide['answer_id'],
                slide_id = idx + 1,
                question1= slide['question1'],
                question2= slide['question2'],
                question3= slide['question3'],
                question4= slide['question4']
            )
            database.add(new_slide)
        database.commit()

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))