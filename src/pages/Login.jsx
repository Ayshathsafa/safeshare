import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed.");
      return;
    }

    // Save the logged-in user for the frontend session
    localStorage.setItem("safeShareUser", JSON.stringify(data.user));
    localStorage.setItem("safeShareLoggedIn", "true");

   alert(`Welcome back, ${data.user.name}!`);

if (data.user.role === "donor") {
  navigate("/donor-dashboard");
} else if (
  data.user.role === "ngo" ||
  data.user.role === "hospital"
) {
  navigate("/recipient-dashboard");
}
  } catch (error) {
    console.error("Login error:", error);
    alert("Cannot connect to SafeShare server.");
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