def analyze_threat(signature_valid, quantum_verified):

    threat_score = 0.0
    reasons = []

    # Invalid digital signature
    if not signature_valid:
        threat_score += 0.70
        reasons.append("Invalid digital signature")

    # Quantum verification failed
    if not quantum_verified:
        threat_score += 0.20
        reasons.append("Quantum verification failed")

    # Final classification
    if threat_score >= 0.70:
        status = "ATTACK"
    elif threat_score >= 0.30:
        status = "SUSPICIOUS"
    else:
        status = "SAFE"

    return {
        "threat_score": round(threat_score, 2),
        "status": status,
        "reasons": reasons
    }