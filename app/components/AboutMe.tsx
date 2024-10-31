"use client";
import { motion } from "framer-motion";
import { FlipWords } from "./ui/flip-words";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function AboutMe() {
  const words = ["creative", "reliable", "efficient", "innovative"];

  return (
    <div
      id="about-me"
      className="h-1/2 flex flex-col items-center justify-center bg-transparent space-y-10"
    >
      {/* Animate TextGenerateEffect when in view */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <TextGenerateEffect
          className="text-4xl lg:text-6xl font-bold text-center"
          words="I'm Alex 👋"
        />
      </motion.div>

      {/* Animate FlipWords content after TextGenerateEffect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-2xl lg:text-3xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center lg:w-[60%] lg:mt-6"
      >
        I&apos;m all about being <FlipWords words={words} /> <br />
        when it comes to crafting web experiences.
      </motion.div>

      {/* Animate combined description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex justify-center px-4"
      >
        <div className="lg:w-[60%] text-center text-neutral-600 dark:text-neutral-400">
          <TextGenerateEffect
            className="text-md lg:text-xl"
            words="With a passion for both front-end and back-end technologies, I bring creative, detail-oriented solutions to life. 
              Over the past two years, I've worked on diverse projects, from small business websites to dynamic applications. 
              Beyond coding, I enjoy walking my dog and relaxing with my cat after a productive day of exploring new web technologies."
            duration={0.35}
            delay={2.2}
          />
        </div>
      </motion.div>
    </div>
  );
}
