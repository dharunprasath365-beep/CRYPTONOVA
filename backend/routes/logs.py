from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import SecurityEvent

router = APIRouter(
    prefix="/api/logs",
    tags=["Security Logs"]
)


@router.get("")
def get_logs(db: Session = Depends(get_db)):

    events = db.query(SecurityEvent).order_by(
        SecurityEvent.id.desc()
    ).all()

    return [
        {
            "id": event.id,
            "message_hash": event.message_hash,
            "signature_valid": event.signature_valid,
            "quantum_valid": event.quantum_valid,
            "threat_score": event.threat_score,
            "status": event.status,
            "timestamp": event.timestamp
        }
        for event in events
    ]