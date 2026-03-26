import re
from typing import Any


MESSAGE_RULES = [
    {
        "name": "OTP Request",
        "pattern": re.compile(r"\botp|one[- ]time password\b", re.IGNORECASE),
        "reason": "Requests for OTPs are strongly associated with account takeover scams.",
        "severity": "high",
    },
    {
        "name": "Urgency Pressure",
        "pattern": re.compile(r"\burgent|immediately|final warning|now\b", re.IGNORECASE),
        "reason": "Urgent language is commonly used to pressure victims into acting quickly.",
        "severity": "medium",
    },
    {
        "name": "Prize Bait",
        "pattern": re.compile(r"\bwon|prize|claim|reward|lottery\b", re.IGNORECASE),
        "reason": "Prize and reward claims are common scam lures.",
        "severity": "medium",
    },
    {
        "name": "Credential Harvesting",
        "pattern": re.compile(r"\bpassword|pin|bank|account|verify\b", re.IGNORECASE),
        "reason": "Requests for account verification or credentials indicate phishing intent.",
        "severity": "high",
    },
    {
        "name": "Job Scam Fee",
        "pattern": re.compile(r"\bjob|register|processing fee|work from home\b", re.IGNORECASE),
        "reason": "Fake job offers often request upfront registration or processing payments.",
        "severity": "medium",
    },
]


def get_message_scam_type(message: str) -> str:
    lowered = message.lower()
    if any(keyword in lowered for keyword in ["lottery", "reward", "prize", "cashback"]):
        return "lottery"
    if any(keyword in lowered for keyword in ["otp", "one-time password", "atm"]):
        return "otp"
    if any(keyword in lowered for keyword in ["job", "work from home", "processing fee"]):
        return "job scam"
    if any(keyword in lowered for keyword in ["bank", "kyc", "account", "pin", "debit", "card"]):
        return "banking"
    return "general fraud"


def analyze_message_rules(message: str) -> tuple[list[dict[str, str]], list[dict[str, str]], list[str]]:
    triggered_rules = []
    highlighted_keywords = []
    reasoning = []
    lowered_message = message.lower()

    for rule in MESSAGE_RULES:
        matches = rule["pattern"].findall(message)
        if not matches:
            continue

        triggered_rules.append({"name": rule["name"], "reason": rule["reason"]})
        reasoning.append(rule["reason"])

        for match in matches:
            keyword = match if isinstance(match, str) else " ".join(match)
            normalized = keyword.strip().lower()
            if normalized and normalized in lowered_message:
                highlighted_keywords.append({
                    "word": normalized,
                    "severity": rule["severity"],
                })

    deduplicated_keywords = list(
        {(item["word"], item["severity"]): item for item in highlighted_keywords}.values()
    )
    deduplicated_reasoning = list(dict.fromkeys(reasoning))
    return triggered_rules, deduplicated_keywords, deduplicated_reasoning


def analyze_url_rules(features: dict[str, Any]) -> tuple[list[dict[str, str]], list[str]]:
    triggered_rules = []
    reasoning = []

    if features["url_length"] > 45:
        triggered_rules.append(
            {
                "name": "Long URL",
                "reason": "Excessively long URLs are often used to obscure malicious destinations.",
            }
        )
        reasoning.append("The URL is unusually long, which can hide phishing intent.")

    if features["dot_count"] >= 3 or features["subdomain_depth"] >= 2:
        triggered_rules.append(
            {
                "name": "Subdomain Obfuscation",
                "reason": "Multiple subdomains can be used to mimic legitimate brands.",
            }
        )
        reasoning.append("The URL uses multiple dots or subdomains, which may imitate a trusted host.")

    if features["has_at_symbol"]:
        triggered_rules.append(
            {
                "name": "At-Symbol Injection",
                "reason": "The @ symbol can obscure the real destination in phishing URLs.",
            }
        )
        reasoning.append("The URL contains an @ symbol, a classic phishing obfuscation technique.")

    if not features["uses_https"]:
        triggered_rules.append(
            {
                "name": "Missing HTTPS",
                "reason": "Suspicious pages often avoid TLS or use insecure links.",
            }
        )
        reasoning.append("The URL does not use HTTPS, reducing trust and integrity.")

    if features["suspicious_keyword_count"] > 0:
        triggered_rules.append(
            {
                "name": "Suspicious Keywords",
                "reason": "Brand or account-verification words suggest phishing targeting.",
            }
        )
        reasoning.append(
            f"Suspicious keywords detected: {', '.join(features['suspicious_keywords'])}."
        )

    return triggered_rules, reasoning


def risk_bucket(score: float) -> str:
    if score >= 0.75:
        return "High"
    if score >= 0.4:
        return "Medium"
    return "Low"
