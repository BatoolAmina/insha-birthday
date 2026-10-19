"use client";
export const TIERS = [
  { cx: 260, rx: 172, ry: 32, top: 340, bot: 424, from: "#ffd3d6", to: "#f1a9b3" },
  { cx: 260, rx: 126, ry: 24, top: 265, bot: 340, from: "#fff6e8", to: "#f3d8b8" },
  { cx: 260, rx: 86, ry: 17, top: 200, bot: 265, from: "#ffc6c9", to: "#e9919f" },
];
export const CANDLE_X = [204, 232, 260, 288, 316];
export const candleBase = (x) => 200 + Math.pow((x - 260) / 86, 2) * 9;
export const FLAME_Y = (x) => candleBase(x) - 56 - 12;

const rim = (t, x) => t.top + t.ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - t.cx) / t.rx, 2)));
function dripPath(t, i) {
  const n = Math.round(t.rx / 11), x0 = t.cx - t.rx, w = (t.rx * 2) / n;
  let top = `M${x0} ${t.top}`;
  for (let j = 1; j <= n; j++) top += ` L${x0 + j * w} ${rim(t, x0 + j * w).toFixed(1)}`;
  let d = top;
  for (let j = n - 1; j >= 0; j--) {
    const xa = x0 + (j + 1) * w, xb = x0 + j * w, len = 7 + ((j * 37 + i * 11) % 6) * 6, ya = rim(t, xa) + 5, yb = rim(t, xb) + 5;
    d += ` L${xa} ${ya.toFixed(1)} C${xa} ${(ya + len).toFixed(1)} ${xb} ${(yb + len).toFixed(1)} ${xb} ${yb.toFixed(1)}`;
  }
  return d + " Z";
}
function Rose({ x, y, r, a = "#ff7d94", b = "#d94b6a" }) {
  return (<g transform={`translate(${x} ${y})`}>
    <ellipse cx="0" cy={r * 0.2} rx={r * 1.05} ry={r * 0.5} fill="#000" opacity=".18" />
    <circle r={r} fill={b} /><circle r={r * 0.82} fill={a} />
    <path d={`M${-r * 0.55} 0A${r * 0.55} ${r * 0.55} 0 1 1 0 ${-r * 0.55}A${r * 0.38} ${r * 0.38} 0 1 1 ${r * 0.25} 0A${r * 0.22} ${r * 0.22} 0 1 1 0 ${r * 0.15}`} fill="none" stroke={b} strokeWidth={r * 0.14} strokeLinecap="round" />
    <path d={`M${-r * 0.8} ${-r * 0.25}A${r * 0.9} ${r * 0.9} 0 0 1 ${r * 0.2} ${-r * 0.8}`} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth={r * 0.12} strokeLinecap="round" />
  </g>);
}
function Leaf({ x, y, r, rot }) { return <path d="M0 0C10-14 30-14 40 0C30 14 10 14 0 0Z" fill="#2f7a55" stroke="#1d5a3c" transform={`translate(${x} ${y}) rotate(${rot}) scale(${r})`} />; }
function Berry({ x, y, r = 8 }) { return (<g><circle cx={x} cy={y} r={r} fill="url(#berry)" /><circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.25} fill="#fff" opacity=".7" /></g>); }

function Defs() {
  return (<defs>
    {TIERS.map((t, i) => <linearGradient key={i} id={`sp${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t.from} /><stop offset="1" stopColor={t.to} /></linearGradient>)}
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset=".35" stopColor="#fff" stopOpacity="0" /><stop offset=".75" stopColor="#4a1a2a" stopOpacity=".12" /><stop offset="1" stopColor="#4a1a2a" stopOpacity=".42" /></linearGradient>
    <radialGradient id="frost" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#fffdf8" /><stop offset="1" stopColor="#ffe6df" /></radialGradient>
    <radialGradient id="pipe" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#f6cfd0" /></radialGradient>
    <radialGradient id="berry" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#ff6b8e" /><stop offset="1" stopColor="#8c1738" /></radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset=".5" stopColor="#e0a843" /><stop offset="1" stopColor="#fff0b8" /></linearGradient>
    <linearGradient id="candle" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#f4e3c2" /><stop offset="1" stopColor="#c9a46a" /></linearGradient>
    <pattern id="stripe" width="8" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)"><rect width="8" height="5" fill="#e9b0b8" /></pattern>
    <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff8ea" /><stop offset="1" stopColor="#d9c39a" /></linearGradient>
    <radialGradient id="halo"><stop offset="0" stopColor="#ffd27a" stopOpacity=".9" /><stop offset="1" stopColor="#ff9a3a" stopOpacity="0" /></radialGradient>
  </defs>);
}
function Body() {
  return (<g>
    <ellipse cx="260" cy="446" rx="232" ry="40" fill="#000" opacity=".28" />
    <ellipse cx="260" cy="436" rx="222" ry="38" fill="url(#plate)" /><ellipse cx="260" cy="434" rx="222" ry="38" fill="none" stroke="url(#gold)" strokeWidth="4" /><ellipse cx="260" cy="432" rx="188" ry="30" fill="none" stroke="#c9a46a" strokeOpacity=".5" />
    {TIERS.map((t, i) => (<g key={i}>
      <path d={`M${t.cx - t.rx} ${t.top}V${t.bot}A${t.rx} ${t.ry} 0 0 0 ${t.cx + t.rx} ${t.bot}V${t.top}Z`} fill={`url(#sp${i})`} />
      <path d={`M${t.cx - t.rx} ${t.top}V${t.bot}A${t.rx} ${t.ry} 0 0 0 ${t.cx + t.rx} ${t.bot}V${t.top}Z`} fill="url(#shade)" />
      <ellipse cx={t.cx} cy={t.top} rx={t.rx} ry={t.ry} fill="url(#frost)" />
      <ellipse cx={t.cx - t.rx * 0.2} cy={t.top - t.ry * 0.2} rx={t.rx * 0.55} ry={t.ry * 0.35} fill="#fff" opacity=".5" />
      <path d={dripPath(t, i)} fill="url(#frost)" /><path d={dripPath(t, i)} fill="url(#shade)" opacity=".7" />
      {Array.from({ length: Math.round(t.rx / 10) + 1 }, (_, j) => { const a = (j / Math.round(t.rx / 10)) * Math.PI; return <circle key={j} cx={t.cx + t.rx * Math.cos(a) * 0.985} cy={t.bot + t.ry * Math.sin(a) - 4} r="7.5" fill="url(#pipe)" stroke="#e8b9bb" strokeWidth=".6" />; })}
      {Array.from({ length: 9 }, (_, j) => { const a = ((j + 0.5) / 9) * Math.PI; return <circle key={"g" + j} cx={t.cx + t.rx * Math.cos(a) * 0.9} cy={t.bot - 18 + t.ry * Math.sin(a) * 0.8} r="2.4" fill="url(#gold)" />; })}
    </g>))}
    {[[120, 345], [380, 346]].map(([x, y], k) => (<g key={k}><Leaf x={x - 20} y={y + 4} r={0.9} rot={k ? 20 : 160} /><Leaf x={x + 4} y={y + 8} r={0.8} rot={k ? -30 : 210} /><Berry x={x + (k ? 28 : -28)} y={y + 10} /><Berry x={x + (k ? 40 : -40)} y={y + 2} r={6} /><Rose x={x} y={y} r={19} /><Rose x={x + (k ? 22 : -22)} y={y - 12} r={12} a="#ffe2dc" b="#e59aa5" /></g>))}
    <Leaf x={142} y={282} r={0.8} rot={170} /><Rose x={150} y={282} r={14} a="#fff0e6" b="#e8a7a0" /><Leaf x={358} y={282} r={0.8} rot={10} /><Rose x={370} y={282} r={14} a="#fff0e6" b="#e8a7a0" /><Berry x={380} y={294} r={6} /><Berry x={140} y={294} r={6} />
    <path d="M172 222l6-4M200 214l4 6M330 220l5-5M300 218l-3 6" stroke="url(#gold)" strokeWidth="3" strokeLinecap="round" />
    {CANDLE_X.map((x) => { const b = candleBase(x); return (<g key={x}><ellipse cx={x} cy={b + 1} rx="6" ry="2.5" fill="#000" opacity=".2" /><rect x={x - 3.5} y={b - 56} width="7" height="56" rx="2" fill="url(#candle)" /><rect x={x - 3.5} y={b - 56} width="7" height="56" rx="2" fill="url(#stripe)" /><path d={`M${x} ${b - 56}v-6`} stroke="#3a2a20" strokeWidth="1.4" /><path d={`M${x - 3.5} ${b - 56}q3.5 7 7 0`} fill="#fff" opacity=".8" /></g>); })}
  </g>);
}
function Interior() {
  const bands = [];
  TIERS.forEach((t, i) => { const h = t.bot - t.top - (i === 2 ? 0 : 0); const n = 3; for (let k = 0; k < n; k++) { const y = t.top + (h / n) * k; bands.push(<rect key={`s${i}${k}`} x="224" y={y} width="72" height={h / n} fill={k % 2 ? "#f1d28f" : "#f7dfae"} />, <rect key={`c${i}${k}`} x="224" y={y + h / n - 6} width="72" height="6" fill={i === 1 ? "#fffaf0" : "#c63d5a"} />); } });
  return <g>{bands}<rect x="224" y="200" width="72" height="224" fill="url(#shade)" opacity=".6" /></g>;
}
export function Smoke() {
  return <path d="M0 0C7-12-7-22 0-34S7-52 0-66" stroke="#fff" strokeOpacity=".55" strokeWidth="3" fill="none" strokeLinecap="round" />;
}
export default function CakeArt({ cut, gap }) {
  return (<svg viewBox="0 0 520 480" className="h-full w-full" role="img" aria-label={cut ? "A three-tier birthday cake with roses and berries, cut in two" : "A three-tier birthday cake with drip frosting, roses, berries and five candles"}>
    <Defs />
    <g style={{ transition: "opacity .5s" }} opacity={cut ? 1 : 0}><Interior /></g>
    <g clipPath="url(#cL)" style={{ transform: `translateX(${-gap}px) rotate(${cut ? -1.5 : 0}deg)`, transformOrigin: "260px 430px", transition: "transform 1s cubic-bezier(.2,.8,.2,1)" }}><Body /></g>
    <g clipPath="url(#cR)" style={{ transform: `translateX(${gap}px) rotate(${cut ? 1.5 : 0}deg)`, transformOrigin: "260px 430px", transition: "transform 1s cubic-bezier(.2,.8,.2,1)" }}><Body /></g>
    <clipPath id="cL"><rect x="0" y="0" width="260" height="480" /></clipPath><clipPath id="cR"><rect x="260" y="0" width="260" height="480" /></clipPath>
  </svg>);
}
