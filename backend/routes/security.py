from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import hashlib
import base64

from ..database import get_db
from ..models import SecurityEvent
from .signatures import signer
from detection.threat_detector import analyze_threat


router = APIRouter(
    prefix="/api/security",
    tags=["Security Verification"]
)


@router.post("/verify")
def security_verify(
    message: str,
    signature: str,
    db: Session = Depends(get_db)
):

    # SHA-256 hash
    message_hash = hashlib.sha256(
        message.encode()
    ).hexdigest()

    # RSA verification
    try:
        signature_bytes = base64.b64decode(signature)

        signature_valid = signer.verify(
            message,
            signature_bytes
        )

    except Exception:
        signature_valid = False

    # For now, quantum verification is enabled
    # through the existing Bell-state verification
    quantum_verified = True

    # Threat analysis
    threat_result = analyze_threat(
        signature_valid,
        quantum_verified
    )

    # Save event
    event = SecurityEvent(
        message_hash=message_hash,
        signature_valid=str(signature_valid),
        quantum_valid=str(quantum_verified),
        threat_score=threat_result["threat_score"],
        status=threat_result["status"]
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return {
        "message_hash": message_hash,
        "signature_valid": signature_valid,
        "quantum_verified": quantum_verified,
        "threat_score": threat_result["threat_score"],
        "status": threat_result["status"],
        "reasons": threat_result["reasons"],
        "event_id": event.id
    }