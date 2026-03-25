"use client";

import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import SkillsSection from "./components/SkillsSection";

// Client-only canvas component (avoids SSR issues with window/canvas APIs)
const ScrollyCanvas = dynamic(() => import("./components/ScrollyCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "500vh",
        background: "#121212",
      }}
    />
  ),
});

export default function Home() {
  return (
    <main>
      {/* ── Scrollytelling Canvas Section ── */}
      <ScrollyCanvas />

      {/* ── Work / Projects Section ── */}
      <Projects />

      {/* ── Skills Section ── */}
      <SkillsSection />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
