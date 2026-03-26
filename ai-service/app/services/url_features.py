from urllib.parse import urlparse


SUSPICIOUS_KEYWORDS = {
    "verify",
    "login",
    "update",
    "bank",
    "wallet",
    "secure",
    "otp",
    "prize",
    "claim",
    "alert",
    "signin",
    "recover",
}


def extract_url_features(url: str) -> dict:
    parsed = urlparse(url if "://" in url else f"http://{url}")
    host = parsed.netloc or parsed.path
    normalized_url = url.lower()
    suspicious_hits = [keyword for keyword in SUSPICIOUS_KEYWORDS if keyword in normalized_url]

    return {
        "url_length": len(url),
        "dot_count": url.count("."),
        "has_at_symbol": int("@" in url),
        "uses_https": int(parsed.scheme == "https"),
        "hyphen_count": url.count("-"),
        "digit_count": sum(character.isdigit() for character in url),
        "subdomain_depth": max(host.count(".") - 1, 0),
        "suspicious_keyword_count": len(suspicious_hits),
        "suspicious_keywords": suspicious_hits,
    }
