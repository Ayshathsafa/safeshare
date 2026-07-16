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
    <section style={styles.section}>
      <h2 style={styles.title}>Why Choose SafeShare?</h2>

      <p style={styles.subtitle}>
        SafeShare makes donation simple, secure, and AI-powered.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>🍱</div>
          <h3 style={styles.heading}>Food Donation</h3>
          <p style={styles.text}>Donate surplus food to people and NGOs safely.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>💊</div>
          <h3 style={styles.heading}>Medicine Sharing</h3>
          <p style={styles.text}>Share unused medicines with verified recipients.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>🤖</div>
          <h3 style={styles.heading}>AI Matching</h3>
          <p style={styles.text}>AI matches donors with the right recipients.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>🛡️</div>
          <h3 style={styles.heading}>Secure Platform</h3>
          <p style={styles.text}>Verified users with safe and transparent donations.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;