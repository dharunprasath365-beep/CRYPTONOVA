from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator


# =====================================================
# 1. BELL-STATE VERIFICATION
# =====================================================

def run_bell_verification():

    circuit = QuantumCircuit(2, 2)

    # Create Bell state
    circuit.h(0)
    circuit.cx(0, 1)

    # Measure
    circuit.measure([0, 1], [0, 1])

    simulator = AerSimulator()

    result = simulator.run(
        circuit,
        shots=1
    ).result()

    counts = result.get_counts()

    measurement = list(counts.keys())[0]

    # Bell state should produce correlated results
    verified = measurement in ["00", "11"]

    return {
        "quantum_verified": verified,
        "bell_state": "ENTANGLED",
        "measurement": measurement
    }


# =====================================================
# 2. PAULI-BASIS + MEASUREMENT STATISTICS
# =====================================================

def run_pauli_analysis(shots=256):

    simulator = AerSimulator()

    # -------------------------------------------------
    # Z BASIS
    # -------------------------------------------------

    z_circuit = QuantumCircuit(2, 2)

    # Create Bell state
    z_circuit.h(0)
    z_circuit.cx(0, 1)

    # Measure in Z basis
    z_circuit.measure([0, 1], [0, 1])

    z_result = simulator.run(
        z_circuit,
        shots=shots
    ).result()

    z_counts = z_result.get_counts()

    # -------------------------------------------------
    # X BASIS
    # -------------------------------------------------

    x_circuit = QuantumCircuit(2, 2)

    # Create Bell state
    x_circuit.h(0)
    x_circuit.cx(0, 1)

    # Rotate to X basis
    x_circuit.h(0)
    x_circuit.h(1)

    # Measure
    x_circuit.measure([0, 1], [0, 1])

    x_result = simulator.run(
        x_circuit,
        shots=shots
    ).result()

    x_counts = x_result.get_counts()

    # -------------------------------------------------
    # STATISTICAL ANALYSIS
    # -------------------------------------------------

    z_correlated = (
        z_counts.get("00", 0) +
        z_counts.get("11", 0)
    )

    x_correlated = (
        x_counts.get("00", 0) +
        x_counts.get("11", 0)
    )

    z_correlation = z_correlated / shots
    x_correlation = x_correlated / shots

    # Average correlation
    average_correlation = (
        z_correlation +
        x_correlation
    ) / 2

    # Anomaly score
    anomaly_score = round(
        1 - average_correlation,
        3
    )

    # Threshold evaluation
    if anomaly_score < 0.10:
        status = "NORMAL"

    elif anomaly_score < 0.30:
        status = "SUSPICIOUS"

    else:
        status = "ANOMALY"

    return {
        "shots": shots,

        "pauli_basis": {

            "Z": {
                "counts": z_counts,
                "correlation": round(
                    z_correlation,
                    3
                )
            },

            "X": {
                "counts": x_counts,
                "correlation": round(
                    x_correlation,
                    3
                )
            }
        },

        "average_correlation": round(
            average_correlation,
            3
        ),

        "anomaly_score": anomaly_score,

        "status": status
    }