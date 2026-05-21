import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollReveal } from "../../../hooks/useScrollReveal.js";
import {
  FALLBACK_THUMBNAIL,
  getDrivePreviewUrl,
  getDriveThumbnail,
  testimoniVideos,
} from "./testimoniVideos.js";
import "./Testimoni.css";

const logoUmh = `${import.meta.env.BASE_URL}LOGOUMH.PNG`;

const INITIAL_VISIBLE = 6;

const CATEGORY_LABELS = {
  testi: "Testimoni Jemaah",
  dokumen: "Dokumentasi Kegiatan",
};

function PlayIcon() {
  return (
    <svg className="testimoni-play-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="testimoni-close-svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Testimoni() {
  const [activeCategory, setActiveCategory] = useState("dokumen");
  const [showAll, setShowAll] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showMoreWrapRef = useRef(null);
  const collapseScrollAnchorRef = useRef(null);
  const parallax1Ref = useRef(null);
  const parallax2Ref = useRef(null);

  const filteredVideos = testimoniVideos.filter(
    (video) => video.category === activeCategory
  );

  const hasMore = filteredVideos.length > INITIAL_VISIBLE;
  const displayedVideos = showAll
    ? filteredVideos
    : filteredVideos.slice(0, INITIAL_VISIBLE);

  const sectionRef = useScrollReveal({
    staggerStep: 100,
    deps: [activeCategory, showAll, displayedVideos.length],
  });

  const visibleCount = showAll
    ? filteredVideos.length
    : Math.min(INITIAL_VISIBLE, filteredVideos.length);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

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
  }, [showAll, displayedVideos.length]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      if (parallax1Ref.current) {
        parallax1Ref.current.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
      if (parallax2Ref.current) {
        parallax2Ref.current.style.transform = `translateY(${scrolled * -0.05}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = (video) => {
    setModalVideo(video);
    requestAnimationFrame(() => setModalVisible(true));
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setModalVideo(null), 300);
  };

  useEffect(() => {
    if (!modalVideo) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalVideo]);

  const handleToggleShowAll = () => {
    if (showAll && showMoreWrapRef.current) {
      collapseScrollAnchorRef.current =
        showMoreWrapRef.current.getBoundingClientRect().top;
    }
    setShowAll((prev) => !prev);
  };

  const modalNode =
    modalVideo &&
    createPortal(
      <div
        className={`testimoni-modal${modalVisible ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimoni-modal-title"
        aria-hidden={!modalVisible}
      >
        <button
          type="button"
          className="testimoni-modal-backdrop"
          onClick={closeModal}
          aria-label="Tutup video"
        />
        <button
          type="button"
          className="testimoni-modal-close"
          onClick={closeModal}
          aria-label="Tutup"
        >
          <CloseIcon />
        </button>

        <div className={`testimoni-modal-content${modalVisible ? " is-visible" : ""}`}>
          <div className="testimoni-modal-player">
            {modalVisible && (
              <iframe
                key={modalVideo.id}
                title={modalVideo.title}
                src={getDrivePreviewUrl(modalVideo.id, { autoplay: true })}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
            <div
              className="testimoni-drive-link-block"
              aria-hidden="true"
            />
          </div>
          <div className="testimoni-modal-info">
            <h3 id="testimoni-modal-title">{modalVideo.title}</h3>
            <p>{modalVideo.desc}</p>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <section id="testimoni" className="testimoni-section" ref={sectionRef}>
      <div className="testimoni-bg-islamic" aria-hidden="true" />
      <div ref={parallax1Ref} className="testimoni-parallax-1" aria-hidden="true" />
      <div ref={parallax2Ref} className="testimoni-parallax-2" aria-hidden="true" />

      <div className="testimoni-inner">
        <header className="testimoni-header" data-reveal>
          <div className="testimoni-logo-wrap">
            <div className="testimoni-logo">
              <img src={logoUmh} alt="Logo Utama Mulya Haramain" />
            </div>
          </div>

          <span className="testimoni-badge">Baitullah Corner</span>

          <h2>
            Kisah Haru & Bahagia
            <span>Jemaah Umroh UMH</span>
          </h2>

          <div className="testimoni-divider" aria-hidden="true" />

          <p className="testimoni-desc">
            Simak pengalaman spiritual langsung dari tanah suci. Kenyamanan ibadah
            Anda adalah amanah terbesar kami.
          </p>

        <div className="testimoni-filters" data-reveal>
          <button
            type="button"
            className={`testimoni-filter-btn${activeCategory === "testi" ? " active" : ""}`}
            onClick={() => setActiveCategory("testi")}
          >
            ✨ Testimoni Jemaah
          </button>
          <button
            type="button"
            className={`testimoni-filter-btn${activeCategory === "dokumen" ? " active" : ""}`}
            onClick={() => setActiveCategory("dokumen")}
          >
            📸 Dokumentasi Kegiatan
          </button>
        </div>

        <p className="testimoni-count" data-reveal>
          Menampilkan <strong>{visibleCount}</strong>
          {hasMore && !showAll && (
            <>
              {" "}
              dari <strong>{filteredVideos.length}</strong>
            </>
          )}{" "}
          video · {CATEGORY_LABELS[activeCategory]}
        </p>

        <div className="testimoni-grid" key={activeCategory}>
          {displayedVideos.map((video, index) => (
            <article
              className="testimoni-card"
              key={video.id}
              style={{ "--card-i": index }}
            >
              <button
                type="button"
                className={`testimoni-video-btn testimoni-video-btn--${video.category}`}
                onClick={() => openModal(video)}
                aria-label={`Putar video: ${video.title}`}
              >
                <img
                  src={getDriveThumbnail(video.id)}
                  alt={video.title}
                  className="testimoni-thumb"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_THUMBNAIL;
                  }}
                />

                <div className="testimoni-play-overlay">
                  <span className="testimoni-play-icon">
                    <PlayIcon />
                  </span>
                  <span className="testimoni-play-hint">Putar Video</span>
                </div>

                <div className="testimoni-card-footer">
                  <h4>{video.title}</h4>
                  <p className="testimoni-card-desc">
                    {video.desc}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>

        {hasMore && (
          <div
            className="testimoni-show-more-wrap"
            data-reveal
            ref={showMoreWrapRef}
          >
            <button
              type="button"
              className="testimoni-show-more-btn"
              onClick={handleToggleShowAll}
            >
              {showAll ? "Tampilkan lebih sedikit" : "Lihat selengkapnya"}
            </button>
          </div>
        )}
        </header>
      </div>

      {modalNode}
    </section>
  );
}
