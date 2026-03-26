import { Link } from "react-router-dom";

function BrandHero({ title, description, compact = false }) {
  return (
    <header className={`hero hero-single ${compact ? "hero-compact-shell" : ""}`}>
      <div className={`hero-copy hero-centered ${compact ? "hero-compact" : ""}`}>
        <div className="hero-badge">AI Detection System</div>
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
        {title && <p className="hero-page-title">{title}</p>}
        <p className="hero-text">{description}</p>
      </div>
    </header>
  );
}

function PageLayout({ title, description, compactHero = false, children }) {
  return (
    <div className="app-shell">
      <BrandHero title={title} description={description} compact={compactHero} />
      {children}
    </div>
  );
}

export default PageLayout;
