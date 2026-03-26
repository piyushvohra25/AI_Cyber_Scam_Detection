import { useEffect } from "react";
import { Link } from "react-router-dom";

function LinkExposurePage() {
  useEffect(() => {
    const storedScrollY = sessionStorage.getItem("link-exposure-scroll-y");

    if (storedScrollY !== null) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(storedScrollY), behavior: "auto" });
        sessionStorage.removeItem("link-exposure-scroll-y");
      });
    }
  }, []);

  return (
    <div className="app-shell">
      <header className="hero hero-single">
        <div className="hero-copy hero-centered hero-compact emergency-hero">
          <div className="hero-badge danger-badge">Link Exposure Response</div>
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
          <p className="hero-page-title">Clicked a Suspicious Link</p>
          <p className="hero-text">
            Follow these immediate and next-step actions based on official Indian cybercrime and
            banking guidance.
          </p>
        </div>
      </header>

      <section className="single-focus-grid page-utility-row">
        <Link to="/analyze-url" className="back-link">
          Back to URL Defense
        </Link>
      </section>

      <section className="single-focus-grid response-guide-grid">
        <section className="panel guide-panel guide-panel-danger">
          <p className="eyebrow">Immediate Response</p>
          <h2>Step 1. Stop Interaction Right Away</h2>
          <ul>
            <li>Close the suspicious tab or app immediately and do not enter any more information.</li>
            <li>If you downloaded a file or allowed permissions, disconnect the device from the internet until you complete the next checks.</li>
            <li>Do not forward the link to anyone else, even for verification.</li>
          </ul>
        </section>

        <section className="panel guide-panel">
          <p className="eyebrow">Financial Protection</p>
          <h2>Step 2. If Banking or Payment Data Was Exposed, Act Immediately</h2>
          <ul>
            <li>Call your bank, card issuer, or payment provider immediately and request a block on cards, UPI, net banking, or wallet access if needed.</li>
            <li>Report unauthorised or suspicious transactions through your bank's official channels without delay.</li>
            <li>Change passwords, MPINs, UPI PINs, and banking credentials using only the official app or website.</li>
          </ul>
        </section>

        <section className="panel guide-panel guide-panel-accent">
          <p className="eyebrow">Government Reporting</p>
          <h2>Step 3. Report Fast Through India's Official Cybercrime System</h2>
          <ol className="step-list">
            <li>For financial cyber fraud, call <strong>1930</strong> immediately.</li>
            <li>File or complete the complaint on the official National Cyber Crime Reporting Portal: <strong>cybercrime.gov.in</strong>.</li>
            <li>Keep screenshots, the suspicious URL, payment references, SMS records, and complaint acknowledgement safely saved.</li>
          </ol>
        </section>

        <section className="panel guide-panel">
          <p className="eyebrow">Account Hygiene</p>
          <h2>Step 4. Secure Your Accounts and Device</h2>
          <ul>
            <li>Change the password of the affected account first, then update the password of your primary email account if it was linked.</li>
            <li>Sign out of active sessions where possible and enable two-factor authentication on important accounts.</li>
            <li>Run a security scan on the device before resuming normal use, especially if you downloaded anything.</li>
          </ul>
        </section>

        <section className="panel guide-panel centered-final-step">
          <p className="eyebrow">Indian Framework</p>
          <h2>Step 5. Preserve Details for Complaint and Legal Follow-Up</h2>
          <ul>
            <li>Preserve evidence such as screenshots, timestamps, phone numbers, email headers, URLs, and transaction references.</li>
            <li>Use the cybercrime portal or local cyber police process if you need further escalation.</li>
            <li>This workflow supports reporting under India's cybercrime framework, including complaints linked to the Information Technology Act, 2000 and related criminal enforcement processes.</li>
          </ul>
        </section>

        <section className="panel source-panel">
          <p className="eyebrow">Official Guidance Base</p>
          <h2>Indian Official References Used For This Page</h2>
          <ul>
            <li>Indian Cybercrime Coordination Centre: report cybercrime on <strong>cybercrime.gov.in</strong> and financial fraud on <strong>1930</strong>.</li>
            <li>Reserve Bank of India: immediately report unauthorised electronic banking transactions and use official bank grievance channels.</li>
            <li>Indian cybercrime framework: complaints and categories referenced through official Government of India cybercrime resources.</li>
          </ul>
        </section>
      </section>
    </div>
  );
}

export default LinkExposurePage;
