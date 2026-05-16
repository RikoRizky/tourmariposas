// src/components/pages/Contact/Contact.jsx

import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <p>CONTACT US</p>

        <h1>
          Let’s Plan Your
          <span> Dream Journey</span>
        </h1>

        <h3>
          Hubungi tim kami untuk konsultasi perjalanan,
          booking paket tour, dan informasi lainnya.
        </h3>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-card">
            <div className="contact-icon">📍</div>

            <div>
              <h2>Office Address</h2>

              <p>
                Jl. Sunset Road No. 88,
                <br />
                Bali, Indonesia
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📞</div>

            <div>
              <h2>Phone Number</h2>

              <p>+62 812 3456 7890</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">✉️</div>

            <div>
              <h2>Email Address</h2>

              <p>hello@mariposastour.com</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">🕒</div>

            <div>
              <h2>Working Hours</h2>

              <p>Mon - Sat : 08.00 - 20.00</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Destination</label>

              <input
                type="text"
                placeholder="Where do you want to go?"
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>

              <textarea
                rows="6"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit">
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}