"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor, a small dot that trails the pointer and grows into a
 * ring over interactive elements. Disabled on touch / reduced-motion.
 * The nodes are always mounted (so refs are valid); behaviour is gated
 * inside the effect and they stay invisible when not enabled.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      setVisible(true);
      const el = e.target as HTMLElement;
      setActive(!!el.closest("a, button, [data-cursor='grow']"));
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full mix-blend-difference"
        style={{
          width: active ? 56 : 34,
          height: active ? 56 : 34,
          marginLeft: active ? -28 : -17,
          marginTop: active ? -28 : -17,
          border: `1px solid ${active ? "#0071e3" : "#1d1d1f"}`,
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), margin 0.25s, border-color 0.25s",
          willChange: "transform",
        }}
      />
    </div>
  );
}
