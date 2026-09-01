import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaHospital,
  FaHandsHelping,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./RecipientDashboard.css";

function RecipientDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("safeShareUser") || "{}") || {};

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch donations");
        }

        const donationList = Array.isArray(data) ? data : data.donations || [];
        setDonations(donationList);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <>
      <Navbar />

      <main className="recipient-dashboard">
        <section className="recipient-header">
          <div>
            <span className="recipient-label">RECIPIENT DASHBOARD</span>
            <h1>Welcome, {user?.name || "Partner"}</h1>
            <p>
              Review available donations and request items your organization needs.
            </p>
          </div>

          <div className="recipient-header-icon">
            {user?.role === "hospital" ? <FaHospital /> : <FaHandsHelping />}
          </div>
        </section>

        <section className="recipient-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <FaBoxOpen />
            </div>
            <div>
              <span>Available</span>
              <h2>{donations.length}</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <FaSearch />
            </div>
            <div>
              <span>Matches</span>
              <h2>0</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <span>Local</span>
              <h2>1</h2>
            </div>
          </div>
        </section>

        <section className="recipient-panel">
          <div className="panel-header">
            <div>
              <span>RESOURCE LIST</span>
              <h2>Available Donations</h2>
            </div>
            <button className="request-btn small">Refresh</button>
          </div>

          {loading && (
            <div className="recipient-empty">
              <h3>Loading donations...</h3>
              <p>Please wait while we load the latest items.</p>
            </div>
          )}

          {!loading && donations.length === 0 && (
            <div className="recipient-empty">
              <h3>No donations available</h3>
              <p>There are currently no donation items posted.</p>
            </div>
          )}

          {!loading && donations.length > 0 && (
            <div className="table-wrap">
              <table className="donation-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Quantity</th>
                    <th>Expiry</th>
                    <th>Donor</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {donations.map((donation) => {
                    const imageUrl = donation.image?.url || donation.image || "";

                    return (
                      <tr key={donation._id || donation.id}>
                        <td className="item-cell">
                          <div className="item-with-image">
                            {imageUrl ? (
                              <a
                                href={`http://localhost:5000${imageUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="donation-thumbnail-link"
                                aria-label={`Open image for ${donation.itemName}`}
                              >
                                <img
                                  src={`http://localhost:5000${imageUrl}`}
                                  alt={donation.itemName}
                                  className="donation-thumbnail"
                                />
                              </a>
                            ) : (
                              <div className="donation-thumbnail-placeholder">
                                <FaBoxOpen />
                              </div>
                            )}

                            <div className="item-info">
                              <strong>{donation.itemName}</strong>

                              <span>
                                {donation.description || "No additional description"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="meta-text">
                            {donation.type
                              ? donation.type.charAt(0).toUpperCase() + donation.type.slice(1)
                              : "General"}
                          </span>
                        </td>

                        <td>
                          <span className="meta-text">
                            <FaMapMarkerAlt />
                            {donation.location || donation.donorCity || "Not available"}
                          </span>
                        </td>

                        <td>{donation.quantity || "-"}</td>

                        <td>
                          <span className="meta-text">
                            <FaCalendarAlt />
                            {donation.expiryDate
                              ? new Date(donation.expiryDate).toLocaleDateString()
                              : "No expiry"}
                          </span>
                        </td>

                        <td>{donation.donorName || donation.donor?.name || "SafeShare donor"}</td>

                        <td>
                          <button className="request-btn small">Request</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default RecipientDashboard;