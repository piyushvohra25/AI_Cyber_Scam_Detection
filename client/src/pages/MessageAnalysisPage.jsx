import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import ResultCard from "../components/ResultCard";
import { api } from "../api";

function MessageAnalysisPage() {
  const [message, setMessage] = useState("");
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
      const response = await api.post("/analyze-message", { message });
      setResult(response.data.result);
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to analyze the message right now.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setMessage("");
    setResult(null);
    setError("");
  };

  return (
    <PageLayout
      title="Message Analysis"
      description="Paste a suspicious message and review the verdict, recommended action, and the signals that influenced the result."
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
          <section className="panel message-panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Message Defense</p>
                <h2>Scam Message Detection</h2>
              </div>
            </div>
            <label htmlFor="message">Paste a suspicious message</label>
            <textarea
              id="message"
              name="message"
              rows={result ? 2 : 5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Example: Congratulations! Your bank account is blocked. Share the OTP now."
            />

            {!result ? (
              <button
                className="action-btn action-btn-message"
                onClick={handleAnalyze}
                disabled={loading || !message.trim()}
              >
                {loading ? "Analyzing..." : "Analyze Message"}
              </button>
            ) : (
              <div className="button-row button-row-split">
                <button className="ghost-btn" onClick={clearAll}>
                  Clear
                </button>
                <Link
                  to="/message-action"
                  preventScrollReset
                  className="action-link-btn"
                >
                  What Should You Do Next?
                </Link>
              </div>
            )}
          </section>

          <ResultCard title="Message Analysis" result={result} input={message} inputType="message" />
        </div>
      </section>
    </PageLayout>
  );
}

export default MessageAnalysisPage;
