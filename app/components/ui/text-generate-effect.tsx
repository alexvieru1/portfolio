"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?:number;
}) => {
  let wordsArray = words.split(" ");

  const renderWords = () => {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Starts when 20% is in view
        transition={{ staggerChildren: 0.2, delayChildren: delay }}
        className={className}
      >
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              variants={{
                hidden: { opacity: 0, filter: filter ? "blur(10px)" : "none" },
                visible: { opacity: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: duration ? duration : 1 }}
              className="dark:text-white text-black"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
