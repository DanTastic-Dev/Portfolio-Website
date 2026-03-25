import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Portfolio — Creative Developer",
  description:
    "High-end scrollytelling personal portfolio showcasing creative development and design engineering.",
  keywords: ["portfolio", "creative developer", "frontend", "next.js", "framer motion"],
  openGraph: {
    title: "Portfolio — Creative Developer",
    description: "High-end scrollytelling personal portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
