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
    }, landing);

    return () => ctx.revert();
  }, []);

  return (
    <div id="landing-page-content" ref={landingRef}>
      <div className="page-wrap">
        <header className="page-header">
          <main>
            <article id="hero-1" style={{ "--i": 5 }}>
              <div className="hero-info">
                <h2>Travel the</h2>
                <h1>World</h1>
                <h3>Pragser Wildsee, Italy</h3>
              </div>
              <div className="hero-image hi-1"></div>
            </article>
            <article id="hero-2" style={{ "--i": 4 }}>
              <div className="hero-info">
                <h2>Savour the</h2>
                <h1>Journey</h1>
                <h3>Marignier, France</h3>
              </div>
              <div className="hero-image hi-2"></div>
            </article>
            <article id="hero-3" style={{ "--i": 3 }}>
              <div className="hero-info">
                <h2>Expand Your</h2>
                <h1>Horizons</h1>
                <h3>Hooker Valley Track, New Zealand</h3>
              </div>
              <div className="hero-image hi-3"></div>
            </article>
            <article id="hero-4" style={{ "--i": 2 }}>
              <div className="hero-info">
                <h2>Explore and</h2>
                <h1>Reflect</h1>
                <h3>Dolmites, Italy</h3>
              </div>
              <div className="hero-image hi-4"></div>
            </article>
            <article id="hero-5" style={{ "--i": 1 }}>
              <div className="hero-info">
                <h2>Change Your</h2>
                <h1>Perspective</h1>
                <h3>Phuket, Thailand</h3>
              </div>
              <div className="hero-image hi-5"></div>
            </article>
          </main>
        </header>
      </div>
    </div>
  );
}
