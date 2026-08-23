import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      icon: "🍱",
      title: "Food",
      description: "Donate fresh and packaged food to reduce hunger.",
    },
    {
      icon: "💊",
      title: "Medicines",
      description: "Share unused medicines with verified recipients.",
    },
    {
      icon: "👕",
      title: "Clothes",
      description: "Provide clothes to families and individuals in need.",
    },
    {
      icon: "📚",
      title: "Books",
      description: "Donate educational books to students and libraries.",
    },
    {
      icon: "🩺",
      title: "Medical Equipment",
      description: "Donate wheelchairs, walkers, crutches and more.",
    },
    {
      icon: "🆘",
      title: "Emergency Help",
      description: "Support people during emergencies and disasters.",
    },
  ];

  const styles = {
    section: {
      padding: "80px 8%",
      background: "#ffffff",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      textAlign: "center",
      fontSize: "42px",
      color: "#1f2937",
      marginBottom: "15px",
    },
    subtitle: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "18px",
      marginBottom: "50px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
      gap: "30px",
    },
    card: {
      background: "#f8fafc",
      padding: "35px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    },
    icon: {
      fontSize: "55px",
      marginBottom: "20px",
    },
    heading: {
      color: "#16a34a",
      marginBottom: "15px",
      fontSize: "24px",
    },
    text: {
      color: "#555",
      lineHeight: "1.6",
      marginBottom: "25px",
    },
    button: {
      background: "#16a34a",
      color: "#fff",
      border: "none",
      padding: "12px 25px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <section className="categories-section">
      <div className="section-content">
        <h2 className="section-title">Donation Categories</h2>

        <p className="section-subtitle">
          Choose what you'd like to donate and make a meaningful impact.
        </p>

        <div className="categories-grid">
          {categories.map((item, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{item.icon}</div>
              <h3 className="category-heading">{item.title}</h3>
              <p className="category-text">{item.description}</p>
              <Link to="/donate" className="category-btn">
                Donate Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;