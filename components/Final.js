"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import Star from "./Star";
const COLS = ["#f2c46d", "#ff8fa8", "#9ad8c0", "#c9a4ff", "#fff3e0"];
function Firework({ f }) {
  return (<div aria-hidden="true" className="pointer-events-none absolute" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
    {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return (<motion.span key={i} className="absolute block h-1.5 w-1.5 rounded-full" style={{ background: COLS[(i + f.c) % 5], boxShadow: `0 0 10px ${COLS[(i + f.c) % 5]}` }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * f.r, y: Math.sin(a) * f.r + 30, opacity: 0, scale: 0.3 }} transition={{ duration: 1.6, ease: "easeOut" }} />); })}</div>);
}
export default function Final({ celebrate, onReplay }) {
  const k = useMotionValue(0), ctl = useRef(null), [lit, setLit] = useState(false), reduce = useReducedMotion(), [fw, setFw] = useState([]);
  useMotionValueEvent(k, "change", (v) => { if (v >= 0.999 && !lit) { setLit(true); celebrate(); } });
  useEffect(() => {
    if (!lit || reduce) return;
    let n = 0; const id = setInterval(() => { n += 1; setFw((a) => [...a.slice(-5), { id: n, x: 8 + Math.random() * 84, y: 8 + Math.random() * 45, r: 70 + Math.random() * 80, c: n % 5 }]); }, 900);
    return () => clearInterval(id);
  }, [lit, reduce]);
  const hold = () => { if (lit) return; ctl.current?.stop(); ctl.current = animate(k, 1, { duration: reduce ? 0.01 : 2.4, ease: "easeInOut" }); };
  const release = () => { if (lit) return; ctl.current?.stop(); ctl.current = animate(k, 0, { duration: 1, ease: "easeOut" }); };
  const light = () => { ctl.current?.stop(); ctl.current = animate(k, 1, { duration: reduce ? 0.01 : 0.9 }); };
  const sc = useTransform(k, [0, 1], [0.6, 1]), gl = useTransform(k, [0, 1], [0, 1]);
  return (
    <div className="relative flex min-h-[78svh] w-full max-w-4xl flex-col items-center justify-center gap-6 text-center">
      <motion.div aria-hidden="true" style={{ scale: sc }} className="absolute h-[min(120vw,92svh)] w-[min(120vw,92svh)] opacity-60"><motion.div className="h-full w-full" animate={lit && !reduce ? { rotate: 360 } : {}} transition={{ duration: 160, ease: "linear", repeat: Infinity }}><Star progress={k} /></motion.div></motion.div>
      <motion.div aria-hidden="true" style={{ opacity: gl }} className="absolute h-[min(110vw,90svh)] w-[min(110vw,90svh)] rounded-full"><div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle,rgba(255,214,140,.55),rgba(255,170,90,.15) 45%,transparent 70%)" }} /></motion.div>
      <div className="pointer-events-none fixed inset-0 z-0">{fw.map((f) => <Firework key={f.id} f={f} />)}</div>
      {!lit ? (
        <div className="relative flex flex-col items-center gap-5">
          <p className="label">The last chapter</p>
          <button type="button" aria-label="Press and hold to light the lamp" className="noselect glass grid h-40 w-40 place-items-center rounded-full font-display text-xl italic" onPointerDown={hold} onPointerUp={release} onPointerLeave={release} onPointerCancel={release} onContextMenu={(e) => e.preventDefault()}
            onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); hold(); } }} onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") release(); }}>Light<br />the lamp</button>
          <p className="font-sans text-sm text-mist">Press and hold until the star is drawn.</p>
          <button type="button" className="btn btn-ghost" onClick={light}>Light it for me</button>
        </div>
      ) : (
        <motion.div className="relative z-10 flex flex-col items-center gap-5" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <p className="label">Today belongs to you</p>
          <h2 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] font-semibold italic leading-[.98]"><span className="gold-text">Happy Birthday</span><br /><span className="gold-text">Insha Fatima</span></h2>
          <p className="max-w-xl font-serif text-xl italic leading-relaxed text-cream sm:text-2xl">You walked through every door of this little garden, and each one was made with you in mind. May this year be gentle, bright and full of everything you hope for.</p>
          <p className="label">With love and warmest wishes</p>
          <button type="button" className="btn" onClick={onReplay}>Replay the celebration</button>
        </motion.div>)}
    </div>);
}
