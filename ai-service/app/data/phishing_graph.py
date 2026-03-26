PHISHING_GRAPH = {
    "http://secure-login-verify-bank.example-alert.com/update": [
        "http://otp-reset-secure-check.net/verify@user",
        "http://verify-banking-login-alert.xyz/auth",
    ],
    "http://otp-reset-secure-check.net/verify@user": [
        "http://secure-login-verify-bank.example-alert.com/update",
        "http://free-prize-claim-now.ru/win",
    ],
    "http://verify-banking-login-alert.xyz/auth": [
        "http://account-alert.paypal.verify-user.co/login"
    ],
    "http://account-alert.paypal.verify-user.co/login": [
        "http://signin-update-wallet.cn/recover"
    ],
    "http://signin-update-wallet.cn/recover": [],
    "http://free-prize-claim-now.ru/win": [],
    "https://company-hr-portal.com/careers": [
        "https://docs.python.org/3/library"
    ],
    "https://docs.python.org/3/library": [],
    "https://www.github.com/openai": [],
    "https://bank.example.com/security-guidance": [],
    "https://news.example.org/world": [],
    "https://support.microsoft.com/security": [],
}

SUSPICIOUS_NODES = {
    "http://secure-login-verify-bank.example-alert.com/update",
    "http://otp-reset-secure-check.net/verify@user",
    "http://verify-banking-login-alert.xyz/auth",
    "http://account-alert.paypal.verify-user.co/login",
    "http://signin-update-wallet.cn/recover",
    "http://free-prize-claim-now.ru/win",
}
