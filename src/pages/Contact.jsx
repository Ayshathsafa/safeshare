import "./Contact.css";
import Navbar from "../components/Navbar";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>

        <p>
          We'd love to hear from you. Whether you want to donate, request
          assistance, partner with us, or simply ask a question, the
          SafeShare team is here to help.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">

          {/* Contact Information */}

          <div className="contact-info">

            <h2>Contact Information</h2>

            <div className="info-box">
              <FaMapMarkerAlt />

              <div>
                <h4>Address</h4>

                <p>
                  Department of Computer Science Engineering
                  <br />
                  Your College Name
                  <br />
                  Karnataka, India
                </p>
              </div>
            </div>

            <div className="info-box">
              <FaPhoneAlt />

              <div>
                <h4>Phone</h4>

                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-box">
              <FaEnvelope />

              <div>
                <h4>Email</h4>

                <p>support@safeshare.com</p>
              </div>
            </div>

            <div className="info-box">
              <FaClock />

              <div>
                <h4>Working Hours</h4>

                <p>
                  Monday - Saturday
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}

          <div className="contact-form">

            <h2>Send us a Message</h2>

            <form>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button type="submit">
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* FAQ */}

      <section className="faq">

        <h2>Frequently Asked Questions</h2>

        <div className="faq-card">
          <h4>Who can donate through SafeShare?</h4>

          <p>
            Individuals, restaurants, hospitals, pharmacies, NGOs,
            educational institutions and businesses can donate usable
            resources.
          </p>
        </div>

        <div className="faq-card">
          <h4>Is SafeShare free to use?</h4>

          <p>
            Yes. SafeShare is completely free for donors,
            recipients and NGOs.
          </p>
        </div>

        <div className="faq-card">
          <h4>How does AI matching work?</h4>

          <p>
            Our AI prioritizes recipients based on urgency,
            location, resource availability and category to
            ensure efficient redistribution.
          </p>
        </div>

      </section>
    </>
  );
}

export default Contact;