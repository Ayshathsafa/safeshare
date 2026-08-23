import { Link } from "react-router-dom";
import "./About.css";
import Navbar from "../components/Navbar";
import {
  FaArrowRight,
  FaBullseye,
  FaEye,
  FaHandshake,
  FaHeart,
  FaHospital,
  FaLeaf,
  FaMapMarkedAlt,
  FaPeopleArrows,
  FaRobot,
  FaShieldAlt,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";

function About() {
  const stats = [
    { value: "12K+", label: "Meals redistributed" },
    { value: "250+", label: "Verified partners" },
    { value: "96%", label: "On-time fulfillment" },
  ];

  const pillars = [
    {
      icon: <FaRobot />, 
      title: "AI-powered matching",
      text: "Smart routing connects surplus resources with verified recipients based on urgency, location, and need.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & transparent",
      text: "Every donation is validated through a trusted network of NGOs, hospitals, and community partners.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Localized impact",
      text: "We match resources to nearby communities so support reaches people faster and more efficiently.",
    },
  ];

  const beneficiaries = [
    { icon: <FaHeart />, label: "Families" },
    { icon: <FaHospital />, label: "Hospitals" },
    { icon: <FaUsers />, label: "NGOs" },
    { icon: <FaUserFriends />, label: "Communities" },
  ];

  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div className="about-hero__content">
            <span className="about-kicker">A smarter way to give</span>
            <h1>Transforming surplus into support.</h1>
            <p>
              SafeShare connects donors, hospitals, NGOs, and communities through
              secure, real-time redistribution of food, medicine, and essential
              resources.
            </p>

            <div className="about-hero__actions">
              <Link to="/contact" className="primary-btn">
                Contact us <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-stats">
          {stats.map((item) => (
            <div className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="story-section">
          <div className="story-copy">
            <span className="section-tag">Our story</span>
            <h2>We help prevent waste and support urgent needs.</h2>
            <p>
              Every day, usable food, medicines, and household essentials are
              discarded while families and patients are still waiting for basic
              support. SafeShare closes that gap with technology that makes giving
              easier, faster, and more accountable.
            </p>
            <p>
              By combining AI-driven matching, trusted verification, and local
              coordination, we ensure that donations reach the people and
              institutions that need them most.
            </p>
          </div>

          <div className="story-visual">
            <div className="story-card story-card--primary">
              <FaPeopleArrows />
              <h3>People-first impact</h3>
              <p>From meals to medicines, every contribution is matched to real need.</p>
            </div>
            <div className="story-card story-card--secondary">
              <FaLeaf />
              <h3>Purposeful sustainability</h3>
              <p>We reduce waste while strengthening local support networks.</p>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <div className="section-heading">
            <span className="section-tag">Why SafeShare</span>
            <h2>Built for impact, trust, and speed.</h2>
          </div>

          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <div className="pillar-card" key={pillar.title}>
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <div className="values-copy">
            <span className="section-tag">Our mission</span>
            <h2>Creating a more connected and compassionate system.</h2>
          </div>

          <div className="values-grid">
            <div className="value-item">
              <FaBullseye />
              <h3>Mission</h3>
              <p>Reduce waste and improve access to essential resources for vulnerable communities.</p>
            </div>
            <div className="value-item">
              <FaEye />
              <h3>Vision</h3>
              <p>Build a future where donation networks are efficient, inclusive, and community-led.</p>
            </div>
            <div className="value-item">
              <FaHandshake />
              <h3>Values</h3>
              <p>Trust, transparency, dignity, and measurable impact drive everything we do.</p>
            </div>
          </div>
        </section>

        <section className="beneficiaries">
          <div className="section-heading">
            <span className="section-tag">Who we support</span>
            <h2>Helping the people and institutions behind every act of care.</h2>
          </div>

          <div className="benefit-grid">
            {beneficiaries.map((beneficiary) => (
              <div className="benefit-card" key={beneficiary.label}>
                <div className="benefit-icon">{beneficiary.icon}</div>
                <span>{beneficiary.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default About;