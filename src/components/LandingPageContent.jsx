import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import gambarBali from "../assets/bali.jpg";
import gambarTurki from "../assets/turki.jpeg";
import gambarUmroh from "../assets/umroh.jpg";

export function LandingPageContent() {
  const landingRef = useRef(null);

  useLayoutEffect(() => {
    const landing = landingRef.current;
    if (!landing) return;

    const ctx = gsap.context(() => {
      // 1. Set initial state: hanya hero-2 (Turki) yang visible
      gsap.set("#hero-2", { autoAlpha: 1, scale: 1 });
      gsap.set("#hero-3, #hero-1", { autoAlpha: 0, scale: 1.05 });
      
      // 2. Teks: hero-2 full terbuka, lainnya tertutup
      gsap.set("#hero-2 h2, #hero-2 h1, #hero-2 h3", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      });
      gsap.set(
        "#hero-3 h2, #hero-3 h1, #hero-3 h3, #hero-1 h2, #hero-1 h1, #hero-1 h3",
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }
      );

      // 3. Timeline utama dengan loop infinite
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // --- TRANSISI 1: Turki (hero-2) → Umroh (hero-3) ---
      tl.to("#hero-2", {
        autoAlpha: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.inOut"
      }, "+=2.5")
        .to("#hero-3", {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut"
        }, "<")
        // Animasi teks keluar untuk hero-2
        .to("#hero-2 h2", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-2 h1", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-2 h3", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        // Animasi teks masuk untuk hero-3
        .to("#hero-3 h2", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-3 h1", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-3 h3", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4");

      // --- TRANSISI 2: Umroh (hero-3) → Indonesia (hero-1) ---
      tl.to("#hero-3", {
        autoAlpha: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.inOut"
      }, "+=2.5")
        .to("#hero-1", {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut"
        }, "<")
        .to("#hero-3 h2", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-3 h1", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-3 h3", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-1 h2", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-1 h1", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-1 h3", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4");

      // --- TRANSISI 3: Indonesia (hero-1) → Turki (hero-2) ---
      tl.to("#hero-1", {
        autoAlpha: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.inOut"
      }, "+=2.5")
        .to("#hero-2", {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut"
        }, "<")
        .to("#hero-1 h2", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-1 h1", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-1 h3", 0.8, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-2 h2", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "<")
        .to("#hero-2 h1", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4")
        .to("#hero-2 h3", 0.8, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }, "-=0.4");
    }, landing);

    return () => ctx.revert();
  }, []);

  return (
    <div id="landing-page-content" ref={landingRef}>
      <div className="page-wrap">
        <header className="page-header">
          <main>
            <article id="hero-2" style={{ "--i": 3 }}>
              <div className="hero-info">
                <h2>Spectacular Turkiye</h2>
                <h1>Turkiye</h1>
                <h3>Explore the beauty of Turkiye</h3>
              </div>
              <div className="hero-image hi-2" style={{ backgroundImage: `url(${gambarTurki})` }}></div>
            </article>
            <article id="hero-3" style={{ "--i": 2 }}>
              <div className="hero-info">
                <h2>Umroh Premium</h2>
                <h1>Umroh</h1>
                <h3>Explore the beauty of Umroh</h3>
              </div>
              <div className="hero-image hi-3" style={{ backgroundImage: `url(${gambarUmroh})` }}></div>
            </article>
            <article id="hero-1" style={{ "--i": 1 }}>
              <div className="hero-info">
                <h2>Wonderful Indonesia</h2>
                <h1>Indonesia</h1>
                <h3>Explore the beauty of Indonesia</h3>
              </div>
              <div className="hero-image hi-1" style={{ backgroundImage: `url(${gambarBali})` }}></div>
            </article>
          </main>
        </header>
      </div>
    </div>
  );
}