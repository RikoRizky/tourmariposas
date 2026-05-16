import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ImageLightbox.css";

export function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Preview brosur paket"}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox-close-btn"
        aria-label="Tutup gambar"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>

      <div
        className="lightbox-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} />
      </div>
    </div>,
    document.body
  );
}
