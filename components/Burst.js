"use client";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
const cols = ["#f2c46d", "#ff8fa8", "#b58cff", "#7fe3d0", "#ffffff"];
export default function Burst({ k }) {
  const reduce = useReducedMotion();
  const bits = useMemo(() => Array.from({ length: 48 }, (_, i) => {
    const a = Math.random() * Math.PI * 2, v = 160 + Math.random() * 320;
    return { x: Math.cos(a) * v, y: Math.sin(a) * v - 120, r: Math.random() * 720 - 360, c: cols[i % 5], w: 6 + Math.random() * 6 };
  }), [k]);
  if (!k || reduce) return null;
  return (
    <div key={k} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 grid place-items-center overflow-hidden">
      {bits.map((b, i) => (
        <motion.span key={i} className="absolute rounded-sm" style={{ width: b.w, height: b.w * 1.6, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }} animate={{ x: b.x, y: b.y + 420, opacity: 0, rotate: b.r }} transition={{ duration: 2.4, ease: "easeOut" }} />
      ))}
    </div>
  );
}
