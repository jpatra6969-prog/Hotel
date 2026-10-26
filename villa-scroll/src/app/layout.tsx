import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Aura Sanctuary • 5-Star Private Villa & Waterfront Resort | Capri Peninsula",
  description:
    "Experience Europe's premier private coastal sanctuary. 5 luxury suites and full estate buyouts with private heated infinity lagoon, 3-star Michelin dining, Riva yachts, and helicopter transfers.",
  keywords: [
    "Luxury Villa Capri",
    "Private Hotel Resort Italy",
    "Waterfront Villa Rental",
    "5 Star Private Sanctuary",
    "Michelin Dining Villa",
  ],
  openGraph: {
    title: "Aura Sanctuary • 5-Star Private Villa & Waterfront Resort",
    description: "Architectural coastal sanctuary on the Capri Peninsula with private infinity lagoon and helipad.",
    images: ["/frames/frame_0850.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#060709] text-white antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
