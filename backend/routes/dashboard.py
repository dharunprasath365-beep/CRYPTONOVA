from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import SecurityEvent

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_events = db.query(SecurityEvent).count()

    safe_events = db.query(SecurityEvent).filter(
        SecurityEvent.status == "SAFE"
    ).count()

    attack_events = db.query(SecurityEvent).filter(
        SecurityEvent.status == "ATTACK"
    ).count()

    suspicious_events = db.query(SecurityEvent).filter(
        SecurityEvent.status == "SUSPICIOUS"
    ).count()

    average_threat = db.query(
        func.avg(SecurityEvent.threat_score)
    ).scalar()

    return {
        "total_events": total_events,
        "safe_events": safe_events,
        "attack_events": attack_events,
        "suspicious_events": suspicious_events,
        "average_threat_score": round(
            average_threat or 0, 2
        )
    }