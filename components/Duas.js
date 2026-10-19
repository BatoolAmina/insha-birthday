"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { duas, personalDua } from "@/lib/content";

export default function Duas({ onDone }) {
  const [selected, setSelected] = useState(0);
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const dua = duas[selected];
  const personalPrayer = selectedPersonal === null ? null : personalDua[selectedPersonal];
  const closePrayerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (selectedPersonal === null) {
      previousFocusRef.current?.focus();
      return;
    }
    previousFocusRef.current = document.activeElement;
    closePrayerRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPersonal(null);
      if (event.key === "ArrowRight") setSelectedPersonal((index) => (index + 1) % personalDua.length);
      if (event.key === "ArrowLeft") setSelectedPersonal((index) => (index - 1 + personalDua.length) % personalDua.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPersonal]);

  return (
    <section className="mx-auto w-full max-w-4xl px-1 pb-8 pt-6 sm:pt-0" aria-label="Birthday duas">
      <header className="mb-5 text-center">
        <p className="label">A prayer from the heart</p>
        <h2 className="mt-2 font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold italic leading-tight">
          <span className="gold-text">Duas for Insha</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
          May these heartfelt prayers accompany you through the year ahead.
        </p>
      </header>

      <div className="glass mx-auto max-w-3xl rounded-2xl p-4 sm:p-7">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Choose a dua">
          {duas.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`min-h-10 rounded-full border px-3 font-sans text-xs transition-colors sm:px-4 sm:text-sm ${selected === index ? "border-gold bg-gold text-ink" : "border-gold/30 bg-ink/35 text-cream hover:border-gold/70"}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <motion.article
          id="selected-dua"
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mt-6 max-w-2xl border-t border-gold/25 pt-5 text-center"
        >
          <h3 className="font-display text-2xl font-semibold italic text-gold sm:text-3xl">{dua.title}</h3>
          <p lang="ar" dir="rtl" className="mt-5 font-arabic text-2xl leading-[2.2] text-cream sm:text-3xl sm:leading-[2.3]">{dua.text}</p>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-cream/85 sm:text-base">{dua.meaning}</p>
          {dua.source && <p className="mt-3 font-sans text-xs tracking-wide text-gold">{dua.source}</p>}
        </motion.article>
      </div>

      <section className="mx-auto mt-5 max-w-4xl sm:mt-7" aria-label="Personal duas for Insha">
        <header className="mb-4 text-center">
          <p className="label">Insha Fatima ke liye dil se nikli duaein</p>
          <p className="mt-2 font-sans text-sm text-cream/80">Choose a card to open each heartfelt prayer.</p>
        </header>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3">
          {personalDua.map((prayer, index) => {
            return (
              <article key={prayer.title} className="group relative min-h-44 overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-[#17382a]/90 via-[#0b1e16]/80 to-[#09150f]/85 text-left shadow-[0_12px_30px_rgba(0,0,0,.18)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_rgba(0,0,0,.3)] sm:min-h-52">
                <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-5 font-display text-7xl italic text-gold/[.08] sm:text-8xl">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-gold/25 bg-ink/35 font-serif text-sm text-gold sm:left-5 sm:top-5">✦</span>
                <button
                  type="button"
                  aria-label={`Open prayer: ${prayer.title}`}
                  onClick={(event) => {
                    previousFocusRef.current = event.currentTarget;
                    setSelectedPersonal(index);
                  }}
                  className="flex h-full min-h-44 w-full flex-col items-start p-3 pt-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:min-h-52 sm:p-5 sm:pt-[4.25rem]"
                >
                  <span className="font-sans text-[8px] uppercase tracking-[.17em] text-gold/80 sm:text-[9px]">Personal dua {String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-1.5 line-clamp-2 font-display text-base font-semibold italic leading-tight text-cream sm:text-lg">{prayer.title}</span>
                  <span lang="ur-Latn" className="mt-2 line-clamp-3 font-serif text-xs leading-5 text-cream/65 sm:mt-3 sm:text-sm">{prayer.body}</span>
                  <span className="mt-auto pt-3 font-sans text-[9px] uppercase tracking-[.14em] text-gold transition-colors group-hover:text-[#fff0bd] sm:text-[10px]">Read prayer <span aria-hidden="true">↗</span></span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex justify-center">
        <button type="button" className="btn" onClick={onDone}>The final surprise</button>
      </div>

      <AnimatePresence>
        {personalPrayer && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={personalPrayer.title}
            className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-[#020805]/85 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPersonal(null)}
          >
            <motion.article
              className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/45 bg-gradient-to-br from-[#183a2b] via-[#0c2118] to-[#07130e] p-5 pt-16 text-center shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:p-9"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 font-display text-[9rem] italic leading-none text-gold/[.07]">{String(selectedPersonal + 1).padStart(2, "0")}</span>
              <button ref={closePrayerRef} type="button" className="btn btn-ghost absolute right-3 top-3 z-10 min-h-10 px-4 text-[10px]" aria-label="Close prayer" onClick={() => setSelectedPersonal(null)}>Close</button>
              <div className="relative">
                <p className="label">A heartfelt prayer</p>
                <h3 className="mt-3 pr-12 font-display text-2xl font-semibold italic leading-tight text-gold sm:px-8 sm:pr-8 sm:text-4xl">{personalPrayer.title}</h3>
                <div className="mx-auto my-5 h-px w-20 bg-gold/60" />
                <p lang="ur-Latn" className="font-serif text-base leading-8 text-cream sm:text-xl sm:leading-9">{personalPrayer.body}</p>
                <div className="mt-7 flex items-center justify-between gap-3">
                  <button type="button" className="btn btn-ghost px-4 text-[10px]" onClick={() => setSelectedPersonal((selectedPersonal - 1 + personalDua.length) % personalDua.length)}>Previous</button>
                  <span className="font-sans text-[10px] tracking-[.2em] text-gold">{String(selectedPersonal + 1).padStart(2, "0")} / {String(personalDua.length).padStart(2, "0")}</span>
                  <button type="button" className="btn btn-ghost px-4 text-[10px]" onClick={() => setSelectedPersonal((selectedPersonal + 1) % personalDua.length)}>Next</button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
