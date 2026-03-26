import { useEffect } from "react";
import { Link } from "react-router-dom";

function MessageActionPage() {
  useEffect(() => {
    const storedScrollY = sessionStorage.getItem("message-action-scroll-y");

    if (storedScrollY !== null) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(storedScrollY), behavior: "auto" });
        sessionStorage.removeItem("message-action-scroll-y");
      });
    }
  }, []);

  return (
    <div className="app-shell">
      <header className="hero hero-single">
        <div className="hero-copy hero-centered hero-compact">
          <div className="hero-badge">Citizen Cyber Safety</div>
          <div className="hero-brand-row">
            <Link to="/" className="brand-link hero-brand-link">
              ScamLens
            </Link>
          </div>
          <div className="hero-ribbon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="hero-page-title">Cyber Safety Guidelines for Citizens (India)</p>
          <p className="hero-text">
            Review these prevention practices and immediate response steps so you know what to do
            after a suspicious message is detected.
          </p>
        </div>
      </header>

      <section className="single-focus-grid page-utility-row">
        <Link to="/analyze-message" className="back-link">
          Back to Message Defense
        </Link>
      </section>

      <section className="single-focus-grid response-guide-grid">
        <section className="panel guide-panel">
          <p className="eyebrow">Prevention</p>
          <h2>Cyber Safety Guidelines for Citizens (India)</h2>
          <ol className="step-list">
            <li>
              Do not share confidential banking information. Citizens must never share OTP, PIN,
              CVV, passwords, or banking credentials with anyone. Financial institutions,
              including the Reserve Bank of India, never request such information through calls,
              messages, or emails.
            </li>
            <li>
              Avoid clicking on unknown or suspicious links. Fraudulent links are often designed
              to mimic legitimate websites and may lead to phishing attacks or malware
              installation.
            </li>
            <li>
              Verify the identity of callers and messages. Scammers often impersonate banks,
              government departments, courier services, or support teams, so communication should
              be confirmed through official channels before any action is taken.
            </li>
            <li>
              Use only trusted and official platforms. Applications and software should be
              downloaded only from authorized app stores or official websites.
            </li>
            <li>
              Enable multi-factor authentication on important accounts to improve security and
              reduce the risk of unauthorized access.
            </li>
            <li>
              Be cautious of unrealistic offers, including lottery winnings, reward claims, or
              guaranteed returns, because these are commonly used in fraudulent schemes.
            </li>
            <li>
              Avoid installing remote access or screen-sharing applications at the request of
              unknown individuals, as these can expose personal and financial information.
            </li>
            <li>
              Check website authenticity before entering details. Confirm the correct domain and
              secure HTTPS connection before submitting sensitive information.
            </li>
            <li>
              Maintain strong and unique passwords. Passwords should be complex, updated
              regularly, and not reused across multiple platforms.
            </li>
            <li>
              Do not share personal identification documents unnecessarily. Aadhaar, PAN, bank
              statements, and similar documents should only be shared with verified and trusted
              entities.
            </li>
            <li>
              Report cyber incidents promptly through authorized channels. Early reporting improves
              the chances of limiting damage and recovering funds.
            </li>
          </ol>
        </section>

        <section className="panel guide-panel guide-panel-accent">
          <p className="eyebrow">Immediate Response</p>
          <h2>Recommended Actions in Case of Cyber Fraud</h2>
          <ol className="step-list">
            <li>
              Contact the national cybercrime helpline immediately on <strong>1930</strong>. Early
              reporting is critical when financial cyber fraud is suspected.
            </li>
            <li>
              File a complaint on the official National Cyber Crime Reporting Portal with all
              relevant information and supporting evidence.
            </li>
            <li>
              Inform the concerned bank or financial institution immediately so they can block
              accounts, cards, or suspicious transactions.
            </li>
            <li>
              Change all important credentials for banking, email, and other sensitive accounts as
              soon as possible.
            </li>
            <li>
              Secure the affected device by disconnecting it if needed, scanning it for malware,
              and checking for unauthorized applications or unusual activity.
            </li>
          </ol>
        </section>
      </section>
    </div>
  );
}

export default MessageActionPage;
