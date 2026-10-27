from pydantic import BaseModel


class SignRequest(BaseModel):
    message: str


class SignResponse(BaseModel):
    message: str
    signature: str


class VerifyRequest(BaseModel):
    message: str
    signature: str