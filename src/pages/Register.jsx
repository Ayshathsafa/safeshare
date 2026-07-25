import { useMemo, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaHandshake,
  FaHospital,
  FaUserShield,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Register.css";

const roles = [
  {
    id: "donor",
    label: "Donor",
    description: "Share foods, medicines or essentials with verified recipients.",
  },
  {
    id: "ngo",
    label: "NGO",
    description: "Register your organization to receive and coordinate donations.",
  },
  {
    id: "hospital",
    label: "Hospital",
    description: "Submit resource requests for patients and medical teams.",
  },
];

function Register() {
  const [role, setRole] = useState("donor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    organization: "",
    donationType: "",
    registrationId: "",
    hospitalName: "",
    notes: "",
  });

  const selectedRole = useMemo(() => roles.find((item) => item.id === role), [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selected) => {
    setRole(selected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Register data", { role, ...formData });
    alert(`Account requested for ${role}. (Form submission is not wired yet.)`);
  };

  return (
    <>
      <Navbar />
      <main className="register-page">
        <div className="register-card">
          <section className="register-panel">
            <div className="register-header">
              <span className="eyebrow">Create your account</span>
              <h1>Register as a donor, NGO or hospital partner.</h1>
              <p>
                Choose your role and complete the form to start contributing or
                requesting help through SafeShare.
              </p>
            </div>

            <div className="role-chips">
              {roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`role-chip ${role === item.id ? "active" : ""}`}
                  onClick={() => handleRoleChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-group">
                    <FaUser />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <div className="input-group">
                    <FaEnvelope />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <FaLock />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-group">
                    <FaPhone />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="city">City / Location</label>
                  <div className="input-group">
                    <FaMapMarkerAlt />
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City, state"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="organization">Organization</label>
                  <div className="input-group">
                    <FaBuilding />
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="NGO / hospital / group name"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {role === "donor" && (
                <div className="field">
                  <label htmlFor="donationType">Donation Type</label>
                  <div className="input-group">
                    <FaHandshake />
                    <input
                      id="donationType"
                      name="donationType"
                      type="text"
                      placeholder="Food, medicine, clothes, books..."
                      value={formData.donationType}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {role === "ngo" && (
                <div className="field">
                  <label htmlFor="registrationId">NGO Registration ID</label>
                  <div className="input-group">
                    <FaUserShield />
                    <input
                      id="registrationId"
                      name="registrationId"
                      type="text"
                      placeholder="Organization registration number"
                      value={formData.registrationId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {role === "hospital" && (
                <div className="field">
                  <label htmlFor="hospitalName">Hospital Name</label>
                  <div className="input-group">
                    <FaHospital />
                    <input
                      id="hospitalName"
                      name="hospitalName"
                      type="text"
                      placeholder="Hospital or clinic name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="field">
                <label htmlFor="notes">Additional notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Tell us more about your needs or donation plans"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="primary-btn">
                Complete registration
                <FaArrowRight />
              </button>
            </form>
          </section>

      <aside className="register-aside">
  <div className="aside-top">
    <span className="aside-tag">Why SafeShare?</span>

    <h2>Join a trusted donation network.</h2>

    <p>
      SafeShare connects donors, NGOs and hospitals through an AI-powered
      platform that makes sharing resources simple, transparent and secure.
    </p>
  </div>

  <div className="role-summary">
    <h3>{selectedRole.label} Account</h3>
    <p>{selectedRole.description}</p>
  </div>

  <div className="benefits">
    <div className="benefit">
      <FaCheckCircle />
      <span>Verified and secure registration</span>
    </div>

    <div className="benefit">
      <FaCheckCircle />
      <span>AI-powered donation matching</span>
    </div>

    <div className="benefit">
      <FaCheckCircle />
      <span>Real-time tracking & transparency</span>
    </div>

    <div className="benefit">
      <FaCheckCircle />
      <span>Trusted NGOs & Hospitals</span>
    </div>
  </div>
</aside>
        </div>
      </main>
    </>
  );
}

export default Register;
