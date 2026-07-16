import "./About.css";
import Navbar from "../components/Navbar";
import {
  FaBullseye,
  FaEye,
  FaRobot,
  FaShieldAlt,
  FaUsers,
  FaLeaf,
  FaHandHoldingHeart,
  FaUserFriends,
  FaHospital,
  FaFemale,
} from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-content">
          <h1>About SafeShare</h1>

          <p>
            SafeShare is an AI-powered Secure Food & Medicine Redistribution
            Platform that connects donors, NGOs, hospitals and people in need
            through intelligent resource sharing.
          </p>
        </div>
      </section>

      {/* Story */}

      <section className="story-section">

        <div className="story-left">

          <h2>Our Story</h2>

          <p>
            Every day, perfectly usable food, medicines and essential
            resources are wasted while thousands of people struggle to access
            basic necessities.
          </p>

          <p>
            SafeShare bridges this gap using Artificial Intelligence,
            location-based matching and secure verification to ensure every
            donation reaches the right person at the right time.
          </p>

        </div>

        <div className="story-right">

          <img
            src="https://undraw.co/api/illustrations/helping.svg"
            alt="Helping Community"
          />

        </div>

      </section>

      {/* Mission Vision */}

      <section className="mission-section">

        <div className="mission-card">
          <FaBullseye className="icon" />

          <h3>Our Mission</h3>

          <p>
            Reduce waste by connecting donors with recipients using secure,
            intelligent and transparent technology.
          </p>

        </div>

        <div className="mission-card">
          <FaEye className="icon" />

          <h3>Our Vision</h3>

          <p>
            Build a future where no essential resource goes to waste and every
            individual receives timely support.
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="about-features">

        <h2>Why SafeShare?</h2>

        <div className="feature-grid">

          <div className="feature">
            <FaRobot />
            <h4>AI Matching</h4>
          </div>

          <div className="feature">
            <FaShieldAlt />
            <h4>Secure Platform</h4>
          </div>

          <div className="feature">
            <FaUsers />
            <h4>Verified NGOs</h4>
          </div>

          <div className="feature">
            <FaLeaf />
            <h4>Sustainable Future</h4>
          </div>

        </div>

      </section>

      {/* Beneficiaries */}

      <section className="beneficiaries">

        <h2>Who Can Benefit?</h2>

        <div className="benefit-grid">

          <div><FaHandHoldingHeart /><span>Donors</span></div>

          <div><FaHospital /><span>Hospitals</span></div>

          <div><FaFemale /><span>Women Shelters</span></div>

          <div><FaUserFriends /><span>Families</span></div>

          <div><FaUsers /><span>NGOs</span></div>

        </div>

      </section>

    </>
  );
}

export default About;