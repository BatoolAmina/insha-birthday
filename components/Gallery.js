"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { photos, videos } from "@/lib/content";

const layout = [
  "col-span-2 row-span-2 md:col-span-5 md:row-span-2 aspect-[4/5] -rotate-2",
  "col-span-1 md:col-span-3 aspect-square rotate-2 md:mt-10",
  "col-span-1 md:col-span-4 aspect-[3/4] -rotate-1",
  "col-span-1 md:col-span-3 aspect-[3/4] rotate-1 md:-mt-6",
  "col-span-2 md:col-span-5 aspect-[16/10] -rotate-1",
  "col-span-1 md:col-span-4 aspect-square rotate-2",
];
function Placeholder({ label }) {
  return (<div className="absolute inset-0 grid place-items-center bg-[#f6ecd6] p-4 text-center text-[#6b4f1d]">
    <svg viewBox="0 0 120 120" className="absolute h-3/4 w-3/4 opacity-25" aria-hidden="true"><g fill="none" stroke="#6b4f1d" strokeWidth="1.4"><path d="M60 110V50" />{[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="60" cy="30" rx="9" ry="17" transform={`rotate(${a} 60 46)`} />)}<circle cx="60" cy="46" r="6" /><path d="M60 90c-16-2-26-12-28-24 14 0 24 8 28 24zM60 80c14-2 24-10 28-22-14 0-24 8-28 22z" /></g></svg>
    <span className="relative font-sans text-xs tracking-wide">{label}<br /><span className="opacity-70">Your photo will bloom here</span></span></div>);
}
function Frame({ p, i, onOpen }) {
  const [ok, setOk] = useState(false);
  return (
    <motion.button type="button" onClick={() => onOpen(i)} aria-label={`Open ${p.caption} full size`} className={`group relative block bg-cream p-2 pb-8 shadow-[0_18px_40px_rgba(0,0,0,.5)] sm:p-3 sm:pb-10 ${layout[i % layout.length]}`}
      initial={{ opacity: 0, y: 60, rotate: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay: (i % 3) * 0.1 }} whileHover={{ y: -8, scale: 1.02, zIndex: 5 }}>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-[#f2c46d]/70" />
      <span className="relative block h-full w-full overflow-hidden"><Placeholder label={p.caption} />
        <img src={p.src} alt={p.alt} loading="lazy" onLoad={() => setOk(true)} onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105" style={{ opacity: ok ? 1 : 0 }} /></span>
      <span className="absolute bottom-1.5 left-3 right-3 flex justify-between font-script text-lg leading-none text-[#6b4f1d] sm:bottom-2 sm:text-2xl"><span>No. {String(i + 1).padStart(2, "0")}</span><span className="font-sans text-[10px] uppercase tracking-widest opacity-60">{p.caption}</span></span>
    </motion.button>);
}
function Screening() {
  const [v, setV] = useState(0);
  const [ok, setOk] = useState({});
  const cur = videos[v];
  return (
    <section aria-label="Screening room" className="mt-14 w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="label">The Screening Room</p><h3 className="font-display text-3xl font-extrabold italic sm:text-5xl">Moving moments</h3></div>
        <div role="tablist" aria-label="Choose a video" className="flex gap-2">{videos.map((x, i) => (<button key={x.src} role="tab" type="button" aria-selected={v === i} onClick={() => setV(i)} className={`btn ${v === i ? "" : "btn-ghost"}`} style={{ minHeight: 40, padding: "0 18px" }}>Reel {i + 1}</button>))}</div></div>
      <div className="relative overflow-hidden rounded-sm border border-gold/40 bg-black shadow-[0_30px_80px_rgba(0,0,0,.6)]">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-[6%] bg-gradient-to-r from-[#5a0f1f] to-transparent" /><div aria-hidden="true" className="absolute inset-y-0 right-0 z-10 w-[6%] bg-gradient-to-l from-[#5a0f1f] to-transparent" />
        <div className="relative aspect-video">
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle,#2a1a10,#0a0605)] text-center"><div><svg viewBox="0 0 60 60" className="mx-auto h-16 w-16" aria-hidden="true"><circle cx="30" cy="30" r="27" fill="none" stroke="#f2c46d" strokeWidth="2" /><path d="M24 18l20 12-20 12z" fill="#f2c46d" /></svg><p className="mt-2 font-sans text-xs text-mist">{cur.caption}<br />Your video will play here</p></div></div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video key={cur.src} src={cur.src} controls preload="metadata" playsInline onLoadedMetadata={() => setOk((o) => ({ ...o, [cur.src]: true }))} onError={() => setOk((o) => ({ ...o, [cur.src]: false }))} aria-label={cur.caption} className="absolute inset-0 h-full w-full bg-black object-contain" style={{ opacity: ok[cur.src] ? 1 : 0, pointerEvents: ok[cur.src] ? "auto" : "none" }} />
        </div>
        <div aria-hidden="true" className="flex justify-between px-3 py-1.5">{Array.from({ length: 26 }, (_, i) => <span key={i} className="h-2 w-3 rounded-[2px] bg-[#2b1c12]" />)}</div>
      </div>
    </section>);
}
export default function Gallery() {
  const [open, setOpen] = useState(null);
  const [broken, setBroken] = useState({});
  const closeRef = useRef(null);
  useEffect(() => {
    if (open === null) return;
    closeRef.current && closeRef.current.focus();
    const k = (e) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") setOpen((o) => (o + 1) % photos.length); if (e.key === "ArrowLeft") setOpen((o) => (o - 1 + photos.length) % photos.length); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);
  const cur = open === null ? null : photos[open];
  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="label">Chapter four</p><h2 className="font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold italic leading-[.9]"><span className="gold-text">Moments</span></h2></div>
        <p className="max-w-xs font-serif text-lg italic text-mist">A gallery pinned up in the garden. Tap any frame to see it full size.</p></header>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-12 md:gap-x-6">{photos.map((p, i) => <Frame key={p.src} p={p} i={i} onOpen={setOpen} />)}</div>
      <Screening />
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {cur && <motion.div role="dialog" aria-modal="true" aria-label={cur.caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/90 px-3 pb-20 pt-16 md:gap-0 md:p-4" onClick={() => setOpen(null)}>
          <motion.div initial={{ scale: 0.9, rotate: -2 }} animate={{ scale: 1, rotate: 0 }} className="relative aspect-[4/5] max-h-[62svh] w-full max-w-[min(76vw,340px)] shrink-0 overflow-hidden bg-cream p-2 sm:p-3 md:max-h-[78vh] md:max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-full w-full overflow-hidden"><Placeholder label={cur.caption} />{!broken[cur.src] && <img src={cur.src} alt={cur.alt} onError={() => setBroken((b) => ({ ...b, [cur.src]: true }))} className="absolute inset-0 h-full w-full object-contain bg-cream" />}</div></motion.div>
          <button ref={closeRef} type="button" className="btn !absolute right-3 top-3 min-h-11 px-4 text-xs md:right-4 md:top-4" onClick={(e) => { e.stopPropagation(); setOpen(null); }} aria-label="Close photo">Close</button>
          <div className="flex shrink-0 items-center gap-3 md:contents">
            <button type="button" className="btn btn-ghost min-h-11 px-5 text-xs md:!absolute md:left-3 md:top-1/2" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }}>Prev</button>
            <span className="font-sans text-xs tracking-[.2em] text-cream/70 md:hidden">{String(open + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
            <button type="button" className="btn btn-ghost min-h-11 px-5 text-xs md:!absolute md:right-3 md:top-1/2" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }}>Next</button>
          </div>
          </motion.div>}
        </AnimatePresence>,
        document.body
      )}
    </div>);
}
