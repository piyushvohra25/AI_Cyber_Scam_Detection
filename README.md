# AI-Powered Cyber Scam Detection and Threat Analysis System

Production-ready MERN + AI microservice project for scam message detection, phishing URL analysis, explainable reasoning, and graph-based phishing traversal.

## Architecture

- `client`: React + Vite frontend
- `server`: Node.js + Express API + MongoDB persistence
- `ai-service`: FastAPI microservice for ML inference, rule reasoning, and BFS/DFS phishing graph analysis

## Features

- Scam message detection using TF-IDF + Logistic Regression
- URL risk analysis using engineered features + Logistic Regression
- Hybrid explainability with ML confidence + triggered rules
- BFS and DFS phishing network exploration from a mock graph dataset
- MongoDB storage of all message and URL analyses
- Responsive dashboard with risk meters, keyword highlighting, and graph views

## Prerequisites

- Node.js 20+
- Python 3.11+
- MongoDB running locally or via MongoDB Atlas

## Environment Setup

### Server

Create `server/.env` from `server/.env.example`.

### Client

Create `client/.env` from `client/.env.example`.

### AI Service

Create `ai-service/.env` from `ai-service/.env.example`.

## Install

### Root / Frontend / Backend

```bash
npm install
```

### Python AI Service

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Run Locally

### 1. Start MongoDB

Ensure MongoDB is available at the connection string in `server/.env`.

### 2. Start the AI microservice

```bash
cd ai-service
uvicorn app.main:app --reload --port 8000
```

### 3. Start the Node backend

```bash
cd server
npm install
npm run dev
```

### 4. Start the React frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`, the Node API on `http://localhost:5000`, and the AI service on `http://localhost:8000`.

## API Overview

### Node API

- `POST /api/analyze-message`
- `POST /api/analyze-url`
- `GET /api/health`

### AI Service

- `GET /health`
- `POST /predict-message`
- `POST /predict-url`

## Sample Inputs

### Message

`Congratulations! Your bank account has been suspended. Verify your OTP now to avoid closure.`

### URL

`http://secure-login-verify-bank.example-alert.com/update`

## Notes

- Models are trained at AI-service startup from bundled sample datasets.
- Graph analysis uses a mock phishing relationship dataset, as requested.
- The system is modular, so datasets and rules can be replaced with production feeds later.
