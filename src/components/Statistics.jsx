function Statistics() {
  const stats = [
    {
      number: "50K+",
      title: "Successful Donations",
    },
    {
      number: "15K+",
      title: "Families Helped",
    },
    {
      number: "500+",
      title: "Verified NGOs",
    },
    {
      number: "100+",
      title: "Cities Connected",
    },
  ];

  const styles = {
    section: {
      padding: "80px 8%",
      background: "#16a34a",
      color: "#fff",
    },
    container: {
      maxWidth: "1200px",
      margin: "auto",
      textAlign: "center",
    },
    title: {
      fontSize: "42px",
      marginBottom: "15px",
    },
    subtitle: {
      fontSize: "18px",
      marginBottom: "50px",
      opacity: "0.9",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "30px",
    },
    card: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: "15px",
      padding: "35px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
    number: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    text: {
      fontSize: "20px",
      fontWeight: "500",
    },
  };

  return (
    <section className="statistics-section">
      <div className="section-content">
        <h2 className="section-title">Our Impact</h2>

        <p className="section-subtitle">
          Together we can reduce waste and create a better community.
        </p>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{item.number}</div>
              <div className="stat-label">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;