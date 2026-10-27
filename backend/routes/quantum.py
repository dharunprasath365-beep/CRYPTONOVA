from fastapi import APIRouter

from quantum.quantum_verify import (
    run_bell_verification,
    run_pauli_analysis
)

router = APIRouter(
    prefix="/api/quantum",
    tags=["Quantum Security"]
)


@router.post("/verify")
def quantum_verify():

    return run_bell_verification()


@router.post("/pauli-analysis")
def pauli_analysis():

    return run_pauli_analysis()