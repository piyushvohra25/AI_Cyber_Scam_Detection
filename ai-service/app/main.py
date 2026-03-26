import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nltk.tokenize import RegexpTokenizer
import pandas as pd

from app.schemas import MessageRequest, UrlRequest
from app.services.graph_service import analyze_graph
from app.services.model_store import model_store
from app.services.reasoning import (
    analyze_message_rules,
    analyze_url_rules,
    get_message_scam_type,
    risk_bucket,
)
from app.services.url_features import extract_url_features

load_dotenv()
message_tokenizer = RegexpTokenizer(r"\w+")

app = FastAPI(
    title="Cyber Scam Detection AI Service",
    version="1.0.0",
    description="ML + rule-based phishing and scam analysis microservice.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _message_recommendation(score: float) -> str:
    if score >= 0.75:
        return "Do not respond, avoid clicking any links, and report the sender to your security team immediately."
    if score >= 0.4:
        return "Treat the message as suspicious, verify the request through an official channel, and do not share sensitive information."
    return "Low scam likelihood, but continue verifying unusual requests before taking action."


def _url_recommendation(score: float) -> str:
    if score >= 0.75:
        return "Do not open or share this URL. Block it internally and verify the domain through trusted security tools."
    if score >= 0.4:
        return "Use caution, inspect the domain ownership, and confirm legitimacy before interacting with the page."
    return "The URL appears lower risk, but continue validating unknown links before use."


@app.get("/health")
def health_check() -> dict:
    return {
        "status": "ok",
        "service": "ai-service",
        "port": int(os.getenv("SERVICE_PORT", "8000")),
    }


@app.post("/predict-message")
def predict_message(payload: MessageRequest) -> dict:
    pipeline = model_store.message_bundle["pipeline"]
    probabilities = pipeline.predict_proba([payload.message])[0]
    score = float(probabilities[1])
    label = "Scam" if score >= 0.5 else "Safe"
    scam_type = get_message_scam_type(payload.message) if label == "Scam" else "legitimate"
    triggered_rules, highlighted_keywords, rule_reasoning = analyze_message_rules(payload.message)
    tokens = message_tokenizer.tokenize(payload.message.lower())

    reasoning = [
        f"ML confidence indicates a {score * 100:.1f}% probability that this message is a scam.",
        f"Message category assessment: {scam_type}.",
    ]
    reasoning.extend(rule_reasoning)

    if not triggered_rules:
        triggered_rules.append(
            {
                "name": "No Major Rule Trigger",
                "reason": "The decision leaned mainly on the machine learning model rather than strong scam keywords.",
            }
        )

    return {
        "score": round(score, 4),
        "risk_level": risk_bucket(score),
        "classification": label,
        "scam_type": scam_type,
        "reasoning": reasoning,
        "recommendation": _message_recommendation(score),
        "triggered_rules": triggered_rules,
        "highlighted_keywords": highlighted_keywords,
        "extracted_features": {
            "message_length": len(payload.message),
            "word_count": len(payload.message.split()),
            "token_count": len(tokens),
        },
    }


@app.post("/predict-url")
def predict_url(payload: UrlRequest) -> dict:
    features = extract_url_features(payload.url)
    feature_frame = pd.DataFrame(
        [[features[column] for column in model_store.url_bundle["feature_columns"]]],
        columns=model_store.url_bundle["feature_columns"],
    )
    classifier = model_store.url_bundle["classifier"]
    probabilities = classifier.predict_proba(feature_frame)[0]
    score = float(probabilities[1])
    triggered_rules, rule_reasoning = analyze_url_rules(features)
    graph_analysis = analyze_graph(payload.url)

    reasoning = [
        f"ML confidence indicates a {score * 100:.1f}% probability of phishing risk.",
        f"The URL includes {features['suspicious_keyword_count']} suspicious keyword matches.",
        f"Graph traversal found {len(graph_analysis['connected_suspicious_nodes'])} connected suspicious nodes.",
    ]
    reasoning.extend(rule_reasoning)

    if not triggered_rules:
        triggered_rules.append(
            {
                "name": "Benign Feature Pattern",
                "reason": "The URL structure looks closer to benign examples from the training data.",
            }
        )

    classification = "Suspicious" if score >= 0.5 else "Likely Safe"

    return {
        "score": round(score, 4),
        "risk_level": risk_bucket(score),
        "classification": classification,
        "reasoning": reasoning,
        "recommendation": _url_recommendation(score),
        "triggered_rules": triggered_rules,
        "highlighted_keywords": [
            {"word": keyword, "severity": "high"} for keyword in features["suspicious_keywords"]
        ],
        "extracted_features": {
            key: value for key, value in features.items() if key != "suspicious_keywords"
        },
        "graph_analysis": graph_analysis,
    }
