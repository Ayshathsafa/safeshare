import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const user = JSON.parse(
    localStorage.getItem("safeShareUser")
  );

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

        setDonations(data);
      } catch (error) {
        console.error(
          "Error fetching donations:",
          error
        );
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

        {/* HEADER */}

        <section className="recipient-header">

          <div>
            <span className="recipient-label">
              RECIPIENT DASHBOARD
            </span>

            <h1>
              Welcome, {user?.name || "Partner"} 👋
            </h1>

            <p>
              Discover available resources and find
              donations that can help your organization.
            </p>
          </div>

          <div className="recipient-header-icon">
            {user?.role === "hospital" ? (
              <FaHospital />
            ) : (
              <FaHandsHelping />
            )}
          </div>

        </section>


        {/* SUMMARY */}

        <section className="recipient-summary">

          <div className="summary-card">

            <div className="summary-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>Available Donations</span>
              <h2>{donations.length}</h2>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              <FaSearch />
            </div>

            <div>
              <span>Matching Resources</span>
              <h2>0</h2>
            </div>

          </div>

        </section>


        {/* AVAILABLE DONATIONS */}

        <section className="available-section">

          <div className="available-heading">

            <div>
              <span>RESOURCE MARKETPLACE</span>

              <h2>Available Donations</h2>

              <p>
                Browse resources currently available
                from SafeShare donors.
              </p>
            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="recipient-empty">

              <div className="recipient-empty-icon">
                <FaBoxOpen />
              </div>

              <h3>Loading donations...</h3>

              <p>
                Please wait while we find available
                resources.
              </p>

            </div>
          )}


          {/* NO DONATIONS */}

          {!loading && donations.length === 0 && (
            <div className="recipient-empty">

              <div className="recipient-empty-icon">
                <FaBoxOpen />
              </div>

              <h3>No donations available</h3>

              <p>
                There are currently no donations
                available. Please check again later.
              </p>

            </div>
          )}


          {/* DONATION CARDS */}

          {!loading && donations.length > 0 && (

            <div className="recipient-donation-grid">

              {donations.map((donation) => (

                <article
                  className="recipient-donation-card"
                  key={donation._id}
                >

                  {/* CARD TOP */}

                  <div className="recipient-card-top">

                    <div className="recipient-item-icon">
                      <FaBoxOpen />
                    </div>

                    <span className="available-badge">
                      Available
                    </span>

                  </div>


                  {/* ITEM */}

                  <h3>
                    {donation.itemName}
                  </h3>

                  <span className="donation-type">
                    {donation.type}
                  </span>


                  {/* DETAILS */}

                  <div className="recipient-details">

                    <div>
                      <strong>Quantity</strong>
                      <span>
                        {donation.quantity}
                      </span>
                    </div>

                    <div>
                      <strong>Location</strong>
                      <span>
                        <FaMapMarkerAlt />
                        {donation.location}
                      </span>
                    </div>

                    {donation.expiryDate && (
                      <div>
                        <strong>Expiry Date</strong>
                        <span>
                          <FaCalendarAlt />
                          {new Date(
                            donation.expiryDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                  </div>


                  {/* DESCRIPTION */}

                  {donation.description && (
                    <p className="recipient-description">
                      {donation.description}
                    </p>
                  )}


                  {/* DONOR */}

                  <div className="donor-info">

                    <span>Donated by</span>

                    <strong>
                      {donation.donorName ||
                        donation.donor?.name ||
                        "SafeShare Donor"}
                    </strong>

                  </div>


                  {/* BUTTON */}

                  <button className="request-btn">
                    Request Resource
                  </button>

                </article>

              ))}

            </div>

          )}

        </section>


      

           

      </main>
    </>
  );
}

export default RecipientDashboard;