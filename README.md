# CRYPTONOVA
### Quantum-Inspired Cyber Threat Detection for Digital Signature Security

CRYPTONOVA is a cybersecurity project that explores digital signature verification using classical cryptography and quantum-circuit simulations. It combines RSA and SHA-256 with selected quantum computing concepts implemented using Qiskit to demonstrate integrity verification and experimental correlation checks.

## Overview

Digital signatures help establish the authenticity and integrity of digital messages and documents. However, compromised keys, implementation vulnerabilities, message tampering, and future quantum computing capabilities present ongoing security challenges.

CRYPTONOVA explores a layered verification approach that combines established cryptographic checks with quantum-inspired experiments.

## Objectives

- Implement RSA digital signature generation and verification.
- Use SHA-256 for message hashing and integrity checking.
- Detect modified messages through cryptographic verification.
- Simulate quantum circuits using Qiskit.
- Explore Bell states, entanglement, and measurement correlations.
- Demonstrate quantum teleportation concepts.
- Experiment with Pauli X and Z quantum gates.
- Present verification results in an understandable format.

## Key Features

- RSA-based digital signature operations.
- SHA-256 message digest generation.
- Message integrity verification.
- Testing with modified messages.
- Quantum circuit simulation using Qiskit.
- Bell-state and correlation experiments.
- Quantum teleportation simulation.
- Pauli X and Z gate experiments.
- Separate reporting of cryptographic verification and quantum simulation results.

Feature availability depends on the current implementation of each module.

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | Core security logic |
| RSA | Digital signature operations |
| SHA-256 | Message hashing and integrity checks |
| Qiskit | Quantum circuit construction |
| AerSimulator | Quantum circuit simulation |
| React | Frontend interface |
| Vite | Frontend development and build tooling |
| JavaScript, HTML, CSS | User interface |

## System Workflow

1. Provide a message and signing data.
2. Generate a SHA-256 digest and RSA digital signature.
3. Verify the signature and message integrity.
4. Execute selected quantum circuit experiments.
5. Compare simulated measurements with expected results.
6. Display cryptographic verification and experimental results separately.

## Quantum Computing Concepts

### Bell States and Entanglement
Prepare entangled quantum states and study correlations between measurement outcomes.

### Quantum Teleportation
Simulate the transfer of a quantum state using entanglement, measurements, classical communication, and conditional operations.

### Pauli X and Z Gates
Apply quantum gates and observe their effects on qubit states and measurement results.

## Project Structure

The following is an illustrative structure. Adapt it to match the actual files in your repository.

```text
CRYPTONOVA/
├── security.py
├── pyproject.toml
├── uv.lock
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
├── README.md
└── .gitignore
```

## Installation and Setup

### Prerequisites

- Python 3.11 or another version supported by the project dependencies.
- uv Python package and project manager.
- Node.js and npm, if running the React frontend.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/deepuashu2007/CRYPTONOVA.git
cd CRYPTONOVA
```

Replace the repository URL if your project is hosted elsewhere.

### 2. Set up the Python environment

If the repository contains `pyproject.toml` and `uv.lock`, install the declared dependencies using:

```bash
uv sync
```

If those files are not present, follow the dependency installation method used by the actual project.

### 3. Run the Python application

Activate the environment if needed:

```powershell
.venv\Scripts\Activate.ps1
```

Run the appropriate Python entry point. For example, if `main.py` is the entry point:

```bash
uv run python main.py
```

Adjust the command to match the actual application entry point.

### 4. Run the frontend

If the React application is located in a `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

## Expected Outcomes

- Demonstration of RSA digital signature verification.
- Detection of message modifications through cryptographic checks.
- Simulation of selected quantum computing concepts.
- Comparison of quantum measurement outcomes with expected correlations.
- A prototype for exploring layered digital signature verification.

## Limitations

CRYPTONOVA is a prototype and experimental project. Quantum simulation does not automatically make RSA quantum-safe. Bell-state correlations and quantum measurements do not independently prove that a real-world cyberattack has occurred.

RSA and SHA-256 serve different purposes, and hashing alone does not provide digital signature authentication. Security claims require appropriate testing, secure key management, and careful interpretation of experimental results.

## UN Sustainable Development Goals

- **SDG 9 — Industry, Innovation and Infrastructure:** Supports exploration of innovative approaches to digital security and resilient digital infrastructure.
- **SDG 16 — Peace, Justice and Strong Institutions:** Relates to trustworthy digital communications, integrity, and authentication.

These