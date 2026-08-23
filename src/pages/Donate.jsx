import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Donate.css";

import {
  FaUtensils,
  FaCapsules,
  FaTshirt,
  FaBook,
  FaFirstAid,
  FaGift,
  FaMapMarkerAlt,
  FaCity,
  FaArrowRight,
  FaRobot,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Donate() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const [donationData, setDonationData] = useState({
    itemName: "",
    quantity: "",
    pickupAddress: "",
    expiryDate: "",
    notes: "",
  });

  const categories = [
    {
      title: "Food",
      icon: <FaUtensils />,
      desc: "Meals, groceries and nutrition kits",
    },
    {
      title: "Medicine",
      icon: <FaCapsules />,
      desc: "Medicines and medical supplies",
    },
    {
      title: "Clothes",
      icon: <FaTshirt />,
      desc: "Clothes for all age groups",
    },
    {
      title: "Books",
      icon: <FaBook />,
      desc: "Educational books and stationery",
    },
    {
      title: "Medical Kits",
      icon: <FaFirstAid />,
      desc: "Health equipment and first aid",
    },
    {
      title: "Others",
      icon: <FaGift />,
      desc: "Other essential items",
    },
  ];

  // Get logged-in user's details
  useEffect(() => {
    const loggedIn = localStorage.getItem("safeShareLoggedIn");
    const savedUser = localStorage.getItem("safeShareUser");

    if (loggedIn !== "true" || !savedUser) {
      alert("Please login before donating.");
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // Handle donation form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDonationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit donation
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const donation = {
      donorName: user.name,
      donorEmail: user.email,
      donorPhone: user.phone,
      donorCity: user.city,

      category: selectedCategory,
      itemName: donationData.itemName,
      quantity: donationData.quantity,
      pickupAddress: donationData.pickupAddress,
      expiryDate: donationData.expiryDate,
      notes: donationData.notes,

      status: "Submitted",
      submittedAt: new Date().toISOString(),
    };

    // Save donation
    localStorage.setItem(
      "safeShareDonation",
      JSON.stringify(donation)
    );

    console.log("Donation submitted:", donation);

    alert(
      "Donation submitted successfully! SafeShare AI will find the best match."
    );

    // Optional: later we can navigate to a donation tracking page
    // navigate("/donation-status");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="donate-page">

        {/* ONLINE DONATIONS */}
        <section className="online-section">
          <h2>Online Donations</h2>

          <p>
            Quick donation options — choose a cause to donate instantly.
          </p>

          <div className="online-grid">

            <div className="online-card">
              <div className="online-icon">🍛</div>
              <div className="online-title">
                Anganwadi Feeding
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">💝</div>
              <div className="online-title">
                Donate in / Honor / Memory
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">🎉</div>
              <div className="online-title">
                Donate for special occasion
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">💸</div>
              <div className="online-title">
                Donate through Wire Transfer/Cheque/DD
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">🏢</div>
              <div className="online-title">
                SME Donations
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">🏫</div>
              <div className="online-title">
                Sponsor a School
              </div>
            </div>

            <div className="online-card">
              <div className="online-icon">🍲</div>
              <div className="online-title">
                Sponsor a Kitchen
              </div>
            </div>

          </div>
        </section>

        {/* DONATION FORM */}
        <section className="donation-section">

          <div className="form-container">

            {/* LEFT SIDE */}
            <div className="form-left">

              {/* LOGGED-IN USER */}
              <h2>Donor Account</h2>

              <div className="form-grid">

                <div className="input-box">
                  <label>Donor Name</label>

                  <input
                    type="text"
                    value={user.name}
                    readOnly
                  />
                </div>

                <div className="input-box">
                  <label>Email Address</label>

                  <input
                    type="email"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div className="input-box">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    value={user.phone || "Not provided"}
                    readOnly
                  />
                </div>

                <div className="input-box">
                  <label>City</label>

                  <div className="input-field">
                    <FaCity />

                    <input
                      type="text"
                      value={user.city || "Not provided"}
                      readOnly
                    />
                  </div>
                </div>

              </div>

              {/* DONATION DETAILS */}
              <h2 className="space-top">
                Donation Details
              </h2>

              {/* CATEGORY */}
              <div className="category-grid">

                {categories.map((category) => (
                  <div
                    key={category.title}
                    className={`category-card ${
                      selectedCategory === category.title
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(category.title)
                    }
                  >

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <h3>{category.title}</h3>

                    <p>{category.desc}</p>

                  </div>
                ))}

              </div>

              {/* DONATION INPUTS */}
              <div className="form-grid">

                <div className="input-box">
                  <label>Selected Category</label>

                  <input
                    type="text"
                    value={selectedCategory}
                    readOnly
                  />
                </div>

                <div className="input-box">
                  <label>Item Name</label>

                  <input
                    type="text"
                    name="itemName"
                    placeholder="Rice, Medicines..."
                    value={donationData.itemName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-box">
                  <label>Quantity</label>

                  <input
                    type="text"
                    name="quantity"
                    placeholder="10 packets"
                    value={donationData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-box">
                  <label>Expiry Date</label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={donationData.expiryDate}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* PICKUP ADDRESS */}
              <div className="input-box">

                <label>Pickup Address</label>

                <div className="input-field">

                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="pickupAddress"
                    placeholder="Enter pickup address"
                    value={donationData.pickupAddress}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* NOTES */}
              <div className="input-box">

                <label>Additional Notes</label>

                <textarea
                  rows="5"
                  name="notes"
                  placeholder="Write additional information..."
                  value={donationData.notes}
                  onChange={handleChange}
                ></textarea>

              </div>

              {/* SUBMIT */}
              <button
                className="donate-btn"
                onClick={handleSubmit}
              >
                Submit Donation

                <FaArrowRight />

              </button>

            </div>

            {/* RIGHT SIDE - AI */}
            <div className="form-right">

              <div className="ai-card">

                <span className="ai-tag">
                  <FaRobot /> AI MATCHING
                </span>

                <h2>
                  How SafeShare Works
                </h2>

                <p>
                  Once you submit your donation, SafeShare's
                  intelligent matching system finds the most
                  suitable verified NGO or hospital based on
                  donation type, location, urgency and
                  recipient requirements.
                </p>

                <div className="steps">

                  <div className="step">

                    <div className="step-number">
                      1
                    </div>

                    <div>
                      <h4>
                        Donation Submitted
                      </h4>

                      <p>
                        Your donation details are securely
                        received.
                      </p>
                    </div>

                  </div>

                  <div className="step">

                    <div className="step-number">
                      2
                    </div>

                    <div>
                      <h4>
                        AI Matching
                      </h4>

                      <p>
                        AI compares location, category,
                        urgency and recipient requirements.
                      </p>
                    </div>

                  </div>

                  <div className="step">

                    <div className="step-number">
                      3
                    </div>

                    <div>
                      <h4>
                        Verification
                      </h4>

                      <p>
                        The matched NGO or hospital
                        verifies and accepts the donation.
                      </p>
                    </div>

                  </div>

                  <div className="step">

                    <div className="step-number">
                      4
                    </div>

                    <div>
                      <h4>
                        Successful Delivery
                      </h4>

                      <p>
                        The donation reaches the people
                        who need it.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="impact-box">

                  <h3>
                    Your Donation Helps
                  </h3>

                  <div className="impact-item">
                    🍛 Reduce Food Waste
                  </div>

                  <div className="impact-item">
                    💊 Support Medical Needs
                  </div>

                  <div className="impact-item">
                    👕 Help Low-income Families
                  </div>

                  <div className="impact-item">
                    📚 Support Children's Education
                  </div>

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