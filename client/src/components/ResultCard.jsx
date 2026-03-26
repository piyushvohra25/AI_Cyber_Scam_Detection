const riskMeterClassMap = {
  Low: "meter-low",
  Medium: "meter-medium",
  High: "meter-high",
  Safe: "meter-low",
  Suspicious: "meter-medium",
  Scam: "meter-high",
  "Likely Safe": "meter-low",
};

const resultToneClassMap = {
  Low: "result-tone-low",
  Medium: "result-tone-medium",
  High: "result-tone-high",
  Safe: "result-tone-low",
  Suspicious: "result-tone-medium",
  Scam: "result-tone-high",
  "Likely Safe": "result-tone-low",
};

const highlightText = (text, keywords = []) => {
  if (!text) return text;

  const keywordMap = new Map(
    keywords.map((item) => [item.word.toLowerCase(), item.severity.toLowerCase()])
  );

  return text.split(/(\s+)/).map((token, index) => {
    const normalized = token.replace(/[^a-zA-Z0-9:/.-]/g, "").toLowerCase();
    const severity = keywordMap.get(normalized);

    if (!severity) {
      return <span key={`${token}-${index}`}>{token}</span>;
    }

    return (
      <mark key={`${token}-${index}`} className={`token token-${severity}`}>
        {token}
      </mark>
    );
  });
};

const formatFeatureLabel = (key) =>
  key
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function ResultCard({ title, result, input, inputType }) {
  if (!result) return null;

  const meterClass = riskMeterClassMap[result.risk_level] || riskMeterClassMap[result.classification];
  const toneClass = resultToneClassMap[result.risk_level] || resultToneClassMap[result.classification];
  const primaryReason = result.reasoning?.[0] || "No additional reasoning available.";

  return (
    <section className={`result-card ${toneClass}`}>
      <div className="result-hero">
        <div className="result-identity">
          <p className="eyebrow">{title}</p>
          <h3>{result.classification}</h3>
          <p className="result-summary">{primaryReason}</p>
        </div>
        <div className={`risk-meter ${meterClass}`}>
          <span className="risk-meter-label">{result.risk_level} Risk</span>
          <strong className="risk-meter-score">{Math.round(result.score * 100)}%</strong>
          <small className="risk-meter-caption">Confidence Score</small>
        </div>
      </div>

      <div className="result-overview">
        <div className="overview-card overview-card-primary">
          <span className="overview-label">Recommended Action</span>
          <p>{result.recommendation}</p>
        </div>
        <div className="overview-card">
          <span className="overview-label">Assessment</span>
          <p>
            {inputType === "message"
              ? `The message was classified as ${result.classification.toLowerCase()} with ${result.risk_level.toLowerCase()} risk.`
              : `The link was classified as ${result.classification.toLowerCase()} with ${result.risk_level.toLowerCase()} risk.`}
          </p>
          {result.scam_type && (
            <p>
              <strong>Scam Type:</strong> {result.scam_type}
            </p>
          )}
        </div>
      </div>

      <div className="result-block">
        <h4>Analyzed Input</h4>
        <div className="input-preview">
          <p>{inputType === "message" ? highlightText(input, result.highlighted_keywords) : input}</p>
        </div>
      </div>

      <div className="grid two-column">
        <div className="result-block evidence-card">
          <h4>Why This Was Flagged</h4>
          <ul>
            {result.reasoning.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-block evidence-card">
          <h4>Triggered Rules</h4>
          <ul>
            {result.triggered_rules.map((rule) => (
              <li key={rule.name}>
                <strong>{rule.name}:</strong> {rule.reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid two-column">
        <div className="result-block evidence-card">
          <h4>{inputType === "message" ? "Suspicious Keywords" : "Risk Features"}</h4>
          {inputType === "message" ? (
            <div className="keyword-list">
              {result.highlighted_keywords.length ? (
                result.highlighted_keywords.map((keyword) => (
                  <span key={keyword.word} className={`pill pill-${keyword.severity.toLowerCase()}`}>
                    {keyword.word}
                  </span>
                ))
              ) : (
                <span className="pill pill-low">No strong keywords</span>
              )}
            </div>
          ) : (
            <div className="feature-grid">
              {Object.entries(result.extracted_features).map(([key, value]) => (
                <div key={key} className="feature-item">
                  <span>{formatFeatureLabel(key)}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        {result.graph_analysis ? (
          <div className="result-block evidence-card">
            <h4>Phishing Network View</h4>
            <div className="feature-grid compact-grid">
              <div className="feature-item">
                <span>Network Depth</span>
                <strong>{result.graph_analysis.network_depth}</strong>
              </div>
              <div className="feature-item">
                <span>Suspicious Nodes</span>
                <strong>{result.graph_analysis.connected_suspicious_nodes.length}</strong>
              </div>
            </div>
            <p className="mini-label">BFS Traversal</p>
            <div className="chain-list">
              {result.graph_analysis.bfs_chain.map((node) => (
                <span key={`bfs-${node}`} className="chain-pill">
                  {node}
                </span>
              ))}
            </div>
            <p className="mini-label">DFS Traversal</p>
            <div className="chain-list">
              {result.graph_analysis.dfs_chain.map((node) => (
                <span key={`dfs-${node}`} className="chain-pill">
                  {node}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="result-block evidence-card">
            <h4>Message Profile</h4>
            <div className="feature-grid compact-grid">
              {Object.entries(result.extracted_features || {}).map(([key, value]) => (
                <div key={key} className="feature-item">
                  <span>{formatFeatureLabel(key)}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultCard;
