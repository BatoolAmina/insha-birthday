"use client";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Scenery from "./Scenery";
import Burst from "./Burst";
import Music from "./Music";
import Cake from "./Cake";
import Gallery from "./Gallery";
import Gifts from "./Gifts";
import Blessings from "./Blessings";
import Final from "./Final";
import Letter from "./Letter";
import GardenGame from "./GardenGame";
import Duas from "./Duas";
import { Opening, Celebration } from "./Intro";

const scenes = ["Doors", "Welcome", "Cake", "Moments", "Garden Game", "Gifts", "Letter", "Blessings", "Duas", "Finale"];

export default function Experience() {
  const [s, setS] = useState(0);
  const [burst, setBurst] = useState(0);
  const music = useRef(null);
  const celebrate = useCallback(() => setBurst((b) => b + 1), []);
  const go = useCallback((n) => setS(Math.max(0, Math.min(scenes.length - 1, n))), []);
  const view = [
    <Opening key="o" onOpen={() => { music.current?.play(); celebrate(); }} onEnter={() => go(1)} />,
    <Celebration key="c" onDone={() => go(2)} />,
    <Cake key="k" celebrate={celebrate} onDone={() => go(3)} />,
    <Gallery key="g" />,
    <GardenGame key="gg" celebrate={celebrate} onDone={() => go(5)} />,
    <Gifts key="gi" celebrate={celebrate} onDone={() => go(6)} />,
    <Letter key="l" onDone={() => go(7)} />,
    <Blessings key="b" onDone={() => go(8)} />,
    <Duas key="d" onDone={() => go(9)} />,
    <Final key="f" celebrate={celebrate} onReplay={() => go(0)} />,
  ][s];
  return (
    <MotionConfig reducedMotion="user">
      <Scenery scene={s} />
      <Burst k={burst} />
      <Music ref={music} />
      <div className="pointer-events-none fixed left-4 top-4 z-40 flex items-center gap-3 sm:left-6 sm:top-5">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-ink/60 font-display text-[10px] font-semibold tracking-[.12em] text-gold shadow-[0_0_24px_rgba(242,196,109,.14)] backdrop-blur-md">IF</span>
        <span className="hidden sm:block">
          <span className="block font-sans text-[9px] uppercase tracking-[.28em] text-gold">A birthday film</span>
          <span className="font-serif text-sm italic text-cream/80">Made just for Insha</span>
        </span>
      </div>
      <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pb-28 pt-16">
        <AnimatePresence mode="wait">
          <motion.div key={s} className="flex w-full justify-center" initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }} transition={{ duration: 0.7 }}>
            {view}
          </motion.div>
        </AnimatePresence>
      </main>
      <nav aria-label="Scenes" className="fixed bottom-3 left-1/2 z-40 flex w-[min(540px,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-1 rounded-2xl glass px-2 py-2 sm:bottom-5 sm:px-3">
        <button type="button" className="min-h-[44px] shrink-0 rounded-xl px-2 font-sans text-xs text-mist transition-colors hover:text-gold disabled:opacity-30 sm:px-3 sm:text-sm" disabled={s === 0} onClick={() => go(s - 1)} aria-label="Previous scene">Back</button>
        <div className="min-w-0 flex-1 px-2">
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className="truncate font-serif text-sm italic text-cream sm:text-base">{scenes[s]}</span>
            <span className="shrink-0 font-sans text-[9px] tracking-[.18em] text-gold sm:text-[10px]">{String(s + 1).padStart(2, "0")} <span className="text-mist/50">/ {String(scenes.length).padStart(2, "0")}</span></span>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Choose a scene">
            {scenes.map((n, i) => (
              <button key={n} type="button" onClick={() => go(i)} aria-label={`Go to scene ${i + 1}: ${n}`} aria-current={i === s ? "step" : undefined} className="group grid h-8 min-w-0 flex-1 place-items-center">
                <span className={`h-[2px] w-full rounded-full transition-all duration-500 ${i <= s ? "bg-gold shadow-[0_0_8px_rgba(242,196,109,.45)]" : "bg-white/20 group-hover:bg-white/50"}`} />
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="min-h-[44px] shrink-0 rounded-xl px-2 font-sans text-xs text-mist transition-colors hover:text-gold disabled:opacity-30 sm:px-3 sm:text-sm" disabled={s === scenes.length - 1} onClick={() => go(s + 1)} aria-label="Next scene">Next</button>
      </nav>
    </MotionConfig>
  );
}
