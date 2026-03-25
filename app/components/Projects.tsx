"use client";

import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Parallax Universe",
    category: "Web Experience",
    description:
      "An immersive 3D scrollytelling site built for a space exploration startup. Features WebGL particle systems and scroll-linked camera paths.",
    tech: ["Next.js", "Three.js", "GSAP", "GLSL"],
    year: "2024",
    gradient: "from-purple-900/40 to-violet-900/20",
    glowColor: "rgba(168, 85, 247, 0.25)",
    accentColor: "#a855f7",
  },
  {
    id: 2,
    title: "Motion Design System",
    category: "Design Engineering",
    description:
      "A comprehensive design system with 60fps animation primitives. Adopted by a team of 30+ designers and engineers across 4 product lines.",
    tech: ["React", "Framer Motion", "Storybook", "Figma API"],
    year: "2024",
    gradient: "from-cyan-900/40 to-teal-900/20",
    glowColor: "rgba(6, 182, 212, 0.25)",
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    title: "AI Creative Studio",
    category: "Product Design",
    description:
      "A generative AI interface that lets creators craft visual narratives through natural language. Real-time canvas with collaborative editing.",
    tech: ["Next.js", "Stable Diffusion", "WebSockets", "Canvas API"],
    year: "2023",
    gradient: "from-pink-900/40 to-rose-900/20",
    glowColor: "rgba(236, 72, 153, 0.25)",
    accentColor: "#ec4899",
  },
  {
    id: 4,
    title: "Kinetic Typography",
    category: "Creative Coding",
    description:
      "An experimental typography engine where every character reacts to audio frequencies in real-time. Featured on Awwwards.",
    tech: ["Vanilla JS", "Web Audio API", "SVG Animation", "GSAP"],
    year: "2023",
    gradient: "from-amber-900/40 to-orange-900/20",
    glowColor: "rgba(245, 158, 11, 0.25)",
    accentColor: "#f59e0b",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  return (
    <section className="relative bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#a855f7" }}>
            Selected Work
          </p>
          <h2
            className="font-black leading-none tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projects.
          </h2>
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="max-w-7xl mx-auto mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #a855f7, #06b6d4)",
            color: "#fff",
            boxShadow: "0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(6,182,212,0.1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 60px rgba(168,85,247,0.5), 0 0 100px rgba(6,182,212,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(6,182,212,0.1)";
          }}
        >
          Let&apos;s work together
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `0 0 60px ${project.glowColor}, inset 0 0 60px ${project.glowColor}`,
        }}
      />

      {/* Gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 50%, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative p-8 md:p-10">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
          </div>
          <span className="text-white/20 font-mono text-sm">{project.year}</span>
        </div>

        {/* Title */}
        <h3
          className="font-black text-3xl md:text-4xl tracking-tight text-white mb-4 leading-none group-hover:text-gradient transition-all duration-300"
          style={{
            background: "none",
            WebkitTextFillColor: "inherit",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-8 font-light">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 md:bottom-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -8 }}
          whileHover={{ x: 0 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: project.accentColor }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
