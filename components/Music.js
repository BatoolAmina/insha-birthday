"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { musicSrc } from "@/lib/content";
const Music = forwardRef(function Music(_, ref) {
  const a = useRef(null);
  const [status, setStatus] = useState("idle");
  const [vol, setVol] = useState(1);
  const play = async () => {
    const el = a.current; if (!el) return;
    el.volume = vol;
    try { await el.play(); setStatus("playing"); }
    catch (e) { setStatus(e && e.name === "NotAllowedError" ? "blocked" : "missing"); }
  };
  const pause = () => { a.current?.pause(); setStatus("paused"); };
  useImperativeHandle(ref, () => ({ play }));
  const msg = { idle: "Use your device volume buttons", playing: "Use your device volume buttons", paused: "Music is paused", blocked: "Tap play to start the music", missing: "Music file not added yet (public/audio/birthday.mp3)" }[status];
  return (
    <div className="fixed right-3 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full glass px-3 py-2" role="group" aria-label="Music controls">
      <audio ref={a} src={musicSrc} loop preload="none" onError={() => setStatus("missing")} />
      <button type="button" onClick={status === "playing" ? pause : play} aria-label={status === "playing" ? "Pause music" : "Play music"} className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink">
        {status === "playing" ? <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" /><rect x="9.5" y="2" width="3.5" height="12" /></svg> : <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z" /></svg>}
      </button>
      <label className="flex items-center gap-2 font-sans text-xs text-mist"><span className="sr-only">Volume</span>
        <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => { const v = +e.target.value; setVol(v); if (a.current) a.current.volume = v; }} className="w-16 sm:w-24" aria-label="Volume" /></label>
      <span role="status" className="hidden max-w-[16rem] font-sans text-xs text-mist sm:inline">{msg}</span>
    </div>
  );
});
export default Music;
