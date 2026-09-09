"use client";

import { useEffect, useCallback } from "react";

export default function ParticlesComponent() {
  const initParticles = useCallback(() => {
    // Respect reduced-motion: do not run the animation at all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip on small screens for performance (video + text only)
    if (window.innerWidth < 768) return;

    // cleanup old canvas
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-ignore
      window.pJSDom = [];
    }

    // Light Nokia-blue palette so particles read clearly over the dark hero
    const colors = {
      particles: "#5b8dd9",
      lines: "#5b8dd9",
      accent: "#a9c8f0",
    };

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 90, density: { enable: true, value_area: 900 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.35 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: colors.lines,
          opacity: 0.5,
          width: 1.1,
        },
        move: { enable: true, speed: 2, random: true, out_mode: "bounce" },
      },
      interactivity: {
        // "window" is more reliable than "canvas" under a layered hero
        detect_on: "window",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initParticles();
    };

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [initParticles]);

  // Transparent container so the background <video> shows through.
  // Positioned absolute to fill the hero; parent hero must be position:relative.
  // pointer-events-auto: this is the layer that should receive hover/click.
  return (
    <div
      id="particles-js"
      className="pointer-events-auto absolute top-0 left-0 z-10 h-full w-full bg-transparent"
    />
  );
}
