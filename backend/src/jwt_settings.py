from database import settings
from authx import AuthX, AuthXConfig


config = AuthXConfig()
config.JWT_SECRET_KEY = settings.JWT_KEY
config.JWT_ACCESS_COOKIE_NAME = "access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]

security = AuthX(config=config)
