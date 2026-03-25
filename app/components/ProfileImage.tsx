"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileImage() {
  return (
    <motion.div
      className="absolute inset-0 z-5 flex items-center justify-center md:justify-end pointer-events-none"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative w-64 h-96 md:w-80 md:h-[28rem] md:mr-12 lg:mr-24 px-4 md:px-0">
        {/* Light white border with glow effect */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.05)",
          }}
        />

        {/* Image container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="Danish Sohail"
            fill
            className="object-cover"
            priority
            quality={90}
          />

          {/* Subtle overlay for depth */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
