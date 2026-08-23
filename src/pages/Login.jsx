import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("safeShareUser")
    );

    if (!savedUser) {
      alert("Please register first.");
      navigate("/register");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem("safeShareLoggedIn", "true");

      alert(`Welcome back, ${savedUser.name}!`);

      navigate("/donate");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="login-page">

        <div className="login-box">

          <div className="login-header">
            <span>Welcome Back</span>

            <h1>Login to SafeShare</h1>

            <p>
              Login to continue sharing resources with
              people who need them.
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="login-field">
              <label>Email Address</label>

              <div className="login-input">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Password</label>

              <div className="login-input">
                <FaLock />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit">
              Login
              <FaArrowRight />
            </button>

          </form>

          <div className="register-text">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>
          </div>

        </div>

      </main>
    </>
  );
}

export default Login;