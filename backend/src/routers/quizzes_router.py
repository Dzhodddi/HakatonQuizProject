
from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session, selectinload
from fastapi.responses import JSONResponse
from constants import WEBSOCKET_LOG_DIR
from database import get_sync_db_session
from models import Slides, Quizzes, QuizRating
from schemas import CreateSlides, CreateQuizzes, RatingQuizzes

quizzes_router = APIRouter()


@quizzes_router.get("/")
def root():
    return {"Message": "Hello World"}

@quizzes_router.post("/create_quiz")
def create_quiz(creds: CreateQuizzes, database: Session = Depends(get_sync_db_session)):

    try:
        json_data = jsonable_encoder(creds)
        new_quiz = Quizzes(
            author_id = json_data['author_id'],
            title = json_data['title'],
            description = json_data['description']
        )
        database.add(new_quiz)

        with open(f"{WEBSOCKET_LOG_DIR}ws.log", "w") as f:
            f.write("Updated")

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
        return {"success": True}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@quizzes_router.get("/quiz_description/{quizId}")
def get_quiz_description(quizId: int, database: Session = Depends(get_sync_db_session)):
    quiz = get_and_check_quiz(quizId, database)
    print(quiz.rating_list)
    try:
        rating_list: float = round(sum([ratings.rating for ratings in quiz.rating_list]) / len(quiz.rating_list), 2 )
    except ZeroDivisionError:
        rating_list:float = 0.00
    response_dict =  {"quiz_id" : quiz.id, "author_id": quiz.author_id, "quiz_author": f"{quiz.user.first_name} {quiz.user.second_name}",
            "quiz_title": quiz.title, "quiz_description": quiz.description, "quiz_ratings": rating_list}
    return response_dict

@quizzes_router.get("/quiz_json/{quizId}")
def get_quiz_json(quizId: int, database: Session = Depends(get_sync_db_session)):
    quiz = get_and_check_quiz(quizId, database)
    slide_list: list[dict] = []
    for slide in quiz.slides_list:
        slide_list.append( {
            "id": slide.slide_id,
            "answer_id": slide.answer_id,
            "question1": slide.question1,
            "question2": slide.question2,
            "question3": slide.question3,
            "question4": slide.question4
        })
    dict_response:dict = {
        "author_id":  quiz.author_id,
        "title": quiz.title,
        "description": quiz.description,
        "slides": slide_list
    }
    return JSONResponse(dict_response)


@quizzes_router.get("/get_quizzes_list")
def get_quizzes_list(database: Session = Depends(get_sync_db_session), limit_amn: int = 10):
    query = (
        select(
            Quizzes.id,
        )
        .order_by(Quizzes.created_at.desc())
        .limit(limit_amn)
    )
    res = database.execute(query)
    print(res)
    response_list = []
    for idx in res.scalars().all():
        response_list.append(get_quiz_description(idx, database))
    return JSONResponse(response_list)


@quizzes_router.post("/rate_quiz")
def rate_quiz(creds: RatingQuizzes, database: Session = Depends(get_sync_db_session)):
    new_rating = QuizRating(**creds.model_dump())
    try:
        database.add(new_rating)
        database.commit()
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


def get_and_check_quiz(quizId: int, database: Session = Depends(get_sync_db_session)) -> Quizzes:
    query = (
        select(Quizzes)
        .filter(Quizzes.id == quizId)
        .options(selectinload(Quizzes.slides_list))
    )

    res = database.execute(query)
    try:
        quiz = res.scalars().one()
        return quiz
    except NoResultFound:
        raise HTTPException(
            status_code=404,
            detail="Quiz doesn't exist",
        )
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))




