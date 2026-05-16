import { useScrollReveal } from "../../../hooks/useScrollReveal.js";
import "./About.css";

import bali from "./bali.jpg";
import turki from "./turki.jpg";
import umroh from "./umroh.jpg";

// const stats = [
//   {
//     id: 1,
//     number: "10K+",
//     text: "Happy Travelers",
//   },
//   {
//     id: 2,
//     number: "250+",
//     text: "Tour Packages",
//   },
//   {
//     id: 3,
//     number: "15+",
//     text: "Years Experience",
//   },
//   {
//     id: 4,
//     number: "98%",
//     text: "Customer Satisfaction",
//   },
// ];

export default function About() {
  const sectionRef = useScrollReveal({ staggerStep: 80 });

  return (
    <section id="about" className="about-section page-section-bg" ref={sectionRef}>
      <div className="about-container">
        <div className="about-left">
          <p className="about-subtitle" data-reveal>ABOUT US</p>

          <h1 data-reveal>
            We Create The Best
            <span> Travel Experience</span>
          </h1>

          <p className="about-description" data-reveal>
            Mariposas Tour hadir untuk memberikan pengalaman
            perjalanan terbaik bagi para traveler dengan layanan
            profesional, destinasi eksklusif, dan harga terbaik.
          </p>

          <div className="about-features" data-reveal>
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

          
        </div>

        <div className="about-right" data-reveal>
          <div className="about-image-grid">
            <div className="image-large">
              <img src={umroh} alt="Umroh Tour" />
            </div>

            <div className="image-small">
              <img src={turki} alt="Turki Tour" />
            </div>

            <div className="image-small">
              <img src={bali} alt="Bali Tour" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="about-stats">
        {stats.map((item) => (
          <div className="stat-card" key={item.id} data-reveal>
            <h2>{item.number}</h2>

            <p>{item.text}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
}