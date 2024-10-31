'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { Cover } from "./ui/cover";
import { useSystemTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Hero({ onHeadingAnimationComplete }: { onHeadingAnimationComplete: () => void }) {
  const theme = useSystemTheme();
  const [logoSrc, setLogoSrc] = useState("/images/dock-logo.webp");

  useEffect(() => {
    if (theme === "dark") {
      setLogoSrc("/images/dock-logo.webp");
    } else {
      setLogoSrc("/images/dock-logo-dark.webp");
    }
  }, [theme]);

  return (
    <div id="hero" className="h-screen relative flex flex-col items-center justify-center bg-transparent">
      {/* Position the logo and text in the top-left corner */}
      <div className="absolute top-3 left-3 flex flex-col justify-center items-start">
        <div className="flex justify-start items-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          >
            <Image
              src={logoSrc}
              width={300}
              height={300}
              alt="Alex Vieru Logo"
            />
          </motion.div>

          {/* Animated Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-start text-xl lg:text-2xl ml-2"
          >
            <TextGenerateEffect className="mt-[-9px]" words="Alex Vieru Developer" />
          </motion.div>
        </div>
      </div>

      {/* Animated Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start from the bottom
        whileInView={{ opacity: 1, y: 0 }} // Animate to normal position
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} // Add delay to sequence after the logo and name
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto text-center mt-6 relative z-20 py-6"
        onAnimationComplete={onHeadingAnimationComplete} // Trigger callback when the animation completes
      >
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Build amazing websites <br /> at <Cover>warp speed</Cover>
        </h1>
      </motion.div>
    </div>
  );
}
