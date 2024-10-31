'use client';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Projects from './components/Projects';
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";
import Image from "next/image";
import { IconCpu2, IconFolder, IconMail, IconUser } from "@tabler/icons-react";
import { FloatingDock } from "./components/ui/floating-dock";
import { useSystemTheme } from "@/hooks/useTheme";



export default function Home() {
  const theme = useSystemTheme();
  const [logoSrc, setLogoSrc] = useState("/images/dock-logo.webp");
  const [dockVisible, setDockVisible] = useState(false); // Track when to show the dock

  //Theme checker
  useEffect(() => {
    if (theme === "dark") {
      setLogoSrc("/images/dock-logo.webp");
    } else {
      setLogoSrc("/images/dock-logo-dark.webp");
    }
  }, [theme]);

  // Consolidated smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')!.substring(1); // Get the ID from href
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop, // Adjust the offset for fixed headers if necessary
        behavior: 'smooth', // Smooth scroll
      });
    }
  };

  const links = [
    {
      title: "Home",
      icon: (
        <Image
          src={logoSrc}
          width={200}
          height={200}
          alt="Alex Vieru Logo"
        />
      ),
      href: "#hero",
    },
    {
      title: "About me",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about-me",
    },
    {
      title: "Projects",
      icon: (
        <IconFolder className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Tech Stack",
      icon: (
        <IconCpu2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#tech-stack",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
  ];

  return (
    <div className="relative justify-center items-center overflow-hidden">
      {/* Static Background */}
      <div className="fixed h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Floating Dock with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }} // Start hidden
        animate={dockVisible ? { opacity: 1 } : {}} // Fade in when dockVisible is true
        transition={{ duration: 1, delay: 0.5 }} // Delay to sync with the main heading animation
        className="fixed z-20"
      >
        <FloatingDock items={links} handleClick={handleClick} />
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10">
        <Hero onHeadingAnimationComplete={() => setDockVisible(true)} /> {/* Pass callback to Hero */}
        <AboutMe />
        <Projects />
        <TechStack />
        <Contact />
      </div>
    </div>
  );
}
