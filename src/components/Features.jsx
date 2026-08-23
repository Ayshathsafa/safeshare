function Features() {
  const styles = {
    section: {
      padding: "80px 8%",
      background: "#f8fafc",
    },
    title: {
      textAlign: "center",
      fontSize: "42px",
      color: "#0f172a",
      marginBottom: "15px",
    },
    subtitle: {
      textAlign: "center",
      color: "#666",
      fontSize: "18px",
      marginBottom: "50px",
    },
    grid: {
      maxWidth: "1200px",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
      gap: "30px",
    },
    card: {
      background: "#fff",
      padding: "35px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    },
    icon: {
      fontSize: "50px",
      marginBottom: "20px",
    },
    heading: {
      color: "#16a34a",
      marginBottom: "15px",
    },
    text: {
      color: "#555",
      lineHeight: "1.6",
    },
  };

  return (
    <section className="features-section">
      <div className="section-content">
        <h2 className="section-title">Why Choose SafeShare?</h2>

        <p className="section-subtitle">
          SafeShare makes donation simple, secure, and AI-powered.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍱</div>
            <h3 className="feature-heading">Food Donation</h3>
            <p className="feature-text">Donate surplus food to people and NGOs safely.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3 className="feature-heading">Medicine Sharing</h3>
            <p className="feature-text">Share unused medicines with verified recipients.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-heading">AI Matching</h3>
            <p className="feature-text">AI matches donors with the right recipients.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-heading">Secure Platform</h3>
            <p className="feature-text">Verified users with safe and transparent donations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;