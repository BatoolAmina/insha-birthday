"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
const ease = [0.22, 1, 0.36, 1];
const FLAGS = ["#ff8fa8", "#f2c46d", "#9ad8c0", "#fff3e0", "#ff9f6b", "#c9a4ff"];

function Door({ side, open }) {
  const left = side === "l";
  return (<motion.g initial={false} animate={{ scaleX: open ? 0.06 : 1 }} transition={{ duration: 2, ease: [0.6, 0, 0.2, 1], delay: left ? 0 : 0.12 }} style={{ transformOrigin: left ? "0% 50%" : "100% 50%", transformBox: "fill-box" }}>
    <rect x={left ? 40 : 200} y="150" width="160" height="410" fill="#10261d" stroke="#c9a04a" strokeWidth="5" />
    <rect x={left ? 40 : 200} y="150" width="160" height="410" fill="url(#lattice)" />
    <rect x={left ? 56 : 216} y="170" width="128" height="170" fill="#ffd9a0" opacity=".08" /><rect x={left ? 56 : 216} y="360" width="128" height="180" fill="none" stroke="#c9a04a" strokeOpacity=".6" strokeWidth="3" />
    <circle cx={left ? 186 : 214} cy="360" r="7" fill="url(#brass)" />
  </motion.g>);
}
export function Opening({ onOpen, onEnter }) {
  const [open, setOpen] = useState(false);
  const vines = useMemo(() => Array.from({ length: 34 }, (_, i) => { const a = Math.PI + (i / 33) * Math.PI; return { x: 200 + Math.cos(a) * 176, y: 150 + Math.sin(a) * 150 * 0.98 + (i % 3) * 3, r: (a * 180) / Math.PI + (i % 2 ? 40 : -40), s: 0.5 + (i % 4) * 0.12 }; }), []);
  const go = () => { setOpen(true); onOpen(); };
  return (
    <div className="relative flex w-full flex-col items-center gap-3 text-center">
      <motion.p className="label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2 }}>{open ? "Welcome to your day" : "Something is waiting behind these doors"}</motion.p>
      <div className="relative" style={{ width: "min(88vw,460px,calc(58svh*0.714))" }}>
        <motion.div aria-hidden="true" className="absolute left-1/2 top-[30%] -translate-x-1/2 rounded-full" initial={false} animate={{ opacity: open ? 1 : 0.55, scale: open ? 3.2 : 1 }} transition={{ duration: 2.2 }} style={{ width: "70%", aspectRatio: "1", background: "radial-gradient(circle,rgba(255,218,150,.95),rgba(255,170,90,.35) 50%,transparent 70%)" }} />
        <svg viewBox="0 0 400 560" className="relative w-full" role="img" aria-label="A pair of arched garden doors, glowing with light from behind">
          <defs><pattern id="lattice" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H26M0 0V26" stroke="#c9a04a" strokeOpacity=".55" strokeWidth="1.6" fill="none" /></pattern>
            <radialGradient id="brass" cx=".3" cy=".3"><stop offset="0" stopColor="#fff0b8" /><stop offset="1" stopColor="#a8741f" /></radialGradient>
            <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe3a8" /><stop offset="1" stopColor="#ff9a4a" /></linearGradient></defs>
          <path d="M30 560V150A170 150 0 0 1 370 150V560Z" fill="url(#beam)" />
          <Door side="l" open={open} /><Door side="r" open={open} />
          <motion.rect x="198" y="150" width="4" height="410" fill="#fff3d0" initial={false} animate={{ opacity: open ? 0 : [0.4, 1, 0.4] }} transition={open ? { duration: 0.4 } : { duration: 2.4, repeat: Infinity }} style={{ filter: "drop-shadow(0 0 10px #ffd27a)" }} />
          <path d="M30 560V150A170 150 0 0 1 370 150V560" fill="none" stroke="#c9a04a" strokeWidth="9" /><path d="M16 560V150A184 164 0 0 1 384 150V560" fill="none" stroke="#7a5a22" strokeWidth="3" />
          <path d="M190 -12h20l-10 22z" fill="#c9a04a" transform="translate(0 2)" />
          {vines.map((v, i) => (<path key={i} d="M0 0C10-14 30-14 40 0C30 14 10 14 0 0Z" fill={i % 3 ? "#2f7a55" : "#1d5a3c"} transform={`translate(${v.x} ${v.y}) rotate(${v.r}) scale(${v.s})`} />))}
          {vines.filter((_, i) => i % 5 === 2).map((v, i) => (<g key={"f" + i} transform={`translate(${v.x} ${v.y})`}><circle r="9" fill="#ffb8c6" /><circle r="4" fill="#f2c46d" /></g>))}
        </svg>
        <div className="pointer-events-none absolute inset-x-0 top-[38%] -translate-y-1/2 px-2">
          <h1 className="w-full font-display text-[clamp(2.2rem,10vw,5.2rem)] font-extrabold italic leading-[.98] text-cream" aria-label="Insha Fatima">
            {["Insha", "Fatima"].map((w, i) => (<span key={w} className="block overflow-hidden pb-[.1em]"><motion.span aria-hidden="true" className="block whitespace-nowrap text-[#fff5d9] [filter:drop-shadow(0_2px_8px_rgba(54,33,10,.65))]" initial={false} animate={{ y: open ? 0 : "115%" }} transition={{ duration: 1.5, ease, delay: open ? 1.5 + i * 0.35 : 0 }}>{w}</motion.span></span>))}
          </h1>
        </div>
      </div>
      {!open ? (<motion.button type="button" className="btn" onClick={go} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Open the surprise</motion.button>)
        : (<motion.button type="button" className="btn" onClick={onEnter} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4 }}>Enter the celebration</motion.button>)}
      <p className="font-sans text-xs text-mist/80">Music is optional. The player is at the top right.</p>
    </div>);
}
export function Celebration({ onDone }) {
  const text = "HAPPY BIRTHDAY".split("");
  return (
    <div className="relative flex w-full max-w-6xl flex-col items-center text-center">
      <svg viewBox="0 0 1000 150" className="w-full" aria-hidden="true">
        <path d="M0 10Q500 150 1000 10" stroke="#e9d9b0" strokeWidth="2" fill="none" />
        {text.map((c, i) => {
          if (c === " ") return null; const j = i > 5 ? i - 1 : i, t = (j + 0.6) / 13.2, x = 1000 * t, y = (1 - t) * (1 - t) * 10 + 2 * t * (1 - t) * 150 + t * t * 10; return (
            <motion.g key={i} style={{ transformOrigin: `${x}px ${y}px` }} initial={{ rotate: 0, opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1, rotate: [-3, 3, -3] }} transition={{ opacity: { delay: 0.3 + i * 0.07 }, scale: { delay: 0.3 + i * 0.07, type: "spring" }, rotate: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" } }}>
              <path d={`M${x - 28} ${y} L${x + 28} ${y} L${x} ${y + 62}Z`} fill={FLAGS[i % FLAGS.length]} /><text x={x} y={y + 30} textAnchor="middle" fontSize="26" fontWeight="800" fill="#1b1206" fontFamily="serif">{c}</text></motion.g>);
        })}
      </svg>
      <motion.p className="label mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>The garden celebrates you</motion.p>
      <h2 className="mt-1 font-display text-[clamp(2.8rem,9vw,7rem)] font-semibold italic leading-[.98]" aria-label="Insha Fatima">
        {"Insha Fatima".split("").map((c, i) => (<motion.span key={i} aria-hidden="true" className="gold-text inline-block whitespace-pre" initial={{ opacity: 0, y: 50, filter: "blur(10px)", rotate: 6 }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: 0 }} transition={{ delay: 1.6 + i * 0.07, duration: 0.9, ease }}>{c}</motion.span>))}
      </h2>
      <motion.p className="mt-4 max-w-xl font-serif text-xl italic text-mist sm:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1.2 }}>Every light, every petal and every balloon here is for you. Come and make a wish.</motion.p>
      <motion.button type="button" className="btn mt-6" onClick={onDone} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>Go to the cake</motion.button>
    </div>);
}
