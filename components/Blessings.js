"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blessings } from "@/lib/content";
const ACC = [["#ffb8c6", "#ff8fa8"], ["#9ad8c0", "#5fb89a"], ["#f2c46d", "#e0a843"], ["#ff9f9f", "#e86a7a"], ["#c9a4ff", "#9a73e0"]];
function Branch({ i }) {
  const [a, b] = ACC[i], petals = 5 + i;
  return (<svg viewBox="0 0 300 600" className="h-full w-full" aria-hidden="true">
    <motion.path d="M150 600C90 470 230 380 150 250S150 90 150 60" stroke="#2f7a55" strokeWidth="5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: "easeOut" }} />
    {[[120, 470, 160], [190, 400, 20], [130, 320, 170], [185, 240, -20], [140, 160, 160]].map(([x, y, r], k) => (<motion.path key={k} d="M0 0C10-16 34-16 46 0C34 16 10 16 0 0Z" fill="#2f7a55" transform={`translate(${x} ${y}) rotate(${r})`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + k * 0.3 }} style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }} />))}
    <motion.g initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.9, type: "spring", bounce: 0.4 }} style={{ transformOrigin: "150px 60px" }}>
      {Array.from({ length: petals }, (_, k) => <ellipse key={k} cx="150" cy="22" rx="17" ry="38" fill={k % 2 ? a : b} opacity=".95" transform={`rotate(${(360 / petals) * k} 150 60)`} />)}<circle cx="150" cy="60" r="14" fill="#f2c46d" /></motion.g>
  </svg>);
}
export default function Blessings({ onDone }) {
  const [i, setI] = useState(0);
  const b = blessings[i], last = i === blessings.length - 1, right = i % 2 === 1;
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <AnimatePresence mode="wait">
        <motion.article key={i} aria-live="polite" initial={{ opacity: 0, x: right ? 80 : -80, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: right ? -80 : 80, filter: "blur(10px)" }} transition={{ duration: 0.8 }}
          className={`relative flex w-full flex-col items-center gap-1 text-center md:min-h-[62svh] md:flex-row md:gap-4 ${right ? "md:flex-row-reverse md:text-right" : "md:text-left"}`}>
          <span aria-hidden="true" className="pointer-events-none absolute -top-6 select-none font-display text-[min(48vw,340px)] font-extrabold italic leading-none text-transparent" style={{ WebkitTextStroke: "1.5px rgba(242,196,109,.35)", [right ? "left" : "right"]: 0 }}>{b.n}</span>
          <div className="relative h-[min(17svh,140px)] min-h-[88px] w-[72px] shrink-0 md:h-[58svh] md:w-[34%] md:max-w-[240px]"><Branch i={i} /></div>
          <div className="relative w-full flex-1 px-2 md:px-0">
            <p className="label mb-2 md:mb-3">Blessing {i + 1} of {blessings.length}</p>
            <h2 className="font-display text-[clamp(1.85rem,7vw,5.4rem)] font-extrabold italic leading-[.98]" style={{ color: ACC[i][0] }}>{b.t}</h2>
            <div className={`mx-auto my-3 h-px w-20 bg-gold md:my-5 md:w-24 ${right ? "md:ml-auto" : "md:ml-0"}`} />
            <motion.p className="mx-auto max-w-2xl font-serif text-lg leading-relaxed sm:text-xl md:mx-0 md:text-2xl" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.012 } } }}>
              {b.body.split(" ").map((word, index) => (
                <motion.span key={`${i}-${index}`} className="inline-block" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>{word}&nbsp;</motion.span>
              ))}
            </motion.p>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3" role="group" aria-label="Blessing navigation">
        <button type="button" className="btn btn-ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
        <div className="flex">{blessings.map((x, k) => (<button key={x.n} type="button" aria-label={`Go to blessing ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} className="grid h-11 w-8 place-items-center"><span className={`block rounded-full bg-gold transition-all ${k === i ? "h-3 w-3" : "h-2 w-2 opacity-40"}`} /></button>))}</div>
        <button type="button" className="btn" onClick={() => (last ? onDone() : setI(i + 1))}>{last ? "Read your duas" : "Next blessing"}</button>
      </div>
    </div>);
}
