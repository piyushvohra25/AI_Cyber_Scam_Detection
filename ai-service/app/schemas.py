from pydantic import BaseModel, Field


class MessageRequest(BaseModel):
    message: str = Field(..., min_length=3)


class UrlRequest(BaseModel):
    url: str = Field(..., min_length=5)
