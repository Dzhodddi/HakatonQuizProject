from typing import Optional
from pydantic import BaseModel, Field, EmailStr

from constants import IMAGES_DIR


class LoginUserEmail(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=32)

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True

class RegisterUserEmail(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    second_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=32)

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True

class UpdateProfile(BaseModel):
    new_first_name: Optional[str] = Field(..., min_length=1, max_length=50)
    new_second_name: Optional[str] = Field(..., min_length=1, max_length=50)

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True


class DeleteUser(BaseModel):
    password: str = Field(..., min_length=8, max_length=32)


class UsersInfo(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    second_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr

class UserImage(BaseModel):
    images_path: str = Field(default=f"{IMAGES_DIR}/default_logo.png")


# class CreateSlides(BaseModel):
#
#     question1: str = Field(..., min_length=1, max_length=50)
#     question2: str = Field(default="", min_length=0, max_length=50, )
#     question3: str = Field(default="", min_length=0, max_length=50)
#     question4: str = Field(default="", min_length=0, max_length=50)



