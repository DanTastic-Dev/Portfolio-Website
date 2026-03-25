"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  color: string;
  glowColor: string;
}

const skills: Skill[] = [
  { name: "C++", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.3)" },
  { name: "Python", color: "#8b5cf6", glowColor: "rgba(139, 92, 246, 0.3)" },
  { name: "React", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.3)" },
  { name: "Node.js", color: "#9333ea", glowColor: "rgba(147, 51, 234, 0.3)" },
  { name: "Express", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.3)" },
  {
    name: "Frontend Dev",
    color: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.3)",
  },
  { name: "Backend Dev", color: "#8b5cf6", glowColor: "rgba(139, 92, 246, 0.3)" },
  {
    name: "Database Mgmt",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  { name: "Supabase", color: "#9333ea", glowColor: "rgba(147, 51, 234, 0.3)" },
  { name: "Firebase", color: "#c084fc", glowColor: "rgba(192, 132, 252, 0.3)" },
  { name: "MongoDB", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.3)" },
  { name: "PostgreSQL", color: "#8b5cf6", glowColor: "rgba(139, 92, 246, 0.3)" },
  {
    name: "Full Stack",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.3)",
  },
  {
    name: "Mobile Dev",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  { name: "Flutter", color: "#06b6d4", glowColor: "rgba(6, 182, 212, 0.3)" },
  {
    name: "Android Studio",
    color: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.3)",
  },
];

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  skill: Skill;
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    initializeBalls();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initializeBalls = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ballsRef.current = skills.map((skill, index) => {
      const radius = 45;
      return {
        id: index,
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: 0,
        vy: 0,
        radius,
        skill,
      };
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const gravity = 0.3;
    const friction = 0.98;

    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, width, height);

    const balls = ballsRef.current;

    // Physics simulation
    balls.forEach((ball, i) => {
      // Apply gravity
      ball.vy += gravity;

      // Apply velocity
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Apply friction
      ball.vx *= friction;
      ball.vy *= friction;

      // Boundary collision with bounce
      const padding = 20;
      if (ball.x - ball.radius < padding) {
        ball.x = ball.radius + padding;
        ball.vx = Math.abs(ball.vx) * 0.6;
      }
      if (ball.x + ball.radius > width - padding) {
        ball.x = width - ball.radius - padding;
        ball.vx = -Math.abs(ball.vx) * 0.6;
      }
      if (ball.y - ball.radius < padding) {
        ball.y = ball.radius + padding;
        ball.vy = Math.abs(ball.vy) * 0.6;
      }
      if (ball.y + ball.radius > height - padding) {
        ball.y = height - ball.radius - padding;
        ball.vy = -Math.abs(ball.vy) * 0.3;
      }

      // Simple ball-to-ball overlap prevention (no momentum transfer)
      for (let j = i + 1; j < balls.length; j++) {
        const other = balls[j];
        const dx = other.x - ball.x;
        const dy = other.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = ball.radius + other.radius;

        if (distance < minDist && distance > 0) {
          const angle = Math.atan2(dy, dx);
          const overlap = minDist - distance;
          const moveX = (overlap / 2) * Math.cos(angle);
          const moveY = (overlap / 2) * Math.sin(angle);

          ball.x -= moveX;
          ball.y -= moveY;
          other.x += moveX;
          other.y += moveY;
        }
      }

      // Draw ball with gradient
      const gradient = ctx.createRadialGradient(
        ball.x - 10,
        ball.y - 10,
        5,
        ball.x,
        ball.y,
        ball.radius
      );
      gradient.addColorStop(0, ball.skill.color + "cc");
      gradient.addColorStop(1, ball.skill.color + "66");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Glow shadow
      ctx.shadowColor = ball.skill.color;
      ctx.shadowBlur = 25;
      ctx.strokeStyle = ball.skill.color + "33";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Reset shadow
      ctx.shadowColor = "transparent";

      // Draw text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const words = ball.skill.name.split(" ");
      if (words.length > 1) {
        ctx.fillText(words[0], ball.x, ball.y - 8);
        ctx.fillText(words[1], ball.x, ball.y + 8);
      } else {
        ctx.fillText(ball.skill.name, ball.x, ball.y);
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const balls = ballsRef.current;
    for (let i = balls.length - 1; i >= 0; i--) {
      const ball = balls[i];
      const dx = x - ball.x;
      const dy = y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        ball.vx = (Math.random() - 0.5) * 8;
        ball.vy = (Math.random() - 0.5) * 8;
        break;
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const balls = ballsRef.current;
    for (let i = balls.length - 1; i >= 0; i--) {
      const ball = balls[i];
      const dx = x - ball.x;
      const dy = y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        ball.vx = (Math.random() - 0.5) * 8;
        ball.vy = (Math.random() - 0.5) * 8;
        break;
      }
    }
  };

  return (
    <section className="relative bg-[#121212] py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-4"
            style={{ color: "#a855f7" }}
          >
            Expertise
          </p>
          <h2
            className="font-black leading-none tracking-tight"
            style={{
              fontSize: "clamp(2rem, 7vw, 5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills.
          </h2>
        </motion.div>
      </div>

      {/* Canvas Container */}
      <motion.div
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          height: "320px",
          boxShadow:
            "0 0 60px rgba(168,85,247,0.1), inset 0 0 60px rgba(168,85,247,0.05)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer block"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />

        {/* Gradient overlay for aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)",
          }}
        />
      </motion.div>


    </section>
  );
}
