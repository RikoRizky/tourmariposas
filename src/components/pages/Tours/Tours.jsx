import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageLightbox } from "../../ImageLightbox.jsx";
import { useScrollReveal } from "../../../hooks/useScrollReveal.js";
import { openWhatsApp } from "../../../utils/whatsapp.js";
import { TOURS_FILTER_EVENT } from "../../../utils/toursFilter.js";
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

const categories = ["Semua Paket", "Umroh", "Indonesia", "Turkey"];
const INITIAL_VISIBLE = 6;

const formatPrice = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const toursData = [
  { id: 1, category: "Umroh", title: "Paket Umroh Arbain Juli 2026", duration: "15 Hari", price: 38500000, image: umh1 },
  { id: 2, category: "Umroh", title: "Paket Umroh Arbain Syawal 2026", duration: "18 Hari", price: 42500000, image: umh2 },
  { id: 3, category: "Umroh", title: "Paket Umroh Promo Special 2026", duration: "27 Hari", price: 52000000, image: umh3 },
  { id: 4, category: "Umroh", title: "Paket Umroh PBI 2026", duration: "9 - 12 Hari", price: 29800000, image: umh4 },
  { id: 5, category: "Umroh", title: "Umroh Exclusive Premium", duration: "12 Hari", price: 36500000, image: umh5 },
  { id: 6, category: "Umroh", title: "Umroh Reguler Hemat", duration: "10 Hari", price: 27500000, image: umh6 },
  { id: 7, category: "Umroh", title: "Umroh Private VIP", duration: "8 Hari", price: 45800000, image: umh7 },
  { id: 8, category: "Umroh", title: "Paket Umroh Sederhana", duration: "20 Hari", price: 33500000, image: umh8 },
  { id: 9, category: "Umroh", title: "Umroh Plus Turki", duration: "14 Hari", price: 48900000, image: umh9 },
  { id: 10, category: "Umroh", title: "Umroh Plus Dubai", duration: "13 Hari", price: 41200000, image: umh10 },
  { id: 11, category: "Umroh", title: "Umroh Ramadhan Special", duration: "16 Hari", price: 44500000, image: umh11 },
  { id: 12, category: "Umroh", title: "Umroh Akhir Tahun", duration: "11 Hari", price: 31800000, image: umh12 },
  { id: 13, category: "Umroh", title: "Umroh Plus Aqsa", duration: "15 Hari", price: 46800000, image: umh13 },
  { id: 14, category: "Umroh", title: "Umroh VIP Executive", duration: "9 Hari", price: 39500000, image: umh14 },
  { id: 15, category: "Umroh", title: "Umroh Family Package", duration: "12 Hari", price: 35200000, image: umh15 },
  { id: 16, category: "Umroh", title: "Umroh Premium Plus", duration: "14 Hari", price: 37800000, image: umh16 },
  { id: 17, category: "Turkey", title: "Umroh Premium Plus", duration: "14 Hari", price: 42900000, image: tky1 },
  { id: 18, category: "Turkey", title: "Umroh Premium Plus", duration: "14 Hari", price: 42900000, image: tky2 },
  { id: 19, category: "Turkey", title: "Umroh Premium Plus", duration: "14 Hari", price: 42900000, image: tky3 },
  { id: 20, category: "Turkey", title: "Umroh Premium Plus", duration: "14 Hari", price: 42900000, image: tky4 },
];

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState("Semua Paket");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const showMoreWrapRef = useRef(null);
  const collapseScrollAnchorRef = useRef(null);

  const sectionRef = useScrollReveal({ staggerStep: 100 });

  const filteredTours =
    activeCategory === "Semua Paket"
      ? toursData
      : toursData.filter((tour) => tour.category === activeCategory);

  const hasMoreTours = filteredTours.length > INITIAL_VISIBLE;
  const displayedTours = showAll
    ? filteredTours
    : filteredTours.slice(0, INITIAL_VISIBLE);
  const visibleCount = showAll
    ? filteredTours.length
    : Math.min(INITIAL_VISIBLE, filteredTours.length);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  useEffect(() => {
    const onFilter = (e) => {
      const category = e.detail?.category;
      if (!category || !categories.includes(category)) return;
      setActiveCategory(category);
      setShowAll(false);
    };

    window.addEventListener(TOURS_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(TOURS_FILTER_EVENT, onFilter);
  }, []);

  useLayoutEffect(() => {
    const anchorTop = collapseScrollAnchorRef.current;
    if (anchorTop === null || showAll) return;

    const wrap = showMoreWrapRef.current;
    collapseScrollAnchorRef.current = null;
    if (!wrap) return;

    const delta = wrap.getBoundingClientRect().top - anchorTop;
    if (delta !== 0) {
      window.scrollBy(0, delta);
    }
  }, [showAll, displayedTours.length]);

  const handleToggleShowAll = () => {
    if (showAll && showMoreWrapRef.current) {
      collapseScrollAnchorRef.current =
        showMoreWrapRef.current.getBoundingClientRect().top;
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section id="tours" className="tours-section page-section-bg" ref={sectionRef}>
      <div className="tours-header">
        <p data-reveal>✈ OUR TOURS</p>
        <h1 data-reveal>
          Explore Our Best
          <span> Travel Packages</span>
        </h1>
        <h3 data-reveal>
          Pilih paket perjalanan terbaik dan nikmati pengalaman
          <br />
          liburan yang tak terlupakan bersama kami.
        </h3>
        <p className="tours-count" data-reveal>
          Menampilkan <strong>{visibleCount}</strong>
          {hasMoreTours && !showAll && (
            <>
              {" "}
              dari <strong>{filteredTours.length}</strong>
            </>
          )}{" "}
          paket
          {activeCategory !== "Semua Paket" ? ` · ${activeCategory}` : ""}
        </p>
      </div>

      <div className="tour-filters" data-reveal>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "filter-btn active" : "filter-btn"}
            onClick={() => {
              setActiveCategory(category);
              setShowAll(false);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="tours-grid" key={activeCategory}>
        {displayedTours.map((tour, index) => (
          <article
            className="tour-card"
            key={tour.id}
            style={{ "--card-i": index }}
          >
            <button
              type="button"
              className="tour-image-btn"
              onClick={() =>
                setLightbox({ src: tour.image, alt: tour.title })
              }
              aria-label={`Perbesar brosur ${tour.title}`}
            >
              <div
                className="tour-image"
                style={{ backgroundImage: `url(${tour.image})` }}
              >
                <div className="tour-overlay" />
                <span className="tour-zoom-hint" aria-hidden="true">
                  Klik untuk lihat brosur
                </span>
                <div className="tour-badge">
                  <span>{tour.duration}</span>
                </div>
              </div>
            </button>

            <div className="tour-content">
              <span className="tour-category-tag">{tour.category}</span>
              <h2>{tour.title}</h2>
              <p className="tour-meta">
                <span>{tour.duration}</span>
                <span className="tour-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span className="tour-price">{formatPrice(tour.price)}</span>
              </p>
              <button
                type="button"
                onClick={() => openWhatsApp(tour.title)}
              >
                Pesan →
              </button>
            </div>
          </article>
        ))}
      </div>

      {hasMoreTours && (
        <div className="tours-show-more-wrap" data-reveal ref={showMoreWrapRef}>
          <button
            type="button"
            className="tours-show-more-btn"
            onClick={handleToggleShowAll}
          >
            {showAll ? "Tampilkan lebih sedikit" : "Lihat selengkapnya"}
          </button>
        </div>
      )}

      <div className="tour-help" data-reveal>
        <div className="help-left">
          <div className="help-icon">🎧</div>
          <div>
            <h2>Butuh Bantuan Memilih Paket?</h2>
            <p>
              Tim kami siap membantu Anda menemukan paket terbaik sesuai
              kebutuhan Anda.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              "paket wisata",
              "Halo Mariposas Tour, saya butuh bantuan memilih paket wisata yang tepat. Boleh konsultasi?"
            )
          }
        >
          Hubungi Kami ↗
        </button>
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
