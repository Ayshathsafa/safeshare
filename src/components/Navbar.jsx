import { Link } from "react-router-dom";
import { FaHeart, FaUserAlt, FaArrowRight } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="nav-container">

        {/* Logo */}

        <Link to="/" className="logo">

          <FaHeart className="logo-icon" />

          <div className="logo-text">

            <h2>
              Safe<span>Share</span>
            </h2>

            <p>Share Today, Save Tomorrow</p>

          </div>

        </Link>

        {/* Navigation */}

        <nav>

          <ul className="nav-links">

            <li><Link to="/">Home</Link></li>

            <li><Link to="/about">About</Link></li>

            
            <li><Link to="/contact">Contact</Link></li>

          </ul>

        </nav>

        {/* Buttons */}

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">

            <FaUserAlt />

            Login

          </Link>

          <Link to="/get-started" className="start-btn">

            Get Started

            <FaArrowRight />

          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;