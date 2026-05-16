import gsap from "gsap";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Navbar.css";

function showNav(nav) {
  if (!nav) return;
  nav.classList.remove("nav-hidden");
  nav.classList.add("nav-visible");
}

export function Navbar({ hidden = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const menuTweenRef = useRef(null);
  const menuOpenRef = useRef(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  // 1. Efek untuk menampilkan navbar di awal jika tidak hidden
  useLayoutEffect(() => {
    if (hidden) return;

    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { clearProps: "transform,opacity,y,top" });
    nav.classList.remove("nav-hidden", "navbar-hidden");
    nav.classList.add("nav-visible");
    showNav(nav);
  }, [hidden]);

  // 2. Efek KHUSUS Scroll Lock (Solusi Bug Scroll)
  useLayoutEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 3. Efek untuk Animasi GSAP Overlay Menu
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!hidden && !menuOpen) {
      overlay.style.display = "none";
      overlay.style.pointerEvents = "none";
      gsap.set(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
      return;
    }

    menuOpenRef.current = menuOpen;
    menuTweenRef.current?.kill();

    if (menuOpen) {
      overlay.style.display = "block";
      overlay.style.pointerEvents = "auto";

      menuTweenRef.current = gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.65,
        ease: "expo.inOut",
      });
    } else {
      overlay.style.pointerEvents = "none";

      menuTweenRef.current = gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        ease: "expo.inOut",
        onComplete: () => {
          if (menuOpenRef.current) return;
          overlay.style.display = "none";
        },
      });
    }

    return () => {
      menuTweenRef.current?.kill();
    };
  }, [menuOpen, hidden]);

  // 4. Efek untuk Hide/Show Navbar saat di-scroll
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || hidden) return;

    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    showNav(nav);

    const onScroll = () => {
      if (menuOpen) return;

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
  }, [hidden, menuOpen]);

  // 5. Cleanup global saat komponen unmount
  useLayoutEffect(() => {
    return () => {
      document.body.style.overflow = "";
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.display = "none";
        overlay.style.pointerEvents = "none";
      }
    };
  }, []);

  const handleNavLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <nav
        className={`modern-nav ${hidden ? "navbar-hidden" : "nav-visible"} ${menuOpen ? "nav-menu-open" : ""}`}
        ref={navRef}
      >
        <div className="nav-left">
          <a href="#" className="nav-brand" onClick={handleNavLinkClick}>
            <img src="logobg.png" alt="Mariposas Logo" className="brand-logo" />
            <div className="brand-divider" />
            <div className="brand-text">
              <h1>MARIPOSAS TOUR</h1>
              <p>Indonesia</p>
            </div>
          </a>
        </div>

        <div className="nav-center">
          <a href="#" onClick={handleNavLinkClick}>Home</a>
          <a href="#destination" onClick={handleNavLinkClick}>Destination</a>
          <a href="#tours" onClick={handleNavLinkClick}>Tours</a>
          <a href="#" onClick={handleNavLinkClick}>Blog</a>
          <a href="#about" onClick={handleNavLinkClick}>About</a>
          <a href="#contact" onClick={handleNavLinkClick}>Contact</a>
          {/* Tombol Book Now versi Desktop */}
          <a href="#tours" className="nav-cta nav-cta-desktop" onClick={handleNavLinkClick}>
            Book Now
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
        <ul className="level-1">
          <li className="mobile-only-nav">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#" onClick={handleNavLinkClick}>Home</a></li>
              <li><a href="#destination" onClick={handleNavLinkClick}>Destination</a></li>
              <li><a href="#tours" onClick={handleNavLinkClick}>Tours</a></li>
              <li><a href="#" onClick={handleNavLinkClick}>Blog</a></li>
              <li><a href="#about" onClick={handleNavLinkClick}>About Us</a></li>
              <li><a href="#contact" onClick={handleNavLinkClick}>Contact</a></li>
              
              {/* Tempat Baru Book Now saat di Mobile Overlay */}
              <li className="nav-cta-mobile-wrapper">
                <a href="#tours" className="nav-cta" onClick={handleNavLinkClick}>
                  Book Now
                </a>
              </li>
            </ul>
          </li>

          <li>
            <h3>Destinations</h3>
            <ul className="level-2">
              <li>
                <ul className="level-3">
                  <li>Indonesia</li>
                  <li>Umroh</li>
                  <li>Turkey</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <h3>Travel Tips</h3>
            <ul>
              <li>Going on a trip</li>
              <li>Travel Insurance</li>
              <li>Working abroad</li>
              <li>Saving</li>
              <li>Instagram tips</li>
            </ul>
            <p>
              <small>More tips...</small>
            </p>
          </li>
          <li>
            <h3>Resources</h3>
            <ul>
              <li>Personalised travel advice</li>
              <li>Where we book our travels</li>
              <li>Become a booking agent</li>
            </ul>
            <p>
              <small>More resources...</small>
            </p>
          </li>
          <li>
            <h3>About Us</h3>
            <ul>
              <li>Our story</li>
              <li>Work with us</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </li>
        </ul>
      </section>
    </>
  );
}