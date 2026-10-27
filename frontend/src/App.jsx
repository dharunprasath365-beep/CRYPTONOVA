import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000";

function App() {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [pauliData, setPauliData] = useState(null);

  const [message, setMessage] = useState(
    "Transfer ₹1000 to Account A"
  );

  const [signature, setSignature] = useState("");
  const [result, setResult] = useState(null);

  const [signing, setSigning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadData = async () => {
    try {
      const [statsResponse, logsResponse, pauliResponse] =
        await Promise.all([
          fetch(`${API}/api/dashboard/stats`),
          fetch(`${API}/api/logs`),
          fetch(`${API}/api/quantum/pauli-analysis`, {
            method: "POST",
          }),
        ]);

      const statsData = await statsResponse.json();
      const logsData = await logsResponse.json();
      const pauliResult = await pauliResponse.json();

      setStats(statsData);
      setLogs(logsData);
      setPauliData(pauliResult);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // GENERATE DIGITAL SIGNATURE
  // =====================================================

  const generateSignature = async () => {
    if (!message.trim()) {
      alert("Please enter a message first.");
      return;
    }

    setSigning(true);
    setSignature("");
    setResult(null);

    try {
      const response = await fetch(
        `${API}/api/signatures/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signature generation failed");
      }

      const data = await response.json();

      setSignature(data.signature);
    } catch (error) {
      console.error(error);

      setResult({
        status: "ERROR",
        reasons: ["Unable to generate digital signature"],
      });
    } finally {
      setSigning(false);
    }
  };

  // =====================================================
  // VERIFY MESSAGE
  // =====================================================

  const verifyMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    if (!signature.trim()) {
      alert("Generate a digital signature first.");
      return;
    }

    setVerifying(true);

    try {
      const response = await fetch(
        `${API}/api/security/verify?message=${encodeURIComponent(
          message
        )}&signature=${encodeURIComponent(signature)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();

      setResult(data);

      // Refresh dashboard and logs
      await loadData();
    } catch (error) {
      console.error(error);

      setResult({
        status: "ERROR",
        reasons: ["Security verification failed"],
      });
    } finally {
      setVerifying(false);
    }
  };

  // =====================================================
  // SIMULATE ATTACK
  // =====================================================

  const simulateAttack = () => {
    if (!signature) {
      alert("Generate a signature first.");
      return;
    }

    setAttacking(true);

    setTimeout(() => {
      let attackedMessage;

      if (message.includes("₹1000")) {
        attackedMessage = message.replace("₹1000", "₹9000");
      } else if (message.includes("1000")) {
        attackedMessage = message.replace("1000", "9000");
      } else if (message.includes("Account A")) {
        attackedMessage = message.replace(
          "Account A",
          "Account ATTACKER"
        );
      } else {
        attackedMessage =
          message + " [TAMPERED BY ATTACKER]";
      }

      setMessage(attackedMessage);

      setResult({
        status: "ATTACK SIMULATED",
        signature_valid: null,
        quantum_verified: null,
        threat_score: null,
        reasons: [
          "Message content has been modified",
          "Original digital signature has been preserved",
          "Click VERIFY MESSAGE to detect the attack",
        ],
      });

      setAttacking(false);
    }, 500);
  };

  // =====================================================
  // RESET DEMO
  // =====================================================

  const resetDemo = () => {
    setMessage("Transfer ₹1000 to Account A");
    setSignature("");
    setResult(null);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">CRYPTONOVA</div>
        <div className="loading-text">
          Initializing Quantum Security Engine...
        </div>
      </div>
    );
  }

  return (
    <div className="app">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">◈</div>

          <div>
            <h1>CRYPTONOVA</h1>
            <p>Quantum-Enhanced Cyber Security</p>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="dashboard">

        {/* HERO */}
        <section className="hero">
          <div>
            <p className="eyebrow">QUANTUM SECURITY PLATFORM</p>

            <h2>
              Digital Signature
              <span> Threat Detection</span>
            </h2>

            <p className="hero-description">
              Detect message tampering using classical cryptography,
              quantum verification and cyber threat analysis.
            </p>
          </div>

          <div className="hero-badge">
            <div className="quantum-symbol">⚛</div>
            <div>
              <strong>QUANTUM CORE</strong>
              <span>QISKIT SIMULATION</span>
            </div>
          </div>
        </section>


        {/* ================================================= */}
        {/* STAT CARDS */}
        {/* ================================================= */}

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">◉</div>
            <div>
              <span>TOTAL EVENTS</span>
              <strong>
                {stats?.total_events ?? 0}
              </strong>
            </div>
          </div>

          <div className="stat-card safe">
            <div className="stat-icon">✓</div>
            <div>
              <span>SAFE EVENTS</span>
              <strong>
                {stats?.safe_events ?? 0}
              </strong>
            </div>
          </div>

          <div className="stat-card attack">
            <div className="stat-icon">⚠</div>
            <div>
              <span>ATTACKS</span>
              <strong>
                {stats?.attack_events ?? 0}
              </strong>
            </div>
          </div>

          <div className="stat-card suspicious">
            <div className="stat-icon">!</div>
            <div>
              <span>SUSPICIOUS</span>
              <strong>
                {stats?.suspicious_events ?? 0}
              </strong>
            </div>
          </div>

        </section>


        {/* ================================================= */}
        {/* DIGITAL SIGNATURE */}
        {/* ================================================= */}

        <section className="panel signature-panel">

          <div className="panel-header">

            <div>
              <p className="panel-label">
                CRYPTOGRAPHIC SECURITY
              </p>

              <h3>
                🔐 Digital Signature Verification
              </h3>
            </div>

            <div className="crypto-badge">
              RSA-2048
            </div>

          </div>


          {/* MESSAGE */}

          <div className="input-section">

            <label>
              MESSAGE
            </label>

            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);

                // If user manually modifies the message,
                // previous verification result is no longer trusted.
                if (result?.status !== "ATTACK SIMULATED") {
                  setResult(null);
                }
              }}
              placeholder="Enter a message to sign..."
              rows="4"
            />

          </div>


          {/* GENERATE BUTTON */}

          <div className="button-row">

            <button
              className="generate-btn"
              onClick={generateSignature}
              disabled={signing}
            >
              {signing
                ? "GENERATING..."
                : "⚡ GENERATE SIGNATURE"}
            </button>

          </div>


          {/* SIGNATURE */}

          <div className="signature-section">

            <div className="signature-header">

              <label>
                GENERATED DIGITAL SIGNATURE
              </label>

              {signature && (
                <span className="signature-status">
                  ● SIGNATURE READY
                </span>
              )}

            </div>

            <textarea
              className="signature-box"
              value={signature}
              onChange={(e) =>
                setSignature(e.target.value)
              }
              placeholder="Generate a signature to continue..."
              rows="5"
            />

          </div>


          {/* ACTION BUTTONS */}

          <div className="action-buttons">

            <button
              className="verify-btn"
              onClick={verifyMessage}
              disabled={verifying || !signature}
            >
              {verifying
                ? "VERIFYING..."
                : "✓ VERIFY MESSAGE"}
            </button>


            <button
              className="attack-btn"
              onClick={simulateAttack}
              disabled={attacking || !signature}
            >
              {attacking
                ? "SIMULATING..."
                : "⚠ SIMULATE ATTACK"}
            </button>


            <button
              className="reset-btn"
              onClick={resetDemo}
            >
              ↻ RESET
            </button>

          </div>


          {/* ATTACK EXPLANATION */}

          <div className="attack-hint">

            <span>⚠</span>

            <div>
              <strong>Hackathon Demo:</strong>

              <p>
                Generate a signature first, then click
                <b> SIMULATE ATTACK</b>.
                The message will be modified while the
                original signature remains unchanged.
                Click <b>VERIFY MESSAGE</b> to demonstrate
                tamper detection.
              </p>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* RESULT */}
        {/* ================================================= */}

        {result && (

          <section
            className={`result-panel ${
              result.status === "ATTACK" ||
              result.status === "ATTACK SIMULATED"
                ? "result-attack"
                : result.status === "SAFE" ||
                  result.status === "VALID"
                ? "result-safe"
                : ""
            }`}
          >

            <div className="result-header">

              <div>

                <p className="panel-label">
                  SECURITY ANALYSIS RESULT
                </p>

                <h3>

                  {result.status === "ATTACK" ||
                  result.status === "ATTACK SIMULATED"
                    ? "🚨 THREAT DETECTED"
                    : result.status === "SAFE"
                    ? "🛡 MESSAGE SECURE"
                    : result.status === "VALID"
                    ? "✓ SIGNATURE VALID"
                    : result.status}

                </h3>

              </div>

              {result.threat_score !== null &&
                result.threat_score !== undefined && (

                  <div className="threat-score">

                    <span>THREAT SCORE</span>

                    <strong>
                      {result.threat_score}
                    </strong>

                  </div>

                )}

            </div>


            {/* VERIFICATION DETAILS */}

            <div className="verification-grid">

              {result.signature_valid !== null &&
                result.signature_valid !== undefined && (

                  <div className="verification-item">

                    <span>
                      DIGITAL SIGNATURE
                    </span>

                    <strong
                      className={
                        result.signature_valid
                          ? "valid"
                          : "invalid"
                      }
                    >
                      {result.signature_valid
                        ? "✓ VALID"
                        : "✕ INVALID"}
                    </strong>

                  </div>

                )}


              {result.quantum_verified !== null &&
                result.quantum_verified !== undefined && (

                  <div className="verification-item">

                    <span>
                      QUANTUM VERIFICATION
                    </span>

                    <strong
                      className={
                        result.quantum_verified
                          ? "valid"
                          : "invalid"
                      }
                    >
                      {result.quantum_verified
                        ? "✓ VERIFIED"
                        : "✕ FAILED"}
                    </strong>

                  </div>

                )}

            </div>


            {/* REASONS */}

            {result.reasons &&
              result.reasons.length > 0 && (

                <div className="reasons">

                  <h4>
                    Detection Analysis
                  </h4>

                  {result.reasons.map(
                    (reason, index) => (

                      <div
                        className="reason"
                        key={index}
                      >
                        <span>›</span>
                        {reason}
                      </div>

                    )
                  )}

                </div>

              )}

          </section>

        )}


        {/* ================================================= */}
        {/* QUANTUM ANALYSIS */}
        {/* ================================================= */}

        <section className="panel">

          <div className="panel-header">

            <div>
              <p className="panel-label">
                QUANTUM SECURITY LAYER
              </p>

              <h3>
                ⚛ Quantum Measurement Analysis
              </h3>
            </div>

            {pauliData && (
              <div className="quantum-status">
                {pauliData.status}
              </div>
            )}

          </div>


          {pauliData && (

            <>

              {/* QUANTUM METRICS */}

              <div className="quantum-metrics">

                <div className="quantum-card">

                  <span>Z-BASIS CORRELATION</span>

                  <strong>
                    {(
                      pauliData.pauli_basis.Z.correlation *
                      100
                    ).toFixed(1)}
                    %
                  </strong>

                </div>


                <div className="quantum-card">

                  <span>X-BASIS CORRELATION</span>

                  <strong>
                    {(
                      pauliData.pauli_basis.X.correlation *
                      100
                    ).toFixed(1)}
                    %
                  </strong>

                </div>


                <div className="quantum-card">

                  <span>AVERAGE CORRELATION</span>

                  <strong>
                    {(
                      pauliData.average_correlation *
                      100
                    ).toFixed(1)}
                    %
                  </strong>

                </div>


                <div className="quantum-card">

                  <span>ANOMALY SCORE</span>

                  <strong>
                    {pauliData.anomaly_score}
                  </strong>

                </div>

              </div>


              {/* MEASUREMENT COUNTS */}

              <div className="measurement-grid">

                <div className="measurement-card">

                  <h4>
                    Z BASIS MEASUREMENTS
                  </h4>

                  <div className="measurement-values">

                    <div>
                      <span>00</span>
                      <strong>
                        {pauliData.pauli_basis.Z.counts["00"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>11</span>
                      <strong>
                        {pauliData.pauli_basis.Z.counts["11"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>01</span>
                      <strong>
                        {pauliData.pauli_basis.Z.counts["01"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>10</span>
                      <strong>
                        {pauliData.pauli_basis.Z.counts["10"] ||
                          0}
                      </strong>
                    </div>

                  </div>

                </div>


                <div className="measurement-card">

                  <h4>
                    X BASIS MEASUREMENTS
                  </h4>

                  <div className="measurement-values">

                    <div>
                      <span>00</span>
                      <strong>
                        {pauliData.pauli_basis.X.counts["00"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>11</span>
                      <strong>
                        {pauliData.pauli_basis.X.counts["11"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>01</span>
                      <strong>
                        {pauliData.pauli_basis.X.counts["01"] ||
                          0}
                      </strong>
                    </div>

                    <div>
                      <span>10</span>
                      <strong>
                        {pauliData.pauli_basis.X.counts["10"] ||
                          0}
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

            </>

          )}

        </section>


        {/* ================================================= */}
        {/* SECURITY ARCHITECTURE */}
        {/* ================================================= */}

        <section className="panel">

          <div className="panel-header">

            <div>
              <p className="panel-label">
                SYSTEM ARCHITECTURE
              </p>

              <h3>
                🛡 Multi-Layer Security
              </h3>
            </div>

          </div>


          <div className="security-layers">

            <div className="security-layer">

              <div className="layer-number">
                01
              </div>

              <div>
                <h4>
                  SHA-256 HASHING
                </h4>

                <p>
                  Generates a unique cryptographic
                  fingerprint for every message.
                </p>
              </div>

            </div>


            <div className="security-layer">

              <div className="layer-number">
                02
              </div>

              <div>
                <h4>
                  RSA DIGITAL SIGNATURE
                </h4>

                <p>
                  Verifies message authenticity and
                  detects content modification.
                </p>
              </div>

            </div>


            <div className="security-layer">

              <div className="layer-number">
                03
              </div>

              <div>
                <h4>
                  BELL-STATE VERIFICATION
                </h4>

                <p>
                  Uses quantum entanglement simulation
                  for correlation-based verification.
                </p>
              </div>

            </div>


            <div className="security-layer">

              <div className="layer-number">
                04
              </div>

              <div>
                <h4>
                  THREAT DETECTION
                </h4>

                <p>
                  Combines verification results to
                  classify SAFE, SUSPICIOUS or ATTACK.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* SECURITY LOGS */}
        {/* ================================================= */}

        <section className="panel logs-panel">

          <div className="panel-header">

            <div>
              <p className="panel-label">
                SECURITY MONITORING
              </p>

              <h3>
                📡 Security Event Logs
              </h3>
            </div>

            <span className="log-count">
              {logs.length} EVENTS
            </span>

          </div>


          {logs.length === 0 ? (

            <div className="empty-logs">
              No security events recorded yet.
            </div>

          ) : (

            <div className="logs-table">

              <div className="log-row log-head">

                <span>ID</span>
                <span>STATUS</span>
                <span>SIGNATURE</span>
                <span>QUANTUM</span>
                <span>THREAT</span>

              </div>


              {logs.slice(0, 10).map((log) => (

                <div
                  className="log-row"
                  key={log.id}
                >

                  <span>
                    #{log.id}
                  </span>

                  <span
                    className={`log-status ${
                      log.status?.toLowerCase()
                    }`}
                  >
                    {log.status}
                  </span>

                  <span>
                    {String(log.signature_valid) ===
                    "True"
                      ? "✓ VALID"
                      : "✕ INVALID"}
                  </span>

                  <span>
                    {String(log.quantum_valid) ===
                    "True"
                      ? "✓ VERIFIED"
                      : "✕ FAILED"}
                  </span>

                  <span>
                    {log.threat_score}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="footer">

        <div>
          <strong>CRYPTONOVA</strong>
          <span>
            Quantum-Enhanced Digital Signature
            & Cyber Threat Detection
          </span>
        </div>

        <div>
          QISKIT • FASTAPI • REACT • SQLITE
        </div>

      </footer>

    </div>
  );
}

export default App;