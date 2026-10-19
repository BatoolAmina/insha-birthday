"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gifts, secretMessage } from "@/lib/content";
const COLORS = ["#ff8fa8", "#f2c46d", "#9ad8c0", "#c9a4ff", "#ff9f6b"];

function Sparks({ n = 10, color = "#f2c46d" }) {
  return (<g aria-hidden="true">{Array.from({ length: n }, (_, i) => (<motion.circle key={i} cx="0" cy="0" r="3.5" fill={i % 2 ? color : "#fff"} initial={{ opacity: 1, x: 0, y: 0 }} animate={{ opacity: 0, x: Math.cos(i * 0.63) * 70, y: Math.sin(i * 0.63) * 70 - 20 }} transition={{ duration: 0.9 }} />))}</g>);
}
function BoxGift({ open, onOpen }) {
  return (
    <button type="button" onClick={onOpen} aria-label="The ribbon box. Tap to untie the ribbon." aria-pressed={open} className="block w-full">
      <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[260px] overflow-visible">
        <defs><linearGradient id="bx" x1="0" x2="1"><stop offset="0" stopColor="#d8bcff" /><stop offset="1" stopColor="#7d57c9" /></linearGradient><linearGradient id="rb" x1="0" x2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset=".5" stopColor="#e0a843" /><stop offset="1" stopColor="#fff0b8" /></linearGradient></defs>
        <ellipse cx="120" cy="222" rx="90" ry="10" fill="#000" opacity=".35" />
        <motion.polygon points="90,150 150,150 220,10 20,10" fill="#ffe3a8" initial={false} animate={{ opacity: open ? 0.55 : 0 }} style={{ filter: "blur(6px)" }} />
        <rect x="40" y="110" width="160" height="108" rx="6" fill="url(#bx)" /><rect x="104" y="110" width="32" height="108" fill="url(#rb)" />
        <motion.g initial={false} animate={open ? { y: -70, rotate: -16, x: -24 } : { y: 0, rotate: 0, x: 0 }} transition={{ type: "spring", bounce: 0.45 }} style={{ transformOrigin: "120px 100px" }}>
          <rect x="30" y="80" width="180" height="40" rx="8" fill="#e6d2ff" /><rect x="104" y="80" width="32" height="40" fill="url(#rb)" />
          <motion.g initial={false} animate={{ opacity: open ? 0 : 1, scale: open ? 0.4 : 1 }} style={{ transformOrigin: "120px 78px" }}><path d="M120 80C80 30 50 70 104 82M120 80C160 30 190 70 136 82" fill="#e0a843" stroke="#fff0b8" strokeWidth="3" /><circle cx="120" cy="80" r="9" fill="url(#rb)" /></motion.g></motion.g>
        {open && <g transform="translate(120 90)"><Sparks n={14} /></g>}
      </svg>
    </button>);
}
function Balloons({ popped, onPop }) {
  return (
    <div className="relative mx-auto flex h-[260px] w-full max-w-[300px] items-end justify-center">
      {gifts.balloons.map((w, i) => {
        const gone = popped.includes(i); return (
          <div key={i} className="absolute bottom-0" style={{ left: `${4 + i * 19}%`, transform: `translateY(${(i % 2) * 28}px)` }}>
            {!gone ? (<motion.button type="button" onClick={() => onPop(i)} aria-label={`Pop balloon ${i + 1}`} className="bob block" style={{ animationDelay: `${-i * 1.1}s` }} whileTap={{ scale: 1.25 }}>
              <svg width="62" height="170" viewBox="0 0 74 170"><defs><radialGradient id={`gb${i}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".3" stopColor={COLORS[i]} /><stop offset="1" stopColor={COLORS[i]} stopOpacity=".72" /></radialGradient></defs><ellipse cx="37" cy="50" rx="33" ry="44" fill={`url(#gb${i})`} /><path d="M33 93l4 8 4-8z" fill={COLORS[i]} /><path d="M37 101C26 125 48 140 37 168" stroke="#fff3e0" strokeOpacity=".6" fill="none" /></svg></motion.button>)
              : (<svg width="62" height="120" viewBox="0 0 62 120" aria-hidden="true"><g transform="translate(31 50)"><Sparks n={10} color={COLORS[i]} /></g></svg>)}
          </div>);
      })}
    </div>);
}
function LanternGift({ lit, onLight }) {
  return (
    <button type="button" onClick={onLight} aria-label="The wish lantern. Tap to light it." aria-pressed={lit} className="relative block w-full">
      <svg viewBox="0 0 200 260" className="mx-auto w-full max-w-[220px] overflow-visible">
        <defs><radialGradient id="lng"><stop offset="0" stopColor="#ffd27a" stopOpacity=".9" /><stop offset="1" stopColor="#ff9a3a" stopOpacity="0" /></radialGradient></defs>
        <motion.circle cx="100" cy="130" r="120" fill="url(#lng)" initial={false} animate={{ opacity: lit ? 1 : 0 }} transition={{ duration: 1 }} />
        <path d="M100 6v30M66 44h68l-12-18H78z" fill="#c9a04a" stroke="#c9a04a" strokeWidth="4" />
        <rect x="56" y="44" width="88" height="170" rx="10" fill="#ffe2a8" fillOpacity={lit ? 0.4 : 0.1} stroke="#c9a04a" strokeWidth="6" /><path d="M100 44v170M56 128h88" stroke="#c9a04a" strokeWidth="3" />
        <rect x="90" y="150" width="20" height="52" rx="3" fill="#fff3e0" />{lit && <motion.ellipse cx="100" cy="134" rx="8" ry="16" fill="#ffcf6a" animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />}
        <rect x="48" y="214" width="104" height="16" rx="5" fill="#c9a04a" />
        {lit && Array.from({ length: 9 }, (_, i) => (<motion.circle key={i} r="3" fill="#fff1a8" cx={50 + ((i * 37) % 100)} cy="200" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], y: [-10, -150 - (i % 3) * 30], x: [0, (i % 2 ? 20 : -20)] }} transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.35 }} />))}
      </svg>
    </button>);
}
function Station({ title, hint, done, children, text }) {
  return (<motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass relative flex flex-col items-center gap-3 px-4 pb-6 pt-5 text-center">
    <p className="label">{title}</p>{children}
    <div className="min-h-[4.5rem]"><AnimatePresence mode="wait">{text ? <motion.p key="t" initial={{ opacity: 0, y: 10, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} className="mx-auto max-w-[17rem] bg-cream px-4 py-3 font-script text-2xl leading-tight text-[#5a3a12] shadow-lg">{text}</motion.p> : <motion.p key="h" exit={{ opacity: 0 }} className="font-sans text-xs text-mist">{hint}</motion.p>}</AnimatePresence></div>
    <span aria-hidden="true" className={`h-1.5 w-10 rounded-full ${done ? "bg-gold" : "bg-white/20"}`} />
  </motion.article>);
}
export default function Gifts({ celebrate, onDone }) {
  const [box, setBox] = useState(false), [lit, setLit] = useState(false), [popped, setPopped] = useState([]), [secret, setSecret] = useState(false);
  const allPopped = popped.length === gifts.balloons.length;
  const count = (box ? 1 : 0) + (lit ? 1 : 0) + (allPopped ? 1 : 0);
  const pop = (i) => { if (popped.includes(i)) return; const n = [...popped, i]; setPopped(n); if (n.length === gifts.balloons.length) celebrate(); };
  const phrase = gifts.balloons.filter((_, i) => popped.includes(i)).join(" ");
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
      <header className="text-center"><p className="label">Chapter five</p><h2 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold italic leading-none"><span className="gold-text">The Gift Table</span></h2>
        <p className="mx-auto mt-2 max-w-md font-sans text-sm text-mist">Three gifts, three different surprises. Opened: {count} of 3.</p></header>
      <div className="grid w-full gap-4 md:grid-cols-3">
        <Station title="The Ribbon Box" hint="Tap the box to untie the ribbon" done={box} text={box ? gifts.box : ""}><BoxGift open={box} onOpen={() => { if (!box) { setBox(true); celebrate(); } }} /></Station>
        <Station title="The Balloon Bunch" hint={`Pop all five balloons: ${popped.length} of 5`} done={allPopped} text={popped.length ? phrase : ""}><Balloons popped={popped} onPop={pop} /></Station>
        <Station title="The Wish Lantern" hint="Tap the lantern to light it" done={lit} text={lit ? gifts.lantern : ""}><LanternGift lit={lit} onLight={() => { if (!lit) { setLit(true); celebrate(); } }} /></Station>
      </div>
      <div className="flex min-h-[3.5rem] items-center gap-3">
        <motion.button type="button" onClick={() => { if (!secret) celebrate(); setSecret(true); }} aria-label="A tiny glowing firefly. Tap to find a hidden message." className="relative grid h-11 w-11 place-items-center" animate={{ x: [0, 40, -20, 0], y: [0, -14, 6, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          <span className="block h-3 w-3 rounded-full bg-[#fff1a8] shadow-[0_0_18px_8px_rgba(255,226,120,.7)] twinkle" /></motion.button>
        <AnimatePresence>{secret && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-sm text-left font-script text-2xl text-cream">{secretMessage}</motion.p>}</AnimatePresence>
      </div>
      <button type="button" className="btn" onClick={onDone}>{count === 3 ? "Receive your letter" : "Continue to your letter"}</button>
    </div>);
}
