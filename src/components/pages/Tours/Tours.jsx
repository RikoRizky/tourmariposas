import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageLightbox } from "../../ImageLightbox.jsx";
import { useScrollReveal } from "../../../hooks/useScrollReveal.js";
import { openWhatsApp } from "../../../utils/whatsapp.js";
import { TOURS_FILTER_EVENT } from "../../../utils/toursFilter.js";
import "./Tours.css";

import umrohBarokah from "./season1 umroh barokah.webp";
import umrohPlusMesir from "./season1 umroh plus mesir.webp";
import umrohItikaf from "./umroh itikaf.webp";
import umrohPlusTurki from "./umroh plus turki.webp";
import umrohRamadhan from "./umroh ramadhan.webp";
import umrohSerasaHaji from "./umroh serasa haji.webp";

const categories = [
  "Semua Paket",
  "Umroh",
  "Season 1",
  "Mesir",
  "Turki",
];

const INITIAL_VISIBLE = 6;

const formatPrice = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const toursData = [
  {
    id: 1,
    category: "Umroh",
    isSeason1: true,
    title: "Paket Umroh Barokah Season 1",
    duration: "10 Hari",
    price: 30500000,
    image: umrohBarokah,
  },
  {
    id: 2,
    category: "Umroh",
    isSeason1: true,
    title: "Paket Umroh Plus Mesir Season 1",
    duration: "14 Hari",
    price: 36900000,
    image: umrohPlusMesir,
  },
  {
    id: 3,
    category: "Umroh",
    title: "Paket Umroh Itikaf",
    duration: "15 Hari",
    price: 42900000,
    image: umrohItikaf,
  },
  {
    id: 4,
    category: "Umroh",
    title: "Paket Umroh Plus Turki",
    duration: "13 Hari",
    price: 37500000,
    image: umrohPlusTurki,
  },
  {
    id: 5,
    category: "Umroh",
    title: "Paket Umroh Ramadhan Special",
    duration: "20 Hari",
    price: 39900000,
    image: umrohRamadhan,
  },
  {
    id: 6,
    category: "Umroh",
    title: "Paket Umroh Serasa Haji",
    duration: "33 Hari",
    price: 40900000,
    image: umrohSerasaHaji,
  },
];

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState("Semua Paket");
  const [showAll, setShowAll] = useState(false);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState({});
  const [lightbox, setLightbox] = useState(null);

  const showMoreWrapRef = useRef(null);
  const collapseScrollAnchorRef = useRef(null);

  const sectionRef = useScrollReveal({
    staggerStep: 100,
  });

  const filteredTours =
    activeCategory === "Semua Paket"
      ? toursData
      : toursData.filter((tour) => {
        if (activeCategory === "Season 1") {
          return tour.isSeason1 || tour.title.toLowerCase().includes("season 1");
        }
        if (activeCategory === "Mesir") {
          return tour.title.toLowerCase().includes("mesir");
        }
        if (activeCategory === "Turki" || activeCategory === "Turkey") {
          return (
            (tour.title.toLowerCase().includes("turki") ||
              tour.title.toLowerCase().includes("turkey") ||
              tour.category === "Turki") &&
            tour.category !== "Turki Plus"
          );
        }
        return tour.category === activeCategory;
      });

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
      let category = e.detail?.category;
      if (category === "Turkey") {
        category = "Turki";
      }

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
    <section
      id="tours"
      className="tours-section page-section-bg"
      ref={sectionRef}
    >
      <div className="tours-header">
        <p data-reveal>✈ OUR TOURS</p>

        <h1 data-reveal>
          Explore Our Best
          <span> Travel Packages</span>
        </h1>

        <h3 data-reveal>
          Pilih paket perjalanan terbaik dan
          nikmati pengalaman
          <br />
          liburan yang tak terlupakan bersama
          kami.
        </h3>

        <p className="tours-count" data-reveal>
          Menampilkan <strong>{visibleCount}</strong>
          {hasMoreTours && !showAll && (
            <>
              {' '}
              dari <strong>{filteredTours.length}</strong>
            </>
          )}{' '}
          paket
          {activeCategory !== "Semua Paket"
            ? ` · ${activeCategory}`
            : ""}
        </p>
      </div>

      <div className="tour-filters" data-reveal>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              activeCategory === category
                ? "filter-btn active"
                : "filter-btn"
            }
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
        {displayedTours.map((tour, index) => {
          const currentPhoto =
            tour.photoOptions?.[selectedPriceIndex[tour.id] ?? 0] ??
            tour.image;

          return (
            <article
              className="tour-card"
              key={tour.id}
              style={{ "--card-i": index }}
            >
              <button
                type="button"
                className="tour-image-btn"
                onClick={() =>
                  setLightbox({
                    src: currentPhoto,
                    alt: tour.title,
                  })
                }
                aria-label={`Perbesar brosur ${tour.title}`}
              >
                <div
                  className="tour-image"
                  style={{
                    backgroundImage: `url(${currentPhoto})`,
                  }}
                >
                  <div className="tour-overlay" />

                  <span
                    className="tour-zoom-hint"
                    aria-hidden="true"
                  >
                    Klik untuk lihat brosur
                  </span>

                  <div className="tour-badge">
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </button>

              <div className="tour-content">
                <span className="tour-category-tag">
                  {tour.category}
                </span>

                <h2>{tour.title}</h2>

                {tour.prices ? (
                  <>
                    <div className="tour-price-table">
                      {tour.prices.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`tour-price-item ${selectedPriceIndex[tour.id] === idx
                              ? "active"
                              : ""
                            }`}
                          onClick={() =>
                            setSelectedPriceIndex((prev) => ({
                              ...prev,
                              [tour.id]: idx,
                            }))
                          }
                        >
                          <span>{item.pax}</span>

                          <strong>{item.price}</strong>
                        </button>
                      ))}
                    </div>


                  </>
                ) : (
                  <p className="tour-meta">
                    <span>{tour.duration}</span>

                    <span
                      className="tour-meta-sep"
                      aria-hidden="true"
                    >
                      ·
                    </span>

                    <span className="tour-price">
                      {formatPrice(tour.price)}
                    </span>
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    let message;
                    if (tour.prices) {
                      const selectedIdx = selectedPriceIndex[tour.id] ?? 0;
                      const selectedPrice = tour.prices[selectedIdx];
                      message = `Halo Mariposas Tour, saya tertarik dan ingin memesan ${tour.title} ${selectedPrice.pax} (${selectedPrice.price}). Boleh minta informasi lebih lanjut?`;
                    } else {
                      message = `Halo Mariposas Tour, saya tertarik dan ingin memesan ${tour.title}. Boleh minta informasi lebih lanjut?`;
                    }
                    openWhatsApp(message);
                  }}
                >
                  Pesan →
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="tours-show-more-wrap"
        data-reveal
        ref={showMoreWrapRef}
      >
        {hasMoreTours ? (
          <button
            type="button"
            className="tours-show-more-btn"
            onClick={handleToggleShowAll}
          >
            {showAll
              ? "Tampilkan lebih sedikit"
              : "Lihat selengkapnya"}
          </button>
        ) : (
          <p className="tours-all-shown-message">
            ✨ Semua paket{' '}
            {activeCategory !== "Semua Paket"
              ? `pada kategori ${activeCategory}`
              : ""}{' '}
            sudah ditampilkan
          </p>
        )}
      </div>

      <div className="tour-help" data-reveal>
        <div className="help-left">
          <div className="help-icon">🎧</div>

          <div>
            <h2>Butuh Bantuan Memilih Paket?</h2>

            <p>
              Tim kami siap membantu Anda
              menemukan paket terbaik sesuai
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
