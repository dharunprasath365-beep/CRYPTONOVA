from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from .database import Base


class SecurityEvent(Base):
    __tablename__ = "security_events"

    id = Column(Integer, primary_key=True, index=True)
    message_hash = Column(String, nullable=False)
    signature_valid = Column(String, nullable=False)
    quantum_valid = Column(String, nullable=False)
    threat_score = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)