"use client";
import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const rnd = (seed) => { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
const LEAF = "M0 0C14-26 52-30 80 0C52 30 14 26 0 0Z";
const BALLOONS = [["#ff8fa8", 4], ["#f2c46d", 13], ["#9ad8c0", 24], ["#fff3e0", 36], ["#ff9f6b", 47], ["#c9a4ff", 58], ["#ff8fa8", 70], ["#f2c46d", 82], ["#9ad8c0", 92]];

function Layer({ cam, depth, children, className = "" }) {
  const x = useTransform(cam, [0, 6], ["0vw", `-${depth}vw`]);
  return <motion.div aria-hidden="true" style={{ x, width: "300vw" }} className={`absolute left-0 top-0 h-full ${className}`}>{children}</motion.div>;
}
function Leaves({ seed, n, y0, spread, c1, c2, sc = 1 }) {
  const items = useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, (_, i) => ({ x: r() * 3000, y: y0 + r() * spread, rot: -90 + r() * 180 + (i % 2) * 180, s: (0.6 + r() * 1.1) * sc, c: r() > 0.5 ? c1 : c2 })); }, [seed, n, y0, spread, c1, c2, sc]);
  return items.map((l, i) => (<path key={i} d={LEAF} fill={l.c} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />));
}
function Blooms({ seed, n }) {
  const items = useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => ({ x: r() * 3000, y: 560 + r() * 380, r: 9 + r() * 14, c: r() > 0.4 ? "#ffb8c6" : "#fff3e0" })); }, [seed, n]);
  return items.map((b, i) => (<g key={i} transform={`translate(${b.x} ${b.y})`}>{[0, 72, 144, 216, 288].map((a) => (<ellipse key={a} cx="0" cy={-b.r * 0.8} rx={b.r * 0.55} ry={b.r * 0.8} fill={b.c} opacity=".92" transform={`rotate(${a})`} />))}<circle r={b.r * 0.35} fill="#f2c46d" /></g>));
}
function Swags() {
  const bulbs = [];
  for (let k = 0; k < 6; k++) for (let j = 1; j < 10; j++) { const t = j / 10, x0 = k * 500, x1 = x0 + 500, y = (1 - t) * (1 - t) * 40 + 2 * t * (1 - t) * 190 + t * t * 40; bulbs.push({ x: x0 + (x1 - x0) * t, y, d: ((k * 9 + j) % 7) * 0.45 }); }
  return (<svg viewBox="0 0 3000 300" className="h-[30%] w-full" preserveAspectRatio="none">
    <defs><radialGradient id="bulb"><stop offset="0" stopColor="#ffe9b0" stopOpacity=".95" /><stop offset="1" stopColor="#ffb347" stopOpacity="0" /></radialGradient></defs>
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${k * 500} 40 Q${k * 500 + 250} 340 ${k * 500 + 500} 40`} stroke="#1c1208" strokeWidth="3" fill="none" />)}
    {bulbs.map((b, i) => (<g key={i} className="twinkle" style={{ animationDelay: `${b.d}s` }}><circle cx={b.x} cy={b.y + 6} r="26" fill="url(#bulb)" /><circle cx={b.x} cy={b.y + 6} r="6" fill="#fff1c4" /></g>))}
  </svg>);
}
function Arches() {
  return (<svg viewBox="0 0 3000 1000" preserveAspectRatio="xMinYMax slice" className="h-full w-full">
    <defs><linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".85" /><stop offset="1" stopColor="#8a4a22" stopOpacity=".5" /></linearGradient>
      <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".22" /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></linearGradient></defs>
    {[0, 1, 2, 3].map((i) => {
      const x = 380 + i * 760; return (<g key={i}>
        <polygon points={`${x - 150},300 ${x + 150},300 ${x + 330},1000 ${x - 330},1000`} fill="url(#shaft)" />
        <path d={`M${x - 150} 760V300A150 150 0 0 1 ${x + 150} 300V760Z`} fill="url(#glass)" stroke="#2a1a0c" strokeWidth="10" />
        <path d={`M${x} 150V760M${x - 150} 380H${x + 150}M${x - 150} 540H${x + 150}`} stroke="#2a1a0c" strokeWidth="6" />
        <path d={`M${x - 150} 300A150 150 0 0 1 ${x + 150} 300`} stroke="#2a1a0c" strokeWidth="6" fill="none" /></g>);
    })}
  </svg>);
}
export default function Scenery({ scene }) {
  const raw = useMotionValue(0), cam = useSpring(raw, { stiffness: 28, damping: 18 });
  const px = useMotionValue(0), py = useMotionValue(0), sx = useSpring(px, { stiffness: 40, damping: 20 }), sy = useSpring(py, { stiffness: 40, damping: 20 });
  useEffect(() => { raw.set(scene); }, [scene, raw]);
  useEffect(() => { const m = (e) => { px.set((e.clientX / window.innerWidth - 0.5) * -26); py.set((e.clientY / window.innerHeight - 0.5) * -16); }; window.addEventListener("pointermove", m); return () => window.removeEventListener("pointermove", m); }, [px, py]);
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ l: (i * 53) % 100, d: -((i * 1.7) % 16), t: 14 + (i % 6) * 3, s: 8 + (i % 4) * 4, c: i % 3 ? "#ffb8c6" : "#fff3e0" })), []);
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="absolute inset-0" style={{ background: "linear-gradient(#0b2a22 0%,#07170f 60%,#050d09 100%)" }} />
      <motion.div style={{ x: useTransform(cam, [0, 6], ["0vw", "-18vw"]) }} className="absolute -top-[10%] left-[35%] h-[70vmin] w-[70vmin] rounded-full" ><div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle,rgba(255,214,150,.55) 0%,rgba(255,170,90,.18) 40%,transparent 68%)" }} /></motion.div>
      <motion.div style={{ x: sx, y: sy }} className="absolute -inset-10">
        <Layer cam={cam} depth={30}><svg viewBox="0 0 3000 1000" preserveAspectRatio="xMinYMax slice" className="h-full w-full"><path d="M0 700C300 560 600 660 900 600S1500 520 1800 620 2400 560 3000 640V1000H0Z" fill="#0a241b" /><Leaves seed={3} n={60} y0={600} spread={300} c1="#0b2b20" c2="#0d3326" sc={1.6} /></svg></Layer>
        <Layer cam={cam} depth={42}><Arches /></Layer>
        <Layer cam={cam} depth={58}><svg viewBox="0 0 3000 1000" preserveAspectRatio="xMinYMax slice" className="h-full w-full"><Leaves seed={11} n={110} y0={560} spread={440} c1="#124a37" c2="#0f3d2e" sc={1.5} /><Blooms seed={5} n={34} /></svg></Layer>
        <Layer cam={cam} depth={50}><Swags /></Layer>
        <Layer cam={cam} depth={95}>{BALLOONS.map(([c, l], i) => (<div key={i} className="bob absolute" style={{ left: `${l}%`, bottom: `${18 + (i % 4) * 14}%`, animationDelay: `${-i * 1.3}s`, animationDuration: `${6 + (i % 3) * 1.5}s` }}>
          <svg width="74" height="150" viewBox="0 0 74 150"><defs><radialGradient id={`bl${i}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".85" /><stop offset=".25" stopColor={c} /><stop offset="1" stopColor={c} stopOpacity=".7" /></radialGradient></defs>
            <ellipse cx="37" cy="48" rx="32" ry="42" fill={`url(#bl${i})`} /><path d="M33 90l4 7 4-7z" fill={c} /><path d="M37 97C28 115 46 125 37 148" stroke="#fff3e0" strokeOpacity=".6" fill="none" /></svg></div>))}</Layer>
        <Layer cam={cam} depth={130}><svg viewBox="0 0 3000 1000" preserveAspectRatio="xMinYMax slice" className="sway h-full w-full"><Leaves seed={29} n={70} y0={820} spread={200} c1="#1b6a4c" c2="#0f3d2e" sc={2.4} /></svg></Layer>
      </motion.div>
      <div className="absolute inset-0">{petals.map((p, i) => (<span key={i} className="petal" style={{ left: `${p.l}%`, width: p.s, height: p.s, background: p.c, animationDuration: `${p.t}s`, animationDelay: `${p.d}s`, opacity: 0.8 }} />))}</div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(3,10,7,.2),transparent 24%,rgba(3,10,7,.26) 100%),radial-gradient(ellipse at 50% 45%,rgba(3,10,7,.18) 0%,rgba(3,10,7,.06) 42%,rgba(3,10,7,.62) 100%)" }} />
    </div>);
}
