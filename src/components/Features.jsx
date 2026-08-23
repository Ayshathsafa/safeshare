import {
  FaRobot,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaRecycle,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features-section">
      <div className="section-content">

        {/* Section Heading */}
        <div className="features-header">
          <span className="features-tag">WHY SAFESHARE?</span>

          <h2 className="section-title">
            Making Every Donation <span>Count</span>
          </h2>

          <p className="section-subtitle">
            SafeShare connects resources with the people and organizations
            that need them most — safely, intelligently, and efficiently.
          </p>
        </div>

        {/* Features */}
        <div className="features-grid">

          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <FaRobot />
            </div>

            <div>
              <h3 className="feature-heading">
                Smart AI Matching
              </h3>

              <p className="feature-text">
                Our intelligent system matches donations with suitable
                recipients based on type, location, urgency, and availability.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h3 className="feature-heading">
                Verified Organizations
              </h3>

              <p className="feature-text">
                Donations are connected with verified NGOs and hospitals
                to create a safer and more trustworthy platform.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h3 className="feature-heading">
                Right Place, Right Time
              </h3>

              <p className="feature-text">
                Location-based matching helps donations reach nearby
                organizations and people who need them quickly.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">
              <FaRecycle />
            </div>

            <div>
              <h3 className="feature-heading">
                Reduce Resource Waste
              </h3>

              <p className="feature-text">
                Give surplus food, medicines, clothes, and essential
                resources a meaningful second life.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;