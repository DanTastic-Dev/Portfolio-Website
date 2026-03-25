"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/sequence/frame_${padded}_delay-0.041s.png`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  // Draw a frame on canvas with object-fit: cover logic
  function drawFrame(img: HTMLImageElement) {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  // Resize canvas to match viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame after resize
      const img = imagesRef.current[currentFrameRef.current];
      if (img?.complete) drawFrame(img);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        // Draw the first frame as soon as it's loaded
        if (i === 0) {
          drawFrame(img);
        }
        // Once all loaded, draw current frame correctly
        if (loadedCount === FRAME_COUNT) {
          const idx = currentFrameRef.current;
          drawFrame(images[idx]);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    const clampedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    if (clampedIdx === currentFrameRef.current) return;
    currentFrameRef.current = clampedIdx;
    const img = imagesRef.current[clampedIdx];
    if (img?.complete) drawFrame(img);
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky viewport container */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.05)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#121212" }}
        />
        {/* Overlay text on top of canvas */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
