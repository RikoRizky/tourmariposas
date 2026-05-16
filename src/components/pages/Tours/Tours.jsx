// src/components/pages/Tours/Tours.jsx

import { useState } from "react";
import "./Tours.css";

import umh1 from "./umh1.PNG";
import umh2 from "./umh2.PNG";
import umh3 from "./umh3.PNG";
import umh4 from "./umh4.PNG";
import umh5 from "./umh5.PNG";
import umh6 from "./umh6.PNG";
import umh7 from "./umh7.PNG";
import umh8 from "./umh8.PNG";
import umh9 from "./umh9.PNG";
import umh10 from "./umh10.PNG";
import umh11 from "./umh11.PNG";
import umh12 from "./umh12.PNG";
import umh13 from "./umh13.PNG";
import umh14 from "./umh14.PNG";
import umh15 from "./umh15.PNG";
import umh16 from "./umh16.PNG";
import tky1 from "./tky1.PNG";
import tky2 from "./tky2.PNG";
import tky3 from "./tky3.PNG";
import tky4 from "./tky4.PNG";

const categories = [
  "Semua Paket",
  "Umroh",
  "Indonesia",
  "Turkey",
];

const toursData = [
  {
    id: 1,
    category: "Umroh",
    title: "Paket Umroh Arbain Juli 2026",
    duration: "15 Hari",
    image: umh1,
  },

  {
    id: 2,
    category: "Umroh",
    title: "Paket Umroh Arbain Syawal 2026",
    duration: "18 Hari",
    image: umh2,
  },

  {
    id: 3,
    category: "Umroh",
    title: "Paket Umroh Promo Special 2026",
    duration: "27 Hari",
    image: umh3,
  },

  {
    id: 4,
    category: "Umroh",
    title: "Paket Umroh PBI 2026",
    duration: "9 - 12 Hari",
    image: umh4,
  },

  {
    id: 5,
    category: "Umroh",
    title: "Umroh Exclusive Premium",
    duration: "12 Hari",
    image: umh5,
  },

  {
    id: 6,
    category: "Umroh",
    title: "Umroh Reguler Hemat",
    duration: "10 Hari",
    image: umh6,
  },

  {
    id: 7,
    category: "Umroh",
    title: "Umroh Private VIP",
    duration: "8 Hari",
    image: umh7,
  },

  {
    id: 8,
    category: "Umroh",
    title: "Paket Umroh Sederhana",
    duration: "20 Hari",
    image: umh8,
  },

  {
    id: 9,
    category: "Umroh",
    title: "Umroh Plus Turki",
    duration: "14 Hari",
    image: umh9,
  },

  {
    id: 10,
    category: "Umroh",
    title: "Umroh Plus Dubai",
    duration: "13 Hari",
    image: umh10,
  },

  {
    id: 11,
    category: "Umroh",
    title: "Umroh Ramadhan Special",
    duration: "16 Hari",
    image: umh11,
  },

  {
    id: 12,
    category: "Umroh",
    title: "Umroh Akhir Tahun",
    duration: "11 Hari",
    image: umh12,
  },

  {
    id: 13,
    category: "Umroh",
    title: "Umroh Plus Aqsa",
    duration: "15 Hari",
    image: umh13,
  },

  {
    id: 14,
    category: "Umroh",
    title: "Umroh VIP Executive",
    duration: "9 Hari",
    image: umh14,
  },

  {
    id: 15,
    category: "Umroh",
    title: "Umroh Family Package",
    duration: "12 Hari",
    image: umh15,
  },

  {
    id: 16,
    category: "Umroh",
    title: "Umroh Premium Plus",
    duration: "14 Hari",
    image: umh16,
  },

  {
    id: 17,
    category: "Turkey",
    title: "Umroh Premium Plus",
    duration: "14 Hari",
    image: tky1,
  },

  {
    id: 18,
    category: "Turkey",
    title: "Umroh Premium Plus",
    duration: "14 Hari",
    image: tky2,
  },

  {
    id: 19,
    category: "Turkey",
    title: "Umroh Premium Plus",
    duration: "14 Hari",
    image: tky3,
  },

  {
    id: 20,
    category: "Turkey",
    title: "Umroh Premium Plus",
    duration: "14 Hari",
    image: tky4,
  },
];

export default function Tours() {

  const [activeCategory, setActiveCategory] =
    useState("Semua Paket");

  const filteredTours =
    activeCategory === "Semua Paket"
      ? toursData
      : toursData.filter(
          (tour) =>
            tour.category === activeCategory
        );

  return (
    <section
      id="tours"
      className="tours-section"
    >

      <div className="tours-header">

        <p>✈ OUR TOURS</p>

        <h1>
          Explore Our Best
          <span> Travel Packages</span>
        </h1>

        <h3>
          Pilih paket perjalanan terbaik
          dan nikmati pengalaman
          <br />
          liburan yang tak terlupakan
          bersama kami.
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

            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </div>

      <div className="tours-grid">

        {filteredTours.map((tour) => (

          <div
            className="tour-card"
            key={tour.id}
          >

            <div
              className="tour-image"

              style={{
                backgroundImage: `url(${tour.image})`,
              }}
            >

              <div className="tour-overlay"></div>

              <div className="tour-badge">
                <span>{tour.duration}</span>
              </div>

            </div>

            <div className="tour-content">

              <h2>{tour.title}</h2>

              <p>{tour.duration}</p>

              <button>
                Pesan →
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="tour-help">

        <div className="help-left">

          <div className="help-icon">
            🎧
          </div>

          <div>

            <h2>
              Butuh Bantuan Memilih Paket?
            </h2>

            <p>
              Tim kami siap membantu
              Anda menemukan paket terbaik
              sesuai kebutuhan Anda.
            </p>

          </div>

        </div>

        <button>
          Hubungi Kami ↗
        </button>

      </div>

    </section>
  );
}