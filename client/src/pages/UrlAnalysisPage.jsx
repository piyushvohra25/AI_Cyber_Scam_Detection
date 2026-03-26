import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import ResultCard from "../components/ResultCard";
import { api } from "../api";

function UrlAnalysisPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contentColumnRef = useRef(null);

  useEffect(() => {
    if (result && contentColumnRef.current) {
      contentColumnRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/analyze-url", { url });
      setResult(response.data.result);
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to analyze the URL right now.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUrl("");
    setResult(null);
    setError("");
  };

  return (
    <PageLayout
      title="URL Analysis"
      description="Enter a suspicious URL and inspect its risk level, extracted indicators, and phishing network behavior in one place."
      compactHero
    >
      {error && <div className="alert single-focus-grid">{error}</div>}
      <section className="analysis-page-grid single-focus-grid two-pane-grid">
        <div className="side-action-column">
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>

        <div className="analysis-content-column" ref={contentColumnRef}>
          <section className="panel url-panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">URL Defense</p>
                <h2>Suspicious Link Analyzer</h2>
              </div>
            </div>
            <label htmlFor="url">Enter a URL to inspect</label>
            <input
              id="url"
              type="url"
              name="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="http://secure-login-verify-bank.example-alert.com/update"
            />

            {!result ? (
              <button
                className="action-btn action-btn-url"
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
              >
                {loading ? "Analyzing..." : "Analyze URL"}
              </button>
            ) : (
              <div className="button-row button-row-split">
                <button className="ghost-btn" onClick={clearAll}>
                  Clear
                </button>
                <Link
                  to="/link-exposure"
                  preventScrollReset
                  className="danger-link-btn"
                >
                  Have You Clicked The Link?
                </Link>
              </div>
            )}
          </section>

          <ResultCard title="URL Analysis" result={result} input={url} inputType="url" />
        </div>
      </section>
    </PageLayout>
  );
}

export default UrlAnalysisPage;
