import { useEffect, useRef } from "react";

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function useScrollReveal({
  selector = "[data-reveal]",
  threshold = 0.08,
  rootMargin = "0px 0px 0px 0px",
  staggerStep = 90,
  staggerBase = 0,
  once = true,
  deps = [],
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.matches(selector)
      ? [root]
      : [...root.querySelectorAll(selector)];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          if (once) observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el, index) => {
      el.style.setProperty(
        "--reveal-delay",
        `${staggerBase + index * staggerStep}ms`
      );

      if (isInViewport(el)) {
        el.classList.add("is-visible");
        if (once) return;
      } else {
        el.classList.remove("is-visible");
      }

      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, threshold, rootMargin, staggerStep, staggerBase, once, ...deps]);

  return containerRef;
}
