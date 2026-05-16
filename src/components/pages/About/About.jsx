// src/components/pages/About/About.jsx

import "./About.css";

const stats = [
  {
    id: 1,
    number: "10K+",
    text: "Happy Travelers",
  },

  {
    id: 2,
    number: "250+",
    text: "Tour Packages",
  },

  {
    id: 3,
    number: "15+",
    text: "Years Experience",
  },

  {
    id: 4,
    number: "98%",
    text: "Customer Satisfaction",
  },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-left">
          <p className="about-subtitle">ABOUT US</p>

          <h1>
            We Create The Best
            <span> Travel Experience</span>
          </h1>

          <p className="about-description">
            Mariposas Tour hadir untuk memberikan pengalaman
            perjalanan terbaik bagi para traveler dengan layanan
            profesional, destinasi eksklusif, dan harga terbaik.
          </p>

          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">✈</div>

              <div>
                <h3>Best Tour Guide</h3>

                <p>
                  Didampingi guide profesional dan berpengalaman.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🌍</div>

              <div>
                <h3>Exclusive Destinations</h3>

                <p>
                  Menjelajahi tempat-tempat terbaik di dunia.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💎</div>

              <div>
                <h3>Premium Services</h3>

                <p>
                  Layanan perjalanan nyaman dan berkualitas.
                </p>
              </div>
            </div>
          </div>

          <button className="about-btn">
            Explore More →
          </button>
        </div>

        <div className="about-right">
          <div className="about-image-grid">
            <div className="image-large">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

            <div className="image-small">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>

            <div className="image-small">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop"
                alt=""
              />
            </div>
          </div>

          <div className="experience-card">
            <h2>15+</h2>

            <p>Years of Experience</p>
          </div>
        </div>
      </div>

      <div className="about-stats">
        {stats.map((item) => (
          <div className="stat-card" key={item.id}>
            <h2>{item.number}</h2>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}