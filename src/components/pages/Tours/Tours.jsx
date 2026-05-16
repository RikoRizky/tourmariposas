// src/components/pages/Tours/Tours.jsx

import { useState } from "react";
import "./Tours.css";

import umh1 from "./umh1.PNG";

const categories = [
  "Semua Paket",
  "Indonesia",
  "Turkey",
  "Umroh",
];

const toursData = [
  {
    id: 1,
    category: "Indonesia",
    title: "Paket Indonesia Arbain Juli 2026",
    duration: "15 Hari",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    category: "Promo",
    title: "Paket Indonesia Arbain Syawal 2026",
    duration: "18 Hari",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    category: "Promo",
    title: "Paket Indonesia Promo Special 2026",
    duration: "27 Hari",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    category: "Indonesia",
    title: "Paket Indonesia PBI 2026",
    duration: "9 - 12 Hari",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 5,
    category: "Turkey",
    title: "Japan Sakura Tour",
    duration: "7 Hari",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 6,
    category: "Umroh",
    title: "Bali Premium Holiday",
    duration: "5 Hari",
    image: umh1,
  },

  {
    id: 7,
    category: "Honeymoon",
    title: "Maldives Honeymoon",
    duration: "6 Hari",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 8,
    category: "Umroh",
    title: "Raja Ampat Adventure",
    duration: "5 Hari",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState("Semua Paket");

  const filteredTours =
    activeCategory === "Semua Paket"
      ? toursData
      : toursData.filter((tour) => tour.category === activeCategory);

  return (
    <section id="tours" className="tours-section">
      <div className="tours-header">
        <p>✈ OUR TOURS</p>

        <h1>
          Explore Our Best
          <span> Travel Packages</span>
        </h1>

        <h3>
          Pilih paket perjalanan terbaik dan nikmati pengalaman
          <br />
          liburan yang tak terlupakan bersama kami.
        </h3>
      </div>

      <div className="tour-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="tours-grid">
        {filteredTours.map((tour) => (
          <div className="tour-card" key={tour.id}>
            
            <div className="tour-image">
              <img src={tour.image} alt={tour.title} />

              <div className="tour-overlay"></div>

              <div className="tour-badge">
                <span>{tour.duration}</span>
              </div>
            </div>

            <div className="tour-content">
              <h2>{tour.title}</h2>

              <p>{tour.duration}</p>

              <button>Lihat Detail →</button>
            </div>

          </div>
        ))}
      </div>

      <div className="tour-help">
        <div className="help-left">
          <div className="help-icon">🎧</div>

          <div>
            <h2>Butuh Bantuan Memilih Paket?</h2>

            <p>
              Tim kami siap membantu Anda menemukan paket
              terbaik sesuai kebutuhan Anda.
            </p>
          </div>
        </div>

        <button>Hubungi Kami ↗</button>
      </div>
    </section>
  );
}