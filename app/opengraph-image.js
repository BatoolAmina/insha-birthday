import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 }; export const contentType = "image/png"; export const alt = "Happy Birthday, Insha Fatima";
export default function Image() {
    return new ImageResponse((
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle,#3a1c4f 0%,#170c26 60%,#0b0614 100%)", color: "#fdf3e3" }}>
            <svg width="170" height="170" viewBox="-100 -100 200 200"><g fill="none" stroke="#f2c46d" strokeWidth="3" strokeLinejoin="round"><path d="M-60-60H60V60H-60Z" /><path d="M0-85L85 0L0 85L-85 0Z" /><circle r="28" /></g></svg>
            <div style={{ fontSize: 110, marginTop: 20, fontStyle: "italic", color: "#f2c46d" }}>Insha Fatima</div>
            <div style={{ fontSize: 30, letterSpacing: 10, marginTop: 14, color: "#f2c46d" }}>HAPPY BIRTHDAY</div></div>), size)
}
