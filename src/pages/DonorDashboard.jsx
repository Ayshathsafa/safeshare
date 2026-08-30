import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./DonorDashboard.css";

function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("safeShareUser"));

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/donations"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch donations"
          );
        }

        console.log("All donations from backend:", data);
        console.log("Logged-in user:", user);

        /*
          Backend uses:

          .populate("donor", "name email")

          Therefore donation.donor looks like:

          {
            _id: "...",
            name: "aysha",
            email: "aysh@gmail.com"
          }
        */

        const myDonations = data.filter((donation) => {
          if (!donation.donor || !user?._id) {
            return false;
          }

          // If donor is populated as an object
          if (typeof donation.donor === "object") {
            return (
              donation.donor._id?.toString() ===
              user._id.toString()
            );
          }

          // If donor is only an ObjectId/string
          return (
            donation.donor.toString() ===
            user._id.toString()
          );
        });

        console.log("My donations:", myDonations);

        setDonations(myDonations);
      } catch (error) {
        console.error(
          "Error fetching donations:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchDonations();
    } else {
      setLoading(false);
    }
  }, []);

  // Total donations
  const totalDonations = donations.length;

  // Pending donations
  const pendingDonations = donations.filter(
    (donation) =>
      !donation.status ||
      donation.status.toLowerCase() === "pending"
  ).length;

  // Completed donations
  const completedDonations = donations.filter(
    (donation) =>
      donation.status &&
      donation.status.toLowerCase() === "completed"
  ).length;

  return (
    <>
      <Navbar />

      <main className="donor-dashboard">

        {/* ================= HEADER ================= */}

        <div className="dashboard-header">

          <div>
            <span className="dashboard-label">
              DONOR DASHBOARD
            </span>

            <h1>
              Welcome, {user?.name || "Donor"} 
            </h1>

            <p>
              Manage your donations and help resources
              reach people in need.
            </p>
          </div>

          <Link
            to="/donate"
            className="donate-btn"
          >
            <FaPlus />
            Donate Resource
          </Link>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="dashboard-stats">

          {/* TOTAL */}

          <div className="stat-card">

            <div className="stat-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>Total Donations</span>
              <h2>{totalDonations}</h2>
            </div>

          </div>


          {/* PENDING */}

          <div className="stat-card">

            <div className="stat-icon pending">
              <FaClock />
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingDonations}</h2>
            </div>

          </div>


          {/* COMPLETED */}

          <div className="stat-card">

            <div className="stat-icon completed">
              <FaCheckCircle />
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedDonations}</h2>
            </div>

          </div>

        </div>


        {/* ================= MY DONATIONS ================= */}

        <section className="donations-section">

          <div className="section-heading">

            <div>
              <h2>My Donations</h2>

              <p>
                View and track your submitted donations.
              </p>
            </div>

            <Link
              to="/donate"
              className="view-donate"
            >
              New Donation
              <FaArrowRight />
            </Link>

          </div>


          {/* ================= LOADING ================= */}

          {loading && (
            <div className="empty-donations">

              <div className="empty-icon">
                <FaClock />
              </div>

              <h3>
                Loading donations...
              </h3>

              <p>
                Please wait while we load your donations.
              </p>

            </div>
          )}


          {/* ================= NO DONATIONS ================= */}

          {!loading && donations.length === 0 && (

            <div className="empty-donations">

              <div className="empty-icon">
                <FaBoxOpen />
              </div>

              <h3>
                No donations yet
              </h3>

              <p>
                You haven't submitted any donations.
                Start by sharing a resource with someone
                in need.
              </p>

              <Link
                to="/donate"
                className="empty-btn"
              >
                <FaPlus />
                Make Your First Donation
              </Link>

            </div>

          )}


          {/* ================= DONATION LIST ================= */}

          {!loading && donations.length > 0 && (

            <div className="donation-list">

              {donations.map((donation) => (

                <div
                  className="donation-item"
                  key={donation._id}
                >

                  {/* ICON */}

                  <div className="donation-icon">
                    <FaBoxOpen />
                  </div>


                  {/* DETAILS */}

                  <div className="donation-details">

                    <h3>
                      {donation.itemName}
                    </h3>

                    <p>
                      <strong>Type:</strong>{" "}
                      {donation.type}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {donation.quantity}
                    </p>

                    <p>
                      <FaMapMarkerAlt />
                      {" "}
                      {donation.location}
                    </p>

                    {donation.description && (
                      <p>
                        {donation.description}
                      </p>
                    )}

                    {donation.expiryDate && (
                      <p>
                        <strong>Expiry:</strong>{" "}
                        {new Date(
                          donation.expiryDate
                        ).toLocaleDateString()}
                      </p>
                    )}

                  </div>


                  {/* STATUS */}

                  <div className="donation-status">

                    <span>
                      {donation.status
                        ? donation.status
                        : "Pending"}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ================= INFORMATION CARDS ================= */}

        <div className="dashboard-info">

          {/* AI */}

          <div className="info-box">

            <h3>
              🤖 AI-Powered Matching
            </h3>

            <p>
              SafeShare will match your donations
              with suitable NGOs and hospitals based
              on resource type, location, urgency
              and requirements.
            </p>

          </div>


          {/* SECURITY */}

          <div className="info-box">

            <h3>
              🔒 Safe & Transparent
            </h3>

            <p>
              Your donation information is securely
              stored and you can track the status
              of your donations.
            </p>

          </div>

        </div>

      </main>
    </>
  );
}

export default DonorDashboard;