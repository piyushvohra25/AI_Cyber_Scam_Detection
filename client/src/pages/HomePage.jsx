import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

function HomePage() {
  return (
    <PageLayout description="Choose the analysis flow you need and move into a dedicated workspace for scam messages or suspicious URLs.">
      <section className="home-grid">
        <Link to="/analyze-message" className="choice-card choice-card-message">
          <p className="eyebrow">Option 1</p>
          <h2>Analyze Scam Message</h2>
          <p>
            Review suspicious texts, emails, or chat messages and get a clear verdict, risk level,
            key indicators, and recommended next action.
          </p>
          <span className="choice-link">Open Message Analysis</span>
        </Link>

        <Link to="/analyze-url" className="choice-card choice-card-url">
          <p className="eyebrow">Option 2</p>
          <h2>Analyze URL</h2>
          <p>
            Inspect suspicious links for phishing patterns, risky features, and related network
            behavior with focused URL intelligence.
          </p>
          <span className="choice-link">Open URL Analysis</span>
        </Link>
      </section>
    </PageLayout>
  );
}

export default HomePage;
