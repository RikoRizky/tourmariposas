import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function Navbar({ hidden = true }) {
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const burger = burgerRef.current;
    const overlay = overlayRef.current;
    if (!nav || !burger || !overlay) return;

    let showMenu = false;
    overlay.style.display = "none";

    const onBurgerClick = () => {
      showMenu = !showMenu;
      if (showMenu) {
        burger.classList.add("active");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
        gsap.to(overlay, 1, {
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "expo.in",
        });
      } else {
        burger.classList.remove("active");
        gsap.to(overlay, 1, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "expo.out",
          onComplete: () => {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
          },
        });
      }
    };

    burger.addEventListener("click", onBurgerClick);

    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const onScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        nav.classList.add("nav-hidden");
        nav.classList.remove("nav-visible");
      } else if (currentScrollTop < lastScrollTop) {
        nav.classList.remove("nav-hidden");
        nav.classList.add("nav-visible");
      }
      lastScrollTop = currentScrollTop;
    };

    nav.classList.add("nav-visible");
    window.addEventListener("scroll", onScroll);

    return () => {
      burger.removeEventListener("click", onBurgerClick);
      window.removeEventListener("scroll", onScroll);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <nav className={`modern-nav ${hidden ? "navbar-hidden" : "nav-visible"}`} ref={navRef}>
        <div className="nav-left">
          <div className="nav-brand">
            <img src="logobg.png" alt="Mariposas Logo" className="brand-logo" />
            <div className="brand-divider"></div>
            <div className="brand-text">
              <h1>MARIPOSAS TOUR</h1>
              <p>Indonesia</p>
            </div>
          </div>
        </div>

        <div className="nav-center">
          <a href="#">Discover</a>
          <a href="#">Experience</a>
          <a href="#destination">Destination</a>
          <a href="#">Information</a>
        </div>

        <div className="nav-right">
          <div ref={burgerRef} id="burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <section ref={overlayRef} className="navbar-overlay-menu">
        <ul className="level-1">
          <li className="mobile-only-nav">
            <h3>Navigation</h3>
            <ul>
              <li>Discover</li>
              <li>Experience</li>
              <li>
                <a href="#destination">Destination</a>
              </li>
              <li>Information</li>
            </ul>
          </li>

          <li>
            <h3>Destinations</h3>
            <ul className="level-2">
              <li>
                <ul className="level-3">
                  <li>Bali</li>
                  <li>Cambodia</li>
                  <li>Japan</li>
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
