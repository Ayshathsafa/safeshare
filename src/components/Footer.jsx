import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Safe<span>Share</span>
          </Link>

          <p>
            Connecting surplus resources with people and organizations
            that need them most.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/get-started">Get Started</Link>
        </div>

        {/* Get Involved */}
        <div className="footer-column">
          <h3>Get Involved</h3>

          <Link to="/donate">Donate</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <p>📍 Kerala, India</p>
          <p>📧 support@safeshare.com</p>
          <p>📞 +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © 2026 SafeShare. All rights reserved.
        </p>

        <p className="footer-made">
          Made with <FaHeart /> for a better tomorrow
        </p>
      </div>

    </footer>
  );
}

export default Footer;