import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaUtensils,
  FaPills,
  FaTshirt,
  FaBook,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";
import "./Donate.css";

const donationTypes = [
  { id: "food", label: "Food", icon: <FaUtensils /> },
  { id: "medicine", label: "Medicine", icon: <FaPills /> },
  { id: "clothes", label: "Clothes", icon: <FaTshirt /> },
  { id: "books", label: "Books", icon: <FaBook /> },
  { id: "essentials", label: "Essentials", icon: <FaBoxOpen /> },
];

function Donate() {
  const [donationType, setDonationType] = useState("food");

  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    location: "",
    expiryDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("safeShareUser"));

  if (!user) {
    alert("Please login first.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donor: user._id,
        donorName: user.name,
        type: donationType,
        itemName: formData.itemName,
        quantity: formData.quantity,
        location: formData.location,
        expiryDate: formData.expiryDate || null,
        description: formData.description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Donation submission failed.");
      return;
    }

    alert("Donation submitted successfully! ✅");

    setFormData({
      itemName: "",
      quantity: "",
      location: "",
      expiryDate: "",
      description: "",
    });

  } catch (error) {
    console.error("Donation error:", error);
    alert("Cannot connect to SafeShare server.");
  }
};

  return (
    <>
      <Navbar />

      <main className="donate-dashboard">

        {/* PAGE HEADER */}
        <div className="donate-header">
          <div>
            <span className="page-label">DONATION</span>

            <h1>Donate Resources</h1>

            <p>
              Share useful resources with people who need them.
            </p>
          </div>

          <div className="header-icon">
            <FaBoxOpen />
          </div>
        </div>


        {/* MAIN CONTENT */}
        <div className="donate-grid">

          {/* FORM CARD */}
          <section className="donate-card">

            <div className="card-title">
              <h2>Donation Details</h2>

              <p>
                Enter the details of the resource you want to donate.
              </p>
            </div>


            <form onSubmit={handleSubmit}>

              {/* DONATION TYPE */}
              <div className="form-group">
                <label>Donation Type</label>

                <div className="type-options">

                  {donationTypes.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      className={`type-option ${
                        donationType === type.id ? "active" : ""
                      }`}
                      onClick={() => setDonationType(type.id)}
                    >
                      <span className="type-icon">
                        {type.icon}
                      </span>

                      <span>{type.label}</span>
                    </button>
                  ))}

                </div>
              </div>


              {/* ITEM + QUANTITY */}
              <div className="form-row">

                <div className="form-group">
                  <label>Item Name</label>

                  <input
                    type="text"
                    name="itemName"
                    placeholder="e.g. Rice, Paracetamol, Books"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="form-group">
                  <label>Quantity</label>

                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g. 10 kg, 20 packs"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              {/* LOCATION + EXPIRY */}
              <div className="form-row">

                <div className="form-group">
                  <label>Location</label>

                  <div className="input-with-icon">
                    <FaMapMarkerAlt />

                    <input
                      type="text"
                      name="location"
                      placeholder="Enter city / location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>


                <div className="form-group">
                  <label>Expiry Date</label>

                  <div className="input-with-icon">
                    <FaCalendarAlt />

                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>


              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Add any additional information about your donation..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>


              {/* BUTTON */}
              <button type="submit" className="submit-donation">
                Submit Donation
              </button>

            </form>
          </section>


          {/* RIGHT SIDE */}
          <aside className="donate-sidebar">

            {/* AI CARD */}
            <div className="info-card ai-card">

              <div className="info-icon">
                <FaRobot />
              </div>

              <h3>AI-Powered Matching</h3>

              <p>
                SafeShare analyzes your donation and finds suitable
                recipients based on location, resource type, urgency
                and requirements.
              </p>

              <div className="info-list">
                <span>✓ Location-based matching</span>
                <span>✓ Urgency consideration</span>
                <span>✓ Recipient requirements</span>
              </div>

            </div>


            {/* SECURITY CARD */}
            <div className="info-card security-card">

              <div className="info-icon">
                <FaShieldAlt />
              </div>

              <div>
                <h3>Safe & Verified</h3>

                <p>
                  Donations are securely stored and shared
                  with verified NGOs and hospitals.
                </p>
              </div>

            </div>


            {/* PROCESS */}
            <div className="process-card">

              <h3>How it works</h3>

              <div className="process-item">
                <span>1</span>

                <div>
                  <strong>Submit donation</strong>
                  <p>Provide your resource details.</p>
                </div>
              </div>


              <div className="process-item">
                <span>2</span>

                <div>
                  <strong>AI finds a match</strong>
                  <p>Suitable recipients are identified.</p>
                </div>
              </div>


              <div className="process-item">
                <span>3</span>

                <div>
                  <strong>Donation is received</strong>
                  <p>Your resource reaches someone in need.</p>
                </div>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </>
  );
}

export default Donate;