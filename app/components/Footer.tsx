"use client";

import { motion } from "framer-motion";

const links = [
  { label: "GitHub", href: "https://github.com/DanTastic-Dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danish-sohail-06a897288" },
  { label: "Email", href: "mailto:danishsohail75006@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-[#121212] py-16 px-6 md:px-12 lg:px-24 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <p
            className="font-black text-xl sm:text-2xl tracking-tight"
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sohail.
          </p>
          <p className="text-white/30 text-sm mt-1">Creative Developer</p>
        </motion.div>

        {/* Links */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/20 text-xs font-mono"
        >
          @2026 - Made by Danish Sohail
        </motion.p>
      </div>
    </footer>
  );
}
