import "./globals.css";
import { Cormorant_Garamond, Jost, Amiri, Playfair_Display, Pinyon_Script } from "next/font/google";
const display = Playfair_Display({ subsets: ["latin"], weight: ["600", "800"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--f-script", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--f-serif", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400"], variable: "--f-sans", display: "swap" });
const ar = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--f-ar", display: "swap" });
const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description = "A cinematic birthday celebration made for Insha Fatima.";
export const metadata = {
    metadataBase: new URL(url), title: "Happy Birthday, Insha Fatima", description,
    openGraph: { title: "Happy Birthday, Insha Fatima", description, type: "website", siteName: "Happy Birthday, Insha Fatima" },
    twitter: { card: "summary_large_image", title: "Happy Birthday, Insha Fatima", description }
};
export const viewport = { themeColor: "#06130e" };
export default function RootLayout({ children }) { return (<html lang="en" style={{ backgroundColor: "#06130e" }}><body className={`${serif.variable} ${sans.variable} ${ar.variable} ${display.variable} ${script.variable}`}>{children}</body></html>) }
