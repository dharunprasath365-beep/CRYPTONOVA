from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routes.signatures import router as signature_router
from .routes.quantum import router as quantum_router
from .routes.security import router as security_router
from .routes.dashboard import router as dashboard_router
from .routes.logs import router as logs_router
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CRYPTONOVA",
    description="Quantum-Enhanced Digital Signature & Cyber Threat Detection",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(signature_router)
app.include_router(quantum_router)
app.include_router(security_router)
app.include_router(dashboard_router)
app.include_router(logs_router)

@app.get("/")
def root():
    return {
        "project": "CRYPTONOVA",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected"
    }