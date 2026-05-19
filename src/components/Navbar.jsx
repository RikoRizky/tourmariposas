import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Navbar.css";

gsap.registerPlugin(ScrollToPlugin);

const MENU_DURATION = 0.75;
const MENU_EASE = "power4.inOut";

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

  const handleNavClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;

      e.preventDefault();
      e.stopPropagation();

      if (href === "#") {
        pendingScrollRef.current = null;
        if (menuOpenRef.current) closeMenu();
        return;
      }

      if (!href.startsWith("#")) return;

      if (menuOpenRef.current) {
        pendingScrollRef.current = href;
        closeMenu();
        return;
      }

      scrollToHash(href);
    },
    [closeMenu, scrollToHash]
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
          if (pending) {
            pendingScrollRef.current = null;
            gsap.delayedCall(0.05, () => scrollToHash(pending));
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
            About
          </a>
          <a href="#destination" onClick={handleNavClick}>
            Destination
          </a>
          <a href="#tours" onClick={handleNavClick}>
            Tours
          </a>
          <a href="#testimoni" onClick={handleNavClick}>
            Testimoni
          </a>
          <a href="#contact" onClick={handleNavClick}>
            Contact
          </a>
          <a
            href="#tours"
            className="nav-cta nav-cta-desktop"
            onClick={handleNavClick}
          >
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
        <div ref={menuInnerRef} className="menu-inner">
          <ul className="level-1">
            <li className="mobile-only-nav menu-panel">
              <h3>Navigation</h3>
              <ul>
                <li>
                  <a href="#about" onClick={handleNavClick}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#destination" onClick={handleNavClick}>
                    Destination
                  </a>
                </li>
                <li>
                  <a href="#tours" onClick={handleNavClick}>
                    Tours
                  </a>
                </li>
                <li>
                  <a href="#testimoni" onClick={handleNavClick}>
                    Testimoni
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Contact
                  </a>
                </li>
                <li className="nav-cta-mobile-wrapper">
                  <a href="#tours" className="nav-cta" onClick={handleNavClick}>
                    Book Now
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-panel">
              <h3>Destinations</h3>
              <ul className="level-2">
                <li>
                  <ul className="level-3">
                    <li>
                      <a href="#tours" onClick={handleNavClick}>
                        Indonesia
                      </a>
                    </li>
                    <li>
                      <a href="#tours" onClick={handleNavClick}>
                        Umroh
                      </a>
                    </li>
                    <li>
                      <a href="#tours" onClick={handleNavClick}>
                        Turkey
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="menu-panel">
              <h3>Travel Tips</h3>
              <ul>
                <li>
                  <a href="#tours" onClick={handleNavClick}>
                    Going on a trip
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Travel Insurance
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Working abroad
                  </a>
                </li>
                <li>
                  <a href="#tours" onClick={handleNavClick}>
                    Saving
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Instagram tips
                  </a>
                </li>
              </ul>
              <p>
                <small>
                  <a href="#tours" onClick={handleNavClick}>
                    More tips...
                  </a>
                </small>
              </p>
            </li>

            <li className="menu-panel">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Personalised travel advice
                  </a>
                </li>
                <li>
                  <a href="#tours" onClick={handleNavClick}>
                    Where we book our travels
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Become a booking agent
                  </a>
                </li>
              </ul>
              <p>
                <small>
                  <a href="#contact" onClick={handleNavClick}>
                    More resources...
                  </a>
                </small>
              </p>
            </li>

            <li className="menu-panel">
              <h3>About Us</h3>
              <ul>
                <li>
                  <a href="#about" onClick={handleNavClick}>
                    Our story
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Work with us
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleNavClick}>
                    YouTube
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
