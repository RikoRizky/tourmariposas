import gsap from "gsap";
import { useLayoutEffect } from "react";
import "../style.css";
import "./preloader-flow.css";
import "./App.css";
import { Preloader } from "./components/Preloader.jsx";
import { FlowImages } from "./components/FlowImages.jsx";
import { LandingPageContent } from "./components/LandingPageContent.jsx";
import Destination from "./components/pages/Destination/Destination.jsx";

const FLOW_POSITIONS = [
  { x: -0.8, y: -0.6 }, { x: 0.7, y: 0.4 }, { x: -0.5, y: 0.7 }, { x: 0.6, y: -0.5 },
  { x: -0.8, y: 0.2 }, { x: 0.8, y: -0.3 }, { x: -0.6, y: -0.8 }, { x: 0.4, y: 0.6 },
  { x: -0.7, y: 0.5 }, { x: 0.5, y: -0.7 }, { x: -0.4, y: -0.4 }, { x: 0.3, y: 0.8 },
  { x: -0.8, y: 0.3 }, { x: 0.6, y: 0.2 }, { x: -0.2, y: -0.7 }, { x: 0.7, y: -0.6 },
  { x: -0.5, y: 0.4 }, { x: 0.4, y: -0.4 }, { x: -0.6, y: 0.6 }, { x: 0.8, y: 0.5 },
  { x: -0.3, y: -0.5 }, { x: 0.5, y: 0.3 }, { x: -0.7, y: -0.2 }, { x: 0.2, y: 0.7 },
  { x: -0.4, y: 0.8 }, { x: 0.6, y: -0.8 }, { x: -0.8, y: 0.1 }, { x: 0, y: 0 },
];

function runIntroSequence() {
  const master = gsap.timeline();

  master.to("#preloader", {
    opacity: 0,
    duration: 1,
    delay: 2.8,
    ease: "power2.inOut",
    onComplete: () => {
      const el = document.getElementById("preloader");
      if (el) el.style.display = "none";
    },
  });

  const images = gsap.utils.toArray(".flow .img");

  gsap.set(".flow", { visibility: "visible" });
  gsap.set(images, { xPercent: -50, yPercent: -50, z: -5000, opacity: 0, scale: 0 });

  const flowTl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  flowTl
    .to(".flow .section-text p", { opacity: 1, duration: 1.2 })
    .to(".flow .section-text", { opacity: 0, duration: 0.8, delay: 0.5 });

  images.forEach((img, index) => {
    const isLast = index === images.length - 1;
    flowTl.to(
      img,
      {
        xPercent: isLast ? -50 : FLOW_POSITIONS[index].x * 150,
        yPercent: isLast ? -50 : FLOW_POSITIONS[index].y * 150,
        x: 0,
        y: 0,
        z: isLast ? 0 : 3500,
        opacity: 1,
        scale: 1,
        duration: 1.2,
      },
      ">-1.05"
    );
  });

  flowTl.to(
    ".flow .img.cover img",
    {
      scale: 1.4,
      duration: 1.8,
      filter: "blur(10px)",
      ease: "power2.in",
    },
    "-=0.2"
  );

  flowTl.to(
    "#landing-page-content",
    {
      visibility: "visible",
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
      startAt: { scale: 1.1, opacity: 0 },
      onStart: () => {
        // PERBAIKAN TARGET ANIMASI: 
        // Mengubah '#landing-nav' menjadi '.modern-nav' agar sesuai dengan class komponen Anda
        gsap.from(".modern-nav", { y: -80, opacity: 0, duration: 1.5, ease: "expo.out" });
        
        gsap.from(".hero-reveal", {
          y: 120,
          opacity: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "expo.out",
        });

        if (typeof window.initLandingSlider === "function") {
          window.initLandingSlider();
        }
      },
    },
    "-=1.2"
  );

  // PERBAIKAN KRITIS: Memastikan .flow benar-benar hilang dari susunan layar (tidak memblokir klik)
  flowTl.set(".flow", { display: "none", pointerEvents: "none" });
  
  master.add(flowTl);
}

let introSequenceStarted = false;

export default function App() {
  useLayoutEffect(() => {
    if (introSequenceStarted) return;

    const onLoad = () => {
      if (introSequenceStarted) return;
      introSequenceStarted = true;
      runIntroSequence();
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <Preloader />
      <FlowImages />
      <LandingPageContent />
      <Destination />
    </>
  );
}