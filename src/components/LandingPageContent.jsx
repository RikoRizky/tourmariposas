import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function LandingPageContent() {
  const landingRef = useRef(null);
  const burgerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const burger = burgerRef.current;
    const overlay = overlayRef.current;
    if (!burger || !overlay) return;

    let showMenu = false;
    overlay.style.display = "none";

    const onBurgerClick = () => {
  showMenu = !showMenu;

  if (showMenu) {
    burger.classList.add("active");

    overlay.style.display = "block";

    overlay.classList.add("active-overlay");

    gsap.to(overlay, {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
      ease: "expo.in",
    });
  } else {
    burger.classList.remove("active");

    overlay.classList.remove("active-overlay");

    gsap.to(overlay, {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "expo.out",

      onComplete: () => {
        overlay.style.display = "none";
      },
    });
  }
};
    burger.addEventListener("click", onBurgerClick);

    const ctx = gsap.context(() => {
      let del = 3;
      let i = 1;
      const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "expo.out" });

      gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });

      gsap.set(
        [
          `#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2,
           #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1,
           #hero-2 h3, #hero-3 h3, #hero-4 h3, #hero-5 h3`,
        ],
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }
      );

      while (i < 5) {
        tl.to(`#hero-${i} h2`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", delay: del })
          .to(`#hero-${i} h1`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i} h3`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i} .hi-${i}`, 0.7, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=1")
          .to(`#hero-${i + 1} h2`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" })
          .to(`#hero-${i + 1} h1`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i + 1} h3`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3");
        i++;
      }
    }, landingRef);

    return () => {
      burger.removeEventListener("click", onBurgerClick);
      ctx.revert();
    };
  }, []);

  return (
    <div id="landing-page-content" ref={landingRef}>
      <div className="page-wrap">
        <header className="page-header">
          <nav className="modern-nav">
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
              <a href="#">Home</a>
              <a href="#destination">Destination</a>
              <a href="#">Tours</a>
              <a href="#">Blog</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>

            <div className="nav-right">
              <div ref={burgerRef} id="burger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </nav>

          <main>
            <article id="hero-1" style={{ "--i": 5 }}>
              <div className="hero-info"><h2>Travel the</h2><h1>World</h1><h3>Pragser Wildsee, Italy</h3></div>
              <div className="hero-image hi-1"></div>
            </article>
            <article id="hero-2" style={{ "--i": 4 }}>
              <div className="hero-info"><h2>Savour the</h2><h1>Journey</h1><h3>Marignier, France</h3></div>
              <div className="hero-image hi-2"></div>
            </article>
            <article id="hero-3" style={{ "--i": 3 }}>
              <div className="hero-info"><h2>Expand Your</h2><h1>Horizons</h1><h3>Hooker Valley Track, New Zealand</h3></div>
              <div className="hero-image hi-3"></div>
            </article>
            <article id="hero-4" style={{ "--i": 2 }}>
              <div className="hero-info"><h2>Explore and</h2><h1>Reflect</h1><h3>Dolmites, Italy</h3></div>
              <div className="hero-image hi-4"></div>
            </article>
            <article id="hero-5" style={{ "--i": 1 }}>
              <div className="hero-info"><h2>Change Your</h2><h1>Perspective</h1><h3>Phuket, Thailand</h3></div>
              <div className="hero-image hi-5"></div>
            </article>
          </main>
        </header>

        <section ref={overlayRef}>
          <ul className="level-1">
            {/* Bagian ini hanya muncul di mobile karena class mobile-only-nav di CSS */}
            <li className="mobile-only-nav">
              <h3>Navigation</h3>
              <ul>
                <li>Discover</li>
                <li>Experience</li>
                <li>Destination</li>
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
              <p><small>More tips...</small></p>
            </li>
            <li>
              <h3>Resources</h3>
              <ul>
                <li>Personalised travel advice</li>
                <li>Where we book our travels</li>
                <li>Become a booking agent</li>
              </ul>
              <p><small>More resources...</small></p>
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
      </div>
    </div>
  );
}