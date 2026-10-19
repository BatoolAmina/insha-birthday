"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayLetter } from "@/lib/content";

function Envelope({ open }) {
  return (
    <svg viewBox="0 0 240 160" className="mx-auto w-full max-w-[250px]" aria-hidden="true">
      <defs>
        <linearGradient id="envelope-paper" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff9ed" />
          <stop offset="1" stopColor="#ead6b6" />
        </linearGradient>
        <linearGradient id="envelope-flap" x1="0" x2="1">
          <stop offset="0" stopColor="#e7cba0" />
          <stop offset="1" stopColor="#f6e7cf" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="148" rx="92" ry="8" fill="#000" opacity=".22" />
      <motion.rect x="49" y="33" width="142" height="102" rx="3" fill="url(#envelope-paper)" initial={false} animate={{ y: open ? 12 : 33 }} transition={{ duration: 0.65 }} />
      <motion.path d="M49 42 120 98l71-56" fill="none" stroke="#d3b88f" strokeWidth="2" initial={false} animate={{ opacity: open ? 0 : 1 }} />
      <path d="M49 52 120 105 191 52v80H49Z" fill="#ecd9b9" stroke="#d3b88f" strokeWidth="1.5" />
      <motion.path d="m49 52 71 53 71-53" fill="#f5e8d2" stroke="#d3b88f" strokeWidth="1.5" initial={false} animate={{ opacity: open ? 0 : 1 }} />
      <motion.g initial={false} animate={{ scale: open ? 0.7 : 1, opacity: open ? 0 : 1 }} transition={{ duration: 0.25 }}>
        <circle cx="120" cy="94" r="15" fill="#b7833c" />
        <path d="m120 84 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#fff0c9" />
      </motion.g>
    </svg>
  );
}

export default function Letter({ onDone }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-3xl px-1 pt-6 sm:pt-0" aria-label="A birthday letter">
      <header className="mb-4 text-center sm:mb-6">
        <p className="label">A little something from the heart</p>
        <h2 className="mt-2 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold italic leading-[1.05]">
          <span className="gold-text">A letter for you</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-cream/80 sm:text-base">
          A few words to keep, for today and all the days ahead.
        </p>
      </header>

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-sm border border-gold/35 bg-[#0a2019]/70 px-4 py-5 shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur-sm sm:px-10 sm:py-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-2 border border-gold/15 sm:inset-3" />
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div key="sealed" className="relative z-10 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <Envelope open={false} />
              <p className="mb-4 font-serif text-lg italic text-cream sm:text-xl">A little note, just for you.</p>
              <button type="button" className="btn" aria-expanded={false} onClick={() => setOpen(true)}>Open your letter</button>
            </motion.div>
          ) : (
            <motion.article key="letter" className="relative z-10 mx-auto max-w-xl bg-[#fff8e9] px-5 py-5 text-[#26352d] shadow-[0_12px_45px_rgba(0,0,0,.25)] sm:px-10 sm:py-7" initial={{ opacity: 0, y: 30, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-2 border border-[#b7833c]/25 sm:inset-3" />
              <div className="relative">
                <p className="font-serif text-2xl italic text-[#87602f]">{birthdayLetter.greeting}</p>
                {birthdayLetter.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 font-sans text-sm leading-6 sm:text-base sm:leading-7">{paragraph}</p>
                ))}
                <p className="mt-4 text-right font-serif text-xl italic text-[#87602f]">{birthdayLetter.signoff}</p>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      {open && (
        <motion.div className="mt-6 flex justify-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <button type="button" className="btn" onClick={onDone}>Continue to your blessings</button>
        </motion.div>
      )}
    </section>
  );
}
