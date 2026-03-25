"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

interface TextSection {
  id: number;
  text: string;
  subtext: string;
  startFade: number;
  peakStart: number;
  peakEnd: number;
  endFade: number;
  align: "center" | "left" | "right";
  yFrom: number;
  yTo: number;
}

const sections: TextSection[] = [
  {
    id: 1,
    text: "Danish Sohail.",
    subtext: "Full Stack Developer",
    startFade: 0,
    peakStart: 0.02,
    peakEnd: 0.15,
    endFade: 0.22,
    align: "center",
    yFrom: 30,
    yTo: -30,
  },
  {
    id: 2,
    text: "I build digital",
    subtext: "experiences.",
    startFade: 0.25,
    peakStart: 0.32,
    peakEnd: 0.48,
    endFade: 0.56,
    align: "left",
    yFrom: 40,
    yTo: -20,
  },
  {
    id: 3,
    text: "Bridging design",
    subtext: "and engineering.",
    startFade: 0.58,
    peakStart: 0.65,
    peakEnd: 0.80,
    endFade: 0.88,
    align: "right",
    yFrom: 40,
    yTo: -20,
  },
];

function TextPanel({
  section,
  scrollYProgress,
}: {
  section: TextSection;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [section.startFade, section.peakStart, section.peakEnd, section.endFade],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [section.startFade, section.endFade],
    [section.yFrom, section.yTo]
  );

  const alignClass = {
    center: "items-center text-center px-4 md:px-8",
    left: "items-start text-left px-4 md:px-8 lg:pl-20",
    right: "items-end text-right px-4 md:px-8 lg:pr-20",
  }[section.align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 z-10 flex flex-col justify-center pointer-events-none ${alignClass}`}
    >
      {/* Main heading */}
      <h2
        className="select-none px-2 sm:px-0"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 4.5rem)",
          color: "rgba(255, 255, 255, 0.95)",
          fontFamily: "'Bebas Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
          fontWeight: "700",
          letterSpacing: "0.05em",
          lineHeight: "1.1",
        }}
      >
        {section.text}
      </h2>

      {/* Sub text with subtle accent */}
      <h3
        className="select-none mt-0 px-2 sm:px-0"
        style={{
          fontSize: "clamp(0.75rem, 2.5vw, 1.6rem)",
          color: "#ffffff",
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
          fontWeight: "400",
          letterSpacing: "0.02em",
        }}
      >
        {section.subtext}
      </h3>
    </motion.div>
  );
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {sections.map((section) => (
        <TextPanel
          key={section.id}
          section={section}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Scroll indicator — fades out after 5% scroll */}
      <ScrollIndicator scrollYProgress={scrollYProgress} />
    </div>
  );
}

function ScrollIndicator({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 z-20"
    >
      <span className="text-white/40 text-xs tracking-widest uppercase font-light text-center px-4">
        Scroll
      </span>
      <div className="w-px h-8 sm:h-12 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "100%",
            background: "linear-gradient(to bottom, transparent, #a855f7, transparent)",
          }}
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
