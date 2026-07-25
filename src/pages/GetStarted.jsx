import { Link } from "react-router-dom";
import { FaCheckCircle, FaShieldAlt, FaHandsHelping, FaMapMarkedAlt, FaClock, FaBullseye, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./GetStarted.css";

function GetStarted() {
  return (
    <>
      <Navbar />

      <main className="getstarted-page">
        <section className="getstarted-hero">
          <div className="hero-copy">
            <span className="eyebrow">Start making impact today</span>
            <h1>Join SafeShare and help connect donations to communities in need.</h1>
            <p>
              SafeShare is a secure, AI-powered platform for donors, NGOs,
              hospitals and volunteers to share essential supplies like food,
              medicine, clothes and more — fast, trusted, and with transparency.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="primary-btn">
                Create an account
                <FaArrowRight />
              </Link>
              <Link to="/contact" className="secondary-btn">
                Contact support
              </Link>
            </div>
          </div>

          <div className="hero-aside">
            <div className="hero-card">
              <h2>Why choose SafeShare?</h2>
              <ul>
                <li>
                  <FaCheckCircle /> AI-powered donation matching
                </li>
                <li>
                  <FaShieldAlt /> Verified partners and secure delivery
                </li>
                <li>
                  <FaMapMarkedAlt /> Location-based redistribution across cities
                </li>
                <li>
                  <FaClock /> Fast response for urgent needs
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="getstarted-info">
          <div className="info-card">
            <div className="icon-circle">
              <FaHandsHelping />
            </div>
            <h3>Give what matters</h3>
            <p>
              Donate food, medicines, clothes, books, medical supplies or
              emergency aid through a single trusted platform.
            </p>
          </div>

          <div className="info-card">
            <div className="icon-circle">
              <FaBullseye />
            </div>
            <h3>Reach the right people</h3>
            <p>
              Our matching engine pairs donations with verified recipients and
              organizations based on need, location and availability.
            </p>
          </div>

          <div className="info-card">
            <div className="icon-circle">
              <FaShieldAlt />
            </div>
            <h3>Stay secure and transparent</h3>
            <p>
              Every donation is tracked, verified, and managed with care so that
              donors and recipients can rely on SafeShare.
            </p>
          </div>
        </section>

        <section className="steps-section">
          <div className="steps-heading">
            <span>How it works</span>
            <h2>Start sharing in 3 simple steps</h2>
            <p>
              Whether you are donating or requesting support, SafeShare makes the
              process easy and dependable.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Create your profile</h4>
              <p>Sign up as a donor, NGO, hospital, or volunteer partner.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Submit donation details</h4>
              <p>Tell us what you have available and where it should be delivered.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Let AI match it</h4>
              <p>Our platform pairs your donation with the most relevant recipient.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div>
            <span>Ready to make a difference?</span>
            <h2>Get started with SafeShare now.</h2>
          </div>
          <Link to="/register" className="primary-btn large-btn">
            Register and donate
          </Link>
        </section>
      </main>
    </>
  );
}

export default GetStarted;
