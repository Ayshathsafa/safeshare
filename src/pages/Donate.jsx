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
  FaCamera,
  FaTimes,
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

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // REMOVE IMAGE
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  // SUBMIT DONATION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("safeShareUser")
    );

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const data = new FormData();

      data.append("donor", user._id);
      data.append("donorName", user.name);
      data.append("type", donationType);
      data.append("itemName", formData.itemName);
      data.append("quantity", formData.quantity);
      data.append("location", formData.location);
      data.append("expiryDate", formData.expiryDate || "");
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        "http://localhost:5000/api/donations",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Donation submission failed."
        );
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

      setImage(null);
      setImagePreview("");
      setDonationType("food");

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
            <span className="page-label">
              DONATION
            </span>

            <h1>Donate Resources</h1>

            <p>
              Share useful resources with people
              who need them.
            </p>
          </div>

          <div className="header-icon">
            <FaBoxOpen />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="donate-grid">

          {/* FORM */}
          <section className="donate-card">

            <div className="card-title">
              <h2>Donation Details</h2>

              <p>
                Enter the details of the resource
                you want to donate.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* DONATION TYPE */}
              <div className="form-group">

                <label>
                  Donation Type
                </label>

                <div className="type-options">

                  {donationTypes.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      className={`type-option ${
                        donationType === type.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setDonationType(type.id)
                      }
                    >
                      <span className="type-icon">
                        {type.icon}
                      </span>

                      <span>
                        {type.label}
                      </span>
                    </button>
                  ))}

                </div>

              </div>

              {/* ITEM + QUANTITY */}
              <div className="form-row">

                <div className="form-group">

                  <label>
                    Item Name
                  </label>

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

                  <label>
                    Quantity
                  </label>

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

                  <label>
                    Location
                  </label>

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

                  <label>
                    Expiry Date
                  </label>

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

              {/* IMAGE UPLOAD */}
              <div className="form-group">

                <label>
                  Donation Image
                </label>

                {!imagePreview ? (

                  <label
                    htmlFor="donation-image"
                    className="image-upload-box"
                  >

                    <FaCamera className="upload-icon" />

                    <div className="upload-content">

                      <strong>
                        Upload Donation Image
                      </strong>

                      <span>
                        JPG, PNG or WEBP · Max 5MB
                      </span>

                    </div>

                    <input
                      id="donation-image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      hidden
                    />

                  </label>

                ) : (

                  <div className="image-preview-container">

                    <img
                      src={imagePreview}
                      alt="Donation preview"
                      className="donation-image-preview"
                    />

                    <div className="image-preview-info">

                      <strong>
                        {image?.name}
                      </strong>

                      <span>
                        {(image?.size / 1024 / 1024).toFixed(2)} MB
                      </span>

                    </div>

                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={removeImage}
                    >
                      <FaTimes />
                      Remove Image
                    </button>

                  </div>

                )}

              </div>

              {/* DESCRIPTION */}
              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Add any additional information about your donation..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="submit-donation"
              >
                Submit Donation
              </button>

            </form>

          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="donate-sidebar">

            {/* AI CARD */}
            <div className="info-card ai-card">

              <div className="info-icon">
                <FaRobot />
              </div>

              <h3>
                AI-Powered Matching
              </h3>

              <p>
                SafeShare analyzes your donation
                and finds suitable recipients based
                on location, resource type, urgency
                and requirements.
              </p>

              <div className="info-list">

                <span>
                  ✓ Location-based matching
                </span>

                <span>
                  ✓ Urgency consideration
                </span>

                <span>
                  ✓ Recipient requirements
                </span>

              </div>

            </div>

            {/* SECURITY */}
            <div className="info-card security-card">

              <div className="info-icon">
                <FaShieldAlt />
              </div>

              <div>

                <h3>
                  Safe & Verified
                </h3>

                <p>
                  Donations are securely stored
                  and shared with verified NGOs
                  and hospitals.
                </p>

              </div>

            </div>

            {/* PROCESS */}
            <div className="process-card">

              <h3>
                How it works
              </h3>

              <div className="process-item">

                <span>1</span>

                <div>
                  <strong>
                    Submit donation
                  </strong>

                  <p>
                    Provide your resource details.
                  </p>
                </div>

              </div>

              <div className="process-item">

                <span>2</span>

                <div>
                  <strong>
                    AI finds a match
                  </strong>

                  <p>
                    Suitable recipients are identified.
                  </p>
                </div>

              </div>

              <div className="process-item">

                <span>3</span>

                <div>
                  <strong>
                    Donation is received
                  </strong>

                  <p>
                    Your resource reaches someone
                    in need.
                  </p>
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