from fastapi import FastAPI, __version__
from fastapi.middleware.cors import CORSMiddleware
import models
from database import sync_engine
from routers.ws_router import ws_router
from routers.quizzes_router import quizzes_router
from routers.users_router import user_router


# models.Base.metadata.drop_all(sync_engine)
models.Base.metadata.create_all(bind=sync_engine)
app = FastAPI()



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

app.include_router(ws_router)
@app.get("/", tags=["Services"], summary="Get version of FastAPI")
def get_version():
    return {"version": __version__}

@app.get("/live", tags = ["Services"], summary="Check API")
async def get_live():
    return {"status": "Alive"}




