import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function LandingPageContent() {
  const landingRef = useRef(null);

  useLayoutEffect(() => {
    const landing = landingRef.current;
    if (!landing) return;

    const ctx = gsap.context(() => {
      let del = 3;
      let i = 1;
      const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "expo.out" });

      gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });

      gsap.set(
        [
          `#hero-2 h2, #hero-3 h2,
           #hero-2 h1, #hero-3 h1,
           #hero-2 h3, #hero-3 h3`,
        ],
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }
      );

      while (i < 3) {
        tl.to(`#hero-${i} h2`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", delay: del })
          .to(`#hero-${i} h1`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i} h3`, 0.9, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i} .hi-${i}`, 0.7, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=1")
          .to(`#hero-${i + 1} h2`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" })
          .to(`#hero-${i + 1} h1`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3")
          .to(`#hero-${i + 1} h3`, 0.9, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3");
        i++;
      }
    }, landing);

    return () => ctx.revert();
  }, []);

  return (
    <div id="landing-page-content" ref={landingRef}>
      <div className="page-wrap">
        <header className="page-header">
          <main>
            <article id="hero-1" style={{ "--i": 3 }}>
              <div className="hero-info">
                <h2>Wonderful Indonesia</h2>
                <h1>Indonesia</h1>
                <h3>Explore the beauty of Indonesia</h3>
              </div>
              <div className="hero-image hi-1"></div>
            </article>
            <article id="hero-2" style={{ "--i": 2 }}>
              <div className="hero-info">
                <h2>Spectacular Turkiye</h2>
                <h1>Turkiye</h1>
                <h3>Explore the beauty of Turkiye</h3>
              </div>
              <div className="hero-image hi-2"></div>
            </article>
            <article id="hero-3" style={{ "--i": 1 }}>
              <div className="hero-info">
                <h2>Umroh Premium</h2>
                <h1>Umroh</h1>
                <h3>Explore the beauty of Umroh</h3>
              </div>
              <div className="hero-image hi-3"></div>
            </article>
          </main>
        </header>
      </div>
    </div>
  );
}