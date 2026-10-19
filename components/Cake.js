"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CakeArt, { CANDLE_X, FLAME_Y, candleBase, Smoke } from "./CakeArt";

function Peony({ x, y, r, c1, c2 }) {
  return (<g transform={`translate(${x} ${y})`}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <ellipse key={a} cx="0" cy={-r * 0.7} rx={r * 0.5} ry={r * 0.78} fill={c2} transform={`rotate(${a})`} />)}
    {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => <ellipse key={a} cx="0" cy={-r * 0.45} rx={r * 0.4} ry={r * 0.55} fill={c1} transform={`rotate(${a})`} />)}
    <circle r={r * 0.22} fill="#f2c46d" />
  </g>);
}
function Vase() {
  return (<svg viewBox="0 0 220 360" className="h-full w-full" aria-hidden="true">
    <defs><linearGradient id="vg" x1="0" x2="1"><stop offset="0" stopColor="#bfe9dc" stopOpacity=".7" /><stop offset=".5" stopColor="#6fb8a2" stopOpacity=".5" /><stop offset="1" stopColor="#2c6b5a" stopOpacity=".8" /></linearGradient></defs>
    <g stroke="#2f7a55" strokeWidth="4" fill="none"><path d="M110 250C90 190 60 150 52 118" /><path d="M110 250C112 190 112 140 110 84" /><path d="M110 250C130 190 160 150 170 112" /><path d="M105 250C70 220 40 200 30 180" /></g>
    {[[70, 190, -30], [150, 180, 30], [92, 150, -15], [130, 140, 20]].map(([x, y, r], i) => <path key={i} d="M0 0C10-14 30-14 40 0C30 14 10 14 0 0Z" fill="#2f7a55" transform={`translate(${x} ${y}) rotate(${r + 200})`} />)}
    <Peony x={52} y={116} r={30} c1="#ffd2da" c2="#ff9fb4" /><Peony x={110} y={80} r={36} c1="#fff3e0" c2="#ffd0c4" /><Peony x={170} y={112} r={28} c1="#ffd2da" c2="#ff8fa8" /><Peony x={30} y={178} r={20} c1="#fff3e0" c2="#ffc3cf" />
    <path d="M70 250h80c26 14 42 50 34 96H36c-8-46 8-82 34-96z" fill="url(#vg)" stroke="#bfe9dc" strokeOpacity=".6" /><path d="M64 286c4 18 4 40 0 56" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>);
}
function Lantern({ glow }) {
  return (<svg viewBox="0 0 140 260" className="h-full w-full" aria-hidden="true">
    <defs><radialGradient id="lg"><stop offset="0" stopColor="#ffd27a" stopOpacity={0.9 * glow} /><stop offset="1" stopColor="#ff9a3a" stopOpacity="0" /></radialGradient></defs>
    <path d="M70 6v26M44 40h52l-8-14H52z" stroke="#c9a04a" strokeWidth="5" fill="#c9a04a" /><circle cx="70" cy="140" r="90" fill="url(#lg)" />
    <rect x="34" y="40" width="72" height="170" rx="8" fill="#ffe2a8" fillOpacity={0.12 + glow * 0.25} stroke="#c9a04a" strokeWidth="5" /><path d="M70 40v170M34 125h72" stroke="#c9a04a" strokeWidth="3" />
    <rect x="62" y="150" width="16" height="50" rx="3" fill="#fff3e0" /><path d="M70 150v-6" stroke="#333" strokeWidth="2" /><ellipse cx="70" cy="132" rx="7" ry="14" fill="#ffcf6a" opacity={glow} /><rect x="28" y="210" width="84" height="14" rx="4" fill="#c9a04a" />
  </svg>);
}
export default function Cake({ celebrate, onDone }) {
  const [lit, setLit] = useState([true, true, true, true, true]);
  const [stage, setStage] = useState("idle");
  const [mic, setMic] = useState("idle");
  const stop = useRef(null), timer = useRef(null);
  const left = lit.filter(Boolean).length, cut = stage === "cut";
  useEffect(() => () => { stop.current && stop.current(); clearTimeout(timer.current); }, []);
  const out = (arr) => { setLit(arr); if (arr.every((v) => !v)) celebrate(); };
  const blowAll = () => { if (!left) return; stop.current && stop.current(); setMic("idle"); out([false, false, false, false, false]); };
  const blowOne = (i) => out(lit.map((v, j) => (j === i ? false : v)));
  const listen = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { setMic("unsupported"); return; }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 512; ctx.createMediaStreamSource(s).connect(an);
      const buf = new Uint8Array(an.fftSize); let loud = 0, raf = 0, on = true;
      const end = () => { on = false; cancelAnimationFrame(raf); s.getTracks().forEach((t) => t.stop()); ctx.close(); stop.current = null; };
      stop.current = end; setMic("listening");
      const tick = () => { if (!on) return; an.getByteTimeDomainData(buf); let sum = 0; for (const v of buf) { const d = (v - 128) / 128; sum += d * d; }
        loud = Math.sqrt(sum / buf.length) > 0.22 ? loud + 1 : Math.max(0, loud - 1);
        if (loud > 6) { end(); setMic("idle"); out([false, false, false, false, false]); return; } raf = requestAnimationFrame(tick); };
      tick();
    } catch (e) { setMic("denied"); }
  };
  const doCut = () => { setStage("knife"); timer.current = setTimeout(() => { setStage("cut"); celebrate(); }, 1100); };
  const micMsg = { idle: "", listening: "Listening… blow gently toward your microphone.", denied: "Microphone access was not allowed. No problem, tap the flames or the button instead.", unsupported: "A microphone is not available here. Tap the flames instead." }[mic];
  const glow = left / 5;
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
      <div className="mb-2 text-center">
        <p className="label">Chapter three</p>
        <h2 className="font-display text-4xl font-extrabold italic leading-none sm:text-6xl"><span className="gold-text">{cut ? "Happy Birthday, Insha" : left === 0 ? "Every candle is out" : "Make a wish"}</span></h2>
        <p className="mx-auto mt-2 max-w-md font-sans text-sm text-mist">{cut ? "The cake is cut. The first slice is yours." : left === 0 ? "A beautiful wish. Now, the knife." : "Tap a flame, use the button, or blow toward your microphone."}</p>
      </div>
      <div className="relative flex w-full items-end justify-center gap-2">
        <div className="hidden h-[min(52svh,330px)] w-[170px] shrink-0 translate-y-4 md:block"><Vase /></div>
        <div className="relative" style={{ width: "min(94vw,620px,calc(56svh*1.0833))", aspectRatio: "520/480" }}>
          <motion.div aria-hidden="true" className="pointer-events-none absolute -inset-[25%] rounded-full" animate={{ opacity: 0.2 + glow * 0.8, scale: 0.9 + glow * 0.15 }} transition={{ duration: 1.2 }} style={{ background: "radial-gradient(circle,rgba(255,200,110,.6),rgba(255,140,60,.15) 45%,transparent 70%)" }} />
          <div className="absolute inset-0"><CakeArt cut={cut} gap={cut ? 34 : 0} /></div>
          <svg viewBox="0 0 520 480" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs><linearGradient id="fo" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ff7a1a" /><stop offset=".6" stopColor="#ffb340" /><stop offset="1" stopColor="#ffe8a0" /></linearGradient><linearGradient id="blade" x1="0" x2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#9aa4a8" /></linearGradient></defs>
            <AnimatePresence>{CANDLE_X.map((x, i) => lit[i] && !cut && (
              <motion.g key={x} exit={{ opacity: 0, scale: 0.2, y: -8 }} transition={{ duration: 0.35 }} style={{ transformOrigin: `${x}px ${FLAME_Y(x) + 10}px` }}>
                <circle cx={x} cy={FLAME_Y(x)} r="34" fill="url(#halo)" opacity=".7" />
                <motion.g animate={{ scaleY: [1, 1.14, 0.95, 1.08, 1], skewX: [0, 3, -3, 2, 0] }} transition={{ duration: 0.7 + i * 0.05, repeat: Infinity }} style={{ transformOrigin: `${x}px ${FLAME_Y(x) + 10}px` }}>
                  <path transform={`translate(${x} ${FLAME_Y(x)})`} d="M0-24C11-10 9 2 0 8C-9 2-11-10 0-24Z" fill="url(#fo)" /><path transform={`translate(${x} ${FLAME_Y(x) + 2})`} d="M0-11C5-4 4 3 0 6C-4 3-5-4 0-11Z" fill="#fff8dc" /><circle cx={x} cy={FLAME_Y(x) + 8} r="2.5" fill="#6aa8ff" opacity=".8" /></motion.g>
              </motion.g>))}</AnimatePresence>
            {CANDLE_X.map((x, i) => !lit[i] && !cut && (<motion.g key={"s" + x} initial={{ opacity: 0.8, y: 0 }} animate={{ opacity: 0, y: -26 }} transition={{ duration: 2.4 }}><g transform={`translate(${x} ${candleBase(x) - 60})`}><Smoke /></g></motion.g>))}
            <motion.g initial={false} animate={stage === "idle" ? { y: -230, opacity: 0 } : stage === "knife" ? { y: 250, opacity: 1 } : { y: -230, opacity: 0 }} transition={{ duration: stage === "knife" ? 1 : 0.7, ease: "easeInOut" }}>
              <g transform="translate(260 0)"><rect x="-9" y="-70" width="18" height="70" rx="6" fill="#3b2418" /><rect x="-12" y="-2" width="24" height="5" fill="url(#gold)" /><path d="M-7 5h14v130l-14 22z" fill="url(#blade)" /></g>
            </motion.g>
          </svg>
          {!cut && stage === "idle" && CANDLE_X.map((x, i) => lit[i] && (<button key={x} type="button" aria-label={`Blow out candle ${i + 1}`} onClick={() => blowOne(i)} className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${(x / 520) * 100}%`, top: `${(FLAME_Y(x) / 480) * 100}%` }} />))}
          <AnimatePresence>{cut && (<motion.div initial={{ opacity: 0, x: -140, y: -50, scale: 0.5, rotate: -20 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.35, delay: 0.5 }} className="absolute -right-4 bottom-0 w-[34%] sm:-right-10" aria-hidden="true">
            <svg viewBox="0 0 200 130"><ellipse cx="100" cy="106" rx="94" ry="20" fill="#fff8ea" stroke="#e0a843" strokeWidth="3" /><path d="M40 60L150 56L160 100L48 104Z" fill="#f7dfae" /><path d="M40 78L152 74M44 92L156 88" stroke="#c63d5a" strokeWidth="6" /><path d="M40 60L150 56L128 30L58 36Z" fill="#ffd3d6" /><path d="M150 56L160 100L128 30Z" fill="#e9919f" opacity=".7" /><circle cx="96" cy="38" r="9" fill="#ff7d94" /></svg></motion.div>)}</AnimatePresence>
        </div>
        <div className="hidden h-[min(46svh,290px)] w-[120px] shrink-0 md:block"><Lantern glow={0.35 + glow * 0.65} /></div>
      </div>
      <div className="relative -mt-3 h-10 w-[min(96vw,980px)] rounded-[50%] opacity-80" style={{ background: "radial-gradient(ellipse,rgba(0,0,0,.6),transparent 70%)" }} aria-hidden="true" />
      <div className="glass relative z-10 mt-1 flex flex-wrap items-center justify-center gap-3 px-5 py-3">
        {!cut && left > 0 && <button type="button" className="btn" onClick={blowAll}>Blow out the candles</button>}
        {!cut && left > 0 && mic !== "listening" && <button type="button" className="btn btn-ghost" onClick={listen}>Use my microphone</button>}
        {!cut && left === 0 && stage === "idle" && <button type="button" className="btn" onClick={doCut}>Cut the cake</button>}
        {stage === "knife" && <span className="font-sans text-sm text-mist" role="status">Slicing…</span>}
        {cut && <button type="button" className="btn" onClick={onDone}>See the memories</button>}
      </div>
      <p role="status" className="mt-2 min-h-[1.25rem] max-w-md text-center font-sans text-xs text-mist">{micMsg}</p>
    </div>);
}
