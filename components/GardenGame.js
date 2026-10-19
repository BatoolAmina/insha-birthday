"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const fireflies = [
  { x: 13, y: 28, delay: 0 },
  { x: 37, y: 66, delay: 0.6 },
  { x: 58, y: 25, delay: 1.1 },
  { x: 83, y: 48, delay: 0.3 },
  { x: 24, y: 78, delay: 1.4 },
  { x: 72, y: 77, delay: 0.9 },
  { x: 48, y: 47, delay: 1.7 },
];

export default function GardenGame({ celebrate, onDone }) {
  const [caught, setCaught] = useState([]);
  const complete = caught.length === fireflies.length;

  const catchFirefly = (index) => {
    if (caught.includes(index)) return;
    const next = [...caught, index];
    setCaught(next);
    if (next.length === fireflies.length) celebrate();
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-1 text-center" aria-label="Catch the garden fireflies">
      <header className="mb-5">
        <p className="label">A little garden game</p>
        <h2 className="mt-2 font-display text-[clamp(2.3rem,7vw,5rem)] font-semibold italic leading-tight">
          <span className="gold-text">Catch the fireflies</span>
        </h2>
        <p className="mx-auto mt-2 max-w-lg font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
          {complete ? "You found every little light. The garden is glowing just for you!" : `There are ${fireflies.length - caught.length} little lights left to find. Tap each firefly to catch it.`}
        </p>
      </header>

      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/35 bg-[#071810]/55 shadow-[0_24px_80px_rgba(0,0,0,.35)] backdrop-blur-sm sm:aspect-[16/9]">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#174b35]/50 to-transparent" />
        <p className="absolute left-4 top-4 font-sans text-[10px] uppercase tracking-[.2em] text-cream/65 sm:text-xs">Fireflies found <span className="ml-1 text-gold">{caught.length} / {fireflies.length}</span></p>
        {fireflies.map((firefly, index) => caught.includes(index) ? (
          <motion.span key={index} aria-hidden="true" className="absolute h-3 w-3 rounded-full bg-gold" style={{ left: `${firefly.x}%`, top: `${firefly.y}%`, boxShadow: "0 0 24px 10px rgba(242,196,109,.65)" }} initial={{ scale: 1 }} animate={{ scale: 2.6, opacity: 0 }} transition={{ duration: 0.65 }} />
        ) : (
          <motion.button
            key={index}
            type="button"
            aria-label={`Catch firefly ${index + 1}`}
            onClick={() => catchFirefly(index)}
            className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 touch-manipulation place-items-center rounded-full transition-transform hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{ left: `${firefly.x}%`, top: `${firefly.y}%` }}
          >
            <motion.span aria-hidden="true" className="relative grid place-items-center" animate={{ y: [0, -7, 0], scale: [1, 1.08, 1] }} transition={{ duration: 2.4, delay: firefly.delay, repeat: Infinity, ease: "easeInOut" }}>
              <span className="absolute h-9 w-9 rounded-full bg-gold/20 blur-md" />
              <svg viewBox="0 0 32 32" className="relative h-7 w-7 drop-shadow-[0_0_8px_rgba(255,231,168,.95)]">
                <path d="M16 1.5 19.2 12.8 30.5 16l-11.3 3.2L16 30.5l-3.2-11.3L1.5 16l11.3-3.2z" fill="#fff0b8" />
                <circle cx="16" cy="16" r="3" fill="#fff" />
              </svg>
            </motion.span>
          </motion.button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {complete && <button type="button" className="btn" onClick={onDone}>Continue to the gifts</button>}
        {!complete && <button type="button" className="btn btn-ghost" onClick={onDone}>Skip to the gifts</button>}
      </div>
    </section>
  );
}
