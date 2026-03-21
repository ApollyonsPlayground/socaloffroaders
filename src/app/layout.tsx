import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoCal Off-Roaders | Wilderness Trail Guides",
  description: "Discover Southern California's best off-road trails. From desert dunes to mountain peaks, explore with confidence using our trail guides and navigation tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-stone-950 text-stone-50">
        {children}
      </body>
    </html>
  );
}
