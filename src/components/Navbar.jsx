import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { dispatchToursFilter } from "../utils/toursFilter.js";
import "./Navbar.css";

gsap.registerPlugin(ScrollToPlugin);

const MENU_DURATION = 0.75;
const MENU_EASE = "power4.inOut";

const MEGA_PACKAGES = [
  {
    title: "Paket Indonesia",
    desc: "Jelajahi candi, pantai & budaya",
    tourFilter: "Indonesia",
    icon: "bus",
  },
  {
    title: "Paket Umroh",
    desc: "Paket ibadah lengkap dengan bimbingan",
    tourFilter: "Umroh",
    icon: "moon",
  },
  {
    title: "Paket Turki",
    desc: "Istanbul, Cappadocia & sekitarnya",
    tourFilter: "Turkey",
    icon: "turkey",
  },
  {
    title: "Tur Internasional",
    desc: "Destinasi & petualangan di seluruh dunia",
    tourFilter: "Semua Paket",
    icon: "plane",
  },
];

const MEGA_DESTINATIONS = [
  { label: "Indonesia", flag: "🇮🇩", tourFilter: "Indonesia" },
  { label: "Umroh", flag: "🇸🇦", tourFilter: "Umroh" },
  { label: "Turki", flag: "🇹🇷", tourFilter: "Turkey" },
];

const MEGA_RECENT_TOURS = [
  {
    title: "Tur Candi Borobudur",
    desc: "Yogyakarta, Jawa Tengah",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=600&auto=format&fit=crop",
    tourFilter: "Indonesia",
  },
  {
    title: "Paket Umroh Premium",
    desc: "12 hari di Makkah & Madinah",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600&auto=format&fit=crop",
    tourFilter: "Umroh",
  },
  {
    title: "Tur Hagia Sophia & Istanbul",
    desc: "Landmark bersejarah Istanbul",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop",
    tourFilter: "Turkey",
  },
];

// Diganti dengan pengalaman yang akan didapatkan
const MEGA_RESOURCES = [
  { label: "Pengalaman Budaya Lokal", href: "#tours", icon: "culture", tourFilter: "Indonesia" },
  { label: "Kuliner Nusantara & Halal", href: "#tours", icon: "food", tourFilter: "Indonesia" },
  { label: "Akomodasi Premium & Nyaman", href: "#tours", icon: "hotel", tourFilter: "Semua Paket" },
  { label: "Pemandu Wisata Berpengalaman", href: "#tours", icon: "guide", tourFilter: "Semua Paket" },
  { label: "Dokumentasi & Spot Foto Instagramable", href: "#tours", icon: "camera", tourFilter: "Semua Paket" },
  { label: "Kenyamanan Ibadah (Umroh)", href: "#tours", icon: "kaaba", tourFilter: "Umroh" },
];

function PackageIcon({ type }) {
  const icons = {
    bus: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="6" width="18" height="11" rx="2" />
        <path d="M3 11h18M7 17v2M17 17v2M7 6V4M17 6V4" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
      </svg>
    ),
    turkey: (
      <span className="package-flag" aria-hidden="true">
        🇹🇷
      </span>
    ),
    plane: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10.18 9 2 4v2l8 2.5L2 11v2l8-2.5L2 16v2l10.18-5L22 20V4l-11.82 5z" />
      </svg>
    ),
  };
  return <span className={`package-icon package-icon--${type}`}>{icons[type]}</span>;
}

function ResourceIcon({ type }) {
  const icons = {
    plane: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M2 12h20M12 2l4 10-4 10-4-10 4-10z" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
      </svg>
    ),
    suitcase: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="5" y="8" width="14" height="12" rx="2" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2M12 12v4" />
      </svg>
    ),
    kaaba: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 3.2 5.5 2.75V16L12 18.8 6.5 16V7.95L12 5.2z" />
      </svg>
    ),
    currency: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M9 10.5h4.5a1.5 1.5 0 0 0 0-3H9M9 13.5h5a1.5 1.5 0 0 1 0 3H9" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    // Ikon baru untuk pengalaman
    culture: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    food: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zM8 8h8M12 2v2" />
      </svg>
    ),
    hotel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-3 7 3v14M9 17h2M13 17h2M9 13h2M13 13h2" />
      </svg>
    ),
    guide: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
      </svg>
    ),
    camera: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <circle cx="12" cy="13" r="3" />
        <path d="M17 3l-2 3h-6L7 3" />
      </svg>
    ),
  };
  return <span className="resource-icon">{icons[type]}</span>;
}

