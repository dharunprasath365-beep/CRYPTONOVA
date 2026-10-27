import base64
import hashlib

from fastapi import APIRouter

from crypto.signature import DigitalSignature
from ..schemas import SignRequest, SignResponse, VerifyRequest

router = APIRouter(prefix="/api/signatures", tags=["Digital Signatures"])

signer = DigitalSignature()


@router.post("/create", response_model=SignResponse)
def create_signature(request: SignRequest):

    signature = signer.sign(request.message)

    return {
        "message": request.message,
        "signature": base64.b64encode(signature).decode()
    }


@router.post("/verify")
def verify_signature(request: VerifyRequest):

    signature = base64.b64decode(request.signature)

    valid = signer.verify(
        request.message,
        signature
    )

    message_hash = hashlib.sha256(
        request.message.encode()
    ).hexdigest()

    return {
        "message_hash": message_hash,
        "signature_valid": valid,
        "status": "VALID" if valid else "INVALID"
    }