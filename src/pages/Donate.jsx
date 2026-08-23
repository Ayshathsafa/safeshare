import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Donate.css";

import {
  FaUtensils,
  FaCapsules,
  FaTshirt,
  FaBook,
  FaFirstAid,
  FaGift,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaArrowRight,
  FaRobot,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Donate() {
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const categories = [
    { title: "Food", icon: <FaUtensils />, desc: "Meals, groceries and nutrition kits" },
    { title: "Medicine", icon: <FaCapsules />, desc: "Medicines and medical supplies" },
    { title: "Clothes", icon: <FaTshirt />, desc: "Clothes for all age groups" },
    { title: "Books", icon: <FaBook />, desc: "Educational books and stationery" },
    { title: "Medical Kits", icon: <FaFirstAid />, desc: "Health equipment and first aid" },
    { title: "Others", icon: <FaGift />, desc: "Other essential items" },
  ];


  return (
    <>
      <Navbar />

      <main className="donate-page">

        {/* ONLINE DONATIONS - top */}
        <section className="online-section">
          <h2>Online Donations</h2>
          <p>Quick donation options — choose a cause to donate instantly.</p>

          <div className="online-grid">
            <div className="online-card">
              <div className="online-icon">🍛</div>
              <div className="online-title">Anganwadi Feeding</div>
            </div>

            <div className="online-card">
              <div className="online-icon">💝</div>
              <div className="online-title">Donate in / Honor / Memory</div>
            </div>

            <div className="online-card">
              <div className="online-icon">🎉</div>
              <div className="online-title">Donate for special occasion</div>
            </div>

            <div className="online-card">
              <div className="online-icon">💸</div>
              <div className="online-title">Donate through Wire Transfer/Cheque/DD</div>
            </div>

            <div className="online-card">
              <div className="online-icon">🏢</div>
              <div className="online-title">SME Donations</div>
            </div>

            <div className="online-card">
              <div className="online-icon">🏫</div>
              <div className="online-title">Sponsor a School</div>
            </div>

            <div className="online-card">
              <div className="online-icon">🍲</div>
              <div className="online-title">Sponsor a Kitchen</div>
            </div>
          </div>
        </section>

        {/* DONATION FORM */}
        <section className="donation-section">
          <div className="form-container">

            {/* LEFT */}
            <div className="form-left">
              <h2>Donor Information</h2>

              <div className="form-grid">
                <div className="input-box">
                  <label>Full Name</label>
                  <div className="input-field">
                    <FaUser />
                    <input type="text" placeholder="Enter your full name" />
                  </div>
                </div>

                <div className="input-box">
                  <label>Email Address</label>
                  <div className="input-field">
                    <FaEnvelope />
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>

                <div className="input-box">
                  <label>Phone Number</label>
                  <div className="input-field">
                    <FaPhone />
                    <input type="text" placeholder="Phone number" />
                  </div>
                </div>

                <div className="input-box">
                  <label>City</label>
                  <div className="input-field">
                    <FaCity />
                    <input type="text" placeholder="Your city" />
                  </div>
                </div>
              </div>

              <div className="input-box">
                <label>Pickup Address</label>
                <div className="input-field">
                  <FaMapMarkerAlt />
                  <input type="text" placeholder="Enter pickup address" />
                </div>
              </div>

              <h2 className="space-top">Donation Details</h2>

              <div className="form-grid">
                <div className="input-box">
                  <label>Selected Category</label>
                    <input value={selectedCategory} readOnly />
                </div>

                <div className="input-box">
                  <label>Item Name</label>
                  <input type="text" placeholder="Rice, Medicines..." />
                </div>

                <div className="input-box">
                  <label>Quantity</label>
                  <input type="text" placeholder="10 packets" />
                </div>

                <div className="input-box">
                  <label>Expiry Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="input-box">
                <label>Additional Notes</label>
                <textarea rows="5" placeholder="Write additional information..."></textarea>
              </div>

              <button className="donate-btn">
                Donate Now
                <FaArrowRight />
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="form-right">
              <div className="ai-card">
                <span className="ai-tag">AI MATCHING</span>

                <h2>How SafeShare Works</h2>

                <p>
                  Once you submit your donation, our intelligent matching system automatically finds the most suitable verified NGO, hospital or beneficiary near your location.
                </p>

                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div>
                      <h4>Donation Submitted</h4>
                      <p>Your donation request is securely received.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">2</div>
                    <div>
                      <h4>AI Matching</h4>
                      <p>AI finds nearby verified NGOs and hospitals based on location and urgency.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">3</div>
                    <div>
                      <h4>Verification</h4>
                      <p>The organization confirms availability and pickup.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">4</div>
                    <div>
                      <h4>Successful Delivery</h4>
                      <p>Donation reaches the people who need it the most.</p>
                    </div>
                  </div>
                </div>

                <div className="impact-box">
                  <h3>Your Donation Helps</h3>
                  <div className="impact-item">🍛 Reduce Food Waste</div>
                  <div className="impact-item">💊 Support Medical Needs</div>
                  <div className="impact-item">👕 Help Low-income Families</div>
                  <div className="impact-item">📚 Support Children's Education</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Donate;
