import "./Hero.css";
import heroImage from "../assets/hero.png";

import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaBrain,
  FaLeaf
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      {/* Decorative Leaves */}

      <div className="leaf left-leaf"></div>
      <div className="leaf right-leaf"></div>

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <div className="hero-badge">

            <span>AI Powered</span>

            <span>•</span>

            <span>Secure</span>

            <span>•</span>

            <span>Trusted</span>

          </div>

          <h1>

            Every Donation

            <br />

            Creates <span>Hope.</span>

          </h1>

          <div className="hero-divider"></div>

          <p>

            SafeShare is an AI-powered platform connecting donors,
            NGOs and communities to redistribute food, medicines,
            clothes, books and essential resources with transparency,
            trust and intelligent matching.

          </p>

          <div className="hero-buttons">

            <Link to="/donate" className="donate">
            Donate Now
            <FaArrowRight />
          </Link>

          <button className="impact">
            Explore Impact
          </button>

          </div>

          <div className="trust-row">

            <div>

              <FaShieldAlt />

              Secure & Verified

            </div>

            <div>

              <FaBrain />

              AI Matching

            </div>

            <div>

              <FaLeaf />

              Sustainable

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="hero-circle"></div>

          <img src={heroImage} alt="SafeShare" />

        </div>

      </div>

    </section>
  );
}

export default Hero;