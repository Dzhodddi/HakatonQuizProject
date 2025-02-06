from pydantic import BaseModel, Field, EmailStr

class LoginUserEmail(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=32)

    class Config:
        from_attributes = True

class RegisterUserEmail(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    second_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=32)