function showNav(nav) {
  if (!nav) return;
  nav.classList.remove("nav-hidden");
  nav.classList.add("nav-visible");
}

function isOverlayVisible(overlay) {
  if (!overlay) return false;
  const display = overlay.style.display;
  return display === "block" || overlay.classList.contains("is-open");
}

export function Navbar({ hidden = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const menuInnerRef = useRef(null);
  const menuTweenRef = useRef(null);
  const menuOpenRef = useRef(false);
  const pendingScrollRef = useRef(null);
  const pendingFilterRef = useRef(null);

  const setMenu = useCallback((open) => {
    menuOpenRef.current = open;
    setMenuOpen(open);
  }, []);

  const closeMenu = useCallback(() => setMenu(false), [setMenu]);
  const toggleMenu = useCallback(
    () => setMenu(!menuOpenRef.current),
    [setMenu]
  );

  const scrollToHash = useCallback((hash) => {
    if (!hash || hash === "#") {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: "power3.inOut" });
      return;
    }

    const id = hash.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;

    const navOffset = (navRef.current?.offsetHeight ?? 96) + 36;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: navOffset, autoKill: true },
      duration: 1.15,
      ease: "power3.inOut",
    });
  }, []);

  const navigateWithOptionalFilter = useCallback(
    (hash, tourFilter) => {
      const applyFilterAndScroll = () => {
        if (tourFilter) dispatchToursFilter(tourFilter);
        scrollToHash(hash);
      };

      if (menuOpenRef.current) {
        pendingScrollRef.current = hash;
        pendingFilterRef.current = tourFilter ?? null;
        closeMenu();
        return;
      }

      applyFilterAndScroll();
    },
    [closeMenu, scrollToHash]
  );

  const handleNavClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;

      e.preventDefault();
      e.stopPropagation();

      const tourFilter = e.currentTarget.getAttribute("data-tour-filter");

      if (href === "#") {
        pendingScrollRef.current = null;
        pendingFilterRef.current = null;
        if (menuOpenRef.current) closeMenu();
        return;
      }

      if (!href.startsWith("#")) return;

      if (tourFilter) {
        navigateWithOptionalFilter("#tours", tourFilter);
        return;
      }

      if (menuOpenRef.current) {
        pendingScrollRef.current = href;
        pendingFilterRef.current = null;
        closeMenu();
        return;
      }

      scrollToHash(href);
    },
    [closeMenu, navigateWithOptionalFilter, scrollToHash]
  );

  useLayoutEffect(() => {
    if (hidden) return;

    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { clearProps: "transform,opacity,y,top" });
    nav.classList.remove("nav-hidden", "navbar-hidden");
    nav.classList.add("nav-visible");
    showNav(nav);
  }, [hidden]);

  useLayoutEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const nav = navRef.current;
    const menuInner = menuInnerRef.current;
    if (!overlay) return;

    const panels = overlay.querySelectorAll(".menu-panel");
    const navLinks = nav?.querySelectorAll(".nav-center a, .nav-cta-desktop");

    if (!hidden && !menuOpen && !isOverlayVisible(overlay)) {
      overlay.style.display = "none";
      overlay.style.pointerEvents = "none";
      gsap.set(overlay, { yPercent: 100, opacity: 1 });
      gsap.set(menuInner, { opacity: 1 });
      gsap.set(panels, { opacity: 0, y: 36 });
      if (nav) gsap.set(nav, { y: 0, scale: 1, boxShadow: "" });
      return;
    }

    menuTweenRef.current?.kill();

    if (menuOpen) {
      overlay.style.display = "block";
      overlay.style.pointerEvents = "auto";

      gsap.set(overlay, { yPercent: 100, opacity: 1 });
      gsap.set(menuInner, { opacity: 0.4 });
      gsap.set(panels, { opacity: 0, y: 48 });
      if (navLinks?.length) gsap.set(navLinks, { opacity: 1, y: 0 });

      menuTweenRef.current = gsap.timeline({ defaults: { ease: MENU_EASE } });

      menuTweenRef.current
        .to(overlay, { yPercent: 0, duration: MENU_DURATION, ease: "power4.out" })
        .to(menuInner, { opacity: 1, duration: 0.35 }, "-=0.45")
        .to(
          panels,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.5"
        );

      if (nav) {
        menuTweenRef.current.to(
          nav,
          {
            y: 6,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: "0 12px 40px rgba(37, 99, 235, 0.18)",
          },
          "-=0.65"
        );
      }
    } else if (isOverlayVisible(overlay)) {
      overlay.style.pointerEvents = "none";

      menuTweenRef.current = gsap.timeline({
        onComplete: () => {
          if (menuOpenRef.current) return;

          overlay.style.display = "none";
          gsap.set(overlay, { yPercent: 100 });
          gsap.set(panels, { opacity: 0, y: 36 });

          const pending = pendingScrollRef.current;
          const pendingFilter = pendingFilterRef.current;
          pendingScrollRef.current = null;
          pendingFilterRef.current = null;
          if (pending) {
            gsap.delayedCall(0.05, () => {
              if (pendingFilter) dispatchToursFilter(pendingFilter);
              scrollToHash(pending);
            });
          }
        },
      });

      if (nav) {
        menuTweenRef.current.to(nav, {
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power2.inOut",
          boxShadow: "0 4px 24px rgba(37, 99, 235, 0.1)",
        });
      }

      if (navLinks?.length) {
        menuTweenRef.current.to(
          navLinks,
          {
            opacity: 0.6,
            y: -6,
            duration: 0.25,
            stagger: 0.03,
            ease: "power2.in",
          },
          0
        );
      }

      menuTweenRef.current
        .to(
          panels,
          {
            opacity: 0,
            y: -28,
            duration: 0.35,
            stagger: 0.05,
            ease: "power3.in",
          },
          0.05
        )
        .to(menuInner, { opacity: 0.3, duration: 0.3, ease: "power2.in" }, 0.1)
        .to(
          overlay,
          { yPercent: 100, duration: MENU_DURATION, ease: "power4.in" },
          0.12
        );

      if (navLinks?.length) {
        menuTweenRef.current.to(
          navLinks,
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
          "-=0.35"
        );
      }
    }

    return () => {
      menuTweenRef.current?.kill();
    };
  }, [menuOpen, hidden, scrollToHash]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || hidden) return;

    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    showNav(nav);

    const onScroll = () => {
      if (menuOpenRef.current) return;

      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop < 120) {
        showNav(nav);
      } else if (
        currentScrollTop > lastScrollTop &&
        currentScrollTop - lastScrollTop > 4
      ) {
        nav.classList.add("nav-hidden");
        nav.classList.remove("nav-visible");
      } else if (lastScrollTop - currentScrollTop > 4) {
        showNav(nav);
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  useLayoutEffect(() => {
    return () => {
      document.body.style.overflow = "";
      menuTweenRef.current?.kill();
    };
  }, []);

  return (
    <>
      <nav
        className={`modern-nav ${hidden ? "navbar-hidden" : "nav-visible"} ${menuOpen ? "nav-menu-open" : ""}`}
        ref={navRef}
      >
        <div className="nav-left">
          <a href="#" className="nav-brand" onClick={handleNavClick}>
            <img src="logobg.png" alt="Mariposas Logo" className="brand-logo" />
            <div className="brand-divider" />
            <div className="brand-text">
              <h1>MARIPOSAS TOUR</h1>
              <p>Indonesia</p>
            </div>
          </a>
        </div>

        <div className="nav-center">
          <a href="#about" onClick={handleNavClick}>
            Tentang
          </a>
          <a href="#destination" onClick={handleNavClick}>
            Destinasi
          </a>
          <a href="#tours" onClick={handleNavClick}>
            Paket
          </a>
          <a href="#testimoni" onClick={handleNavClick}>
            Testimoni
          </a>
          <a href="#contact" onClick={handleNavClick}>
            Kontak
          </a>
          <a
            href="#tours"
            className="nav-cta nav-cta-desktop"
            onClick={handleNavClick}
          >
            Pesan Sekarang
          </a>
        </div>

        <div className="nav-right">
          <button
            type="button"
            id="burger"
            className={`nav-menu-toggle ${menuOpen ? "active" : ""}`}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <section
        ref={overlayRef}
        className={`navbar-overlay-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div ref={menuInnerRef} className="menu-inner">
          <nav className="mega-mobile-nav mobile-only-nav menu-panel" aria-label="Navigasi mobile">
            <h3 className="mega-heading">Navigasi</h3>
            <ul className="mega-mobile-links">
              <li><a href="#about" onClick={handleNavClick}>Tentang</a></li>
              <li><a href="#destination" onClick={handleNavClick}>Destinasi</a></li>
              <li><a href="#tours" onClick={handleNavClick}>Paket</a></li>
              <li><a href="#testimoni" onClick={handleNavClick}>Testimoni</a></li>
              <li><a href="#contact" onClick={handleNavClick}>Kontak</a></li>
              <li className="nav-cta-mobile-wrapper">
                <a href="#tours" className="nav-cta" onClick={handleNavClick}>Pesan Sekarang</a>
              </li>
            </ul>
          </nav>

          <div className="mega-menu-grid">
            <section className="menu-panel mega-section mega-packages">
              <h3 className="mega-heading">Paket Kami</h3>
              <ul className="mega-package-list">
                {MEGA_PACKAGES.map((pkg) => (
                  <li key={pkg.title} className="mega-package-row">
                    <PackageIcon type={pkg.icon} />
                    <div className="mega-package-copy">
                      <strong>{pkg.title}</strong>
                      <span>{pkg.desc}</span>
                    </div>
                    <a
                      href="#tours"
                      className="mega-btn-view"
                      data-tour-filter={pkg.tourFilter}
                      onClick={handleNavClick}
                    >
                      Lihat Tur
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="menu-panel mega-section mega-destinations">
              <h3 className="mega-heading">Jelajahi Destinasi</h3>
              <div className="mega-destination-pills">
                {MEGA_DESTINATIONS.map((dest) => (
                  <a
                    key={dest.label}
                    href="#tours"
                    className="mega-destination-pill"
                    data-tour-filter={dest.tourFilter}
                    onClick={handleNavClick}
                  >
                    <span className="mega-destination-flag" aria-hidden="true">
                      {dest.flag}
                    </span>
                    <span className="mega-destination-label">{dest.label}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="menu-panel mega-section mega-recent">
              <h3 className="mega-heading">Tur yang Baru Dilihat</h3>
              <div className="mega-tour-cards">
                {MEGA_RECENT_TOURS.map((tour) => (
                  <article key={tour.title} className="mega-tour-card">
                    <a
                      href="#tours"
                      className="mega-tour-card-image-wrap"
                      data-tour-filter={tour.tourFilter}
                      onClick={handleNavClick}
                    >
                      <img src={tour.image} alt={tour.title} loading="lazy" />
                    </a>
                    <div className="mega-tour-card-body">
                      <h4>{tour.title}</h4>
                      <p>{tour.desc}</p>
                      <a
                        href="#tours"
                        className="mega-tour-book"
                        data-tour-filter={tour.tourFilter}
                        onClick={handleNavClick}
                      >
                        Pesan Sekarang
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="menu-panel mega-section mega-resources">
              <h3 className="mega-heading">Pengalaman yang Akan Didapatkan</h3>
              <ul className="mega-resource-list">
                {MEGA_RESOURCES.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.tourFilter ? "#tours" : item.href}
                      data-tour-filter={item.tourFilter || undefined}
                      onClick={handleNavClick}
                    >
                      <ResourceIcon type={item.icon} />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}