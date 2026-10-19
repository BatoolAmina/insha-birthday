"use client";
import { motion, useTransform } from "framer-motion";
function Draw({ p, a, b, d, w = 0.6 }) { const len = useTransform(p, [a, b], [0, 1]); return <motion.path d={d} pathLength={len} fill="none" stroke="#B8975A" strokeWidth={w} strokeLinecap="round" /> }
const ring = r => `M${-r} 0a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
// Khatam-style eight-point star that is drawn line by line as the story advances.
export default function Star({ progress: p }) {
    return (<svg viewBox="-100 -100 200 200" className="w-full h-full" aria-hidden="true">
        <Draw p={p} a={0} b={.2} d={ring(92)} w={.4} /><Draw p={p} a={.1} b={.35} d="M-60-60H60V60H-60Z" />
        <Draw p={p} a={.25} b={.5} d="M0-85L85 0L0 85L-85 0Z" /><Draw p={p} a={.4} b={.65} d={ring(60)} w={.4} />
        <Draw p={p} a={.5} b={.8} d="M0-60L25-25L60 0L25 25L0 60L-25 25L-60 0L-25-25Z" w={.8} />
        <Draw p={p} a={.65} b={.9} d={ring(28)} /><Draw p={p} a={.75} b={1} d="M-92 0H92M0-92V92M-65-65L65 65M65-65L-65 65" w={.25} />
    </svg>)
}
