"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import {
  IconApi,
  IconBrandDocker,
  IconBrandEvernote,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconCoffee,
  IconLeaf,
} from "@tabler/icons-react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const TechStack = () => {
  // Tech Stack items for the carousel
  const techStack = [
    {
      quote:
        "Build scalable web applications with ease using Next.js and React.",
      name: "Next.js",
      icon: (
        <IconBrandNextjs className="text-black dark:text-white h-10 w-10" />
      ),
    },
    {
      quote:
        "A strict syntactical superset of JavaScript, adding static types.",
      name: "TypeScript",
      icon: (
        <IconBrandTypescript className="text-blue-600 dark:text-blue-400 h-10 w-10" />
      ),
    },
    {
      quote:
        "JavaScript is the backbone of web development, adding interactivity to websites.",
      name: "JavaScript",
      icon: (
        <IconBrandJavascript className="text-yellow-500 dark:text-yellow-400 h-10 w-10" />
      ),
    },
    {
      quote:
        "A versatile, object-oriented programming language for cross-platform development.",
      name: "Java",
      icon: <IconCoffee className="text-red-600 dark:text-red-400 h-10 w-10" />,
    },
    {
      quote:
        "Containerize applications and ensure consistency across environments with Docker.",
      name: "Docker",
      icon: (
        <IconBrandDocker className="text-blue-500 dark:text-blue-300 h-10 w-10" />
      ),
    },
    {
      quote:
        "Create RESTful APIs with Node.js and the lightweight Express.js framework.",
      name: "Express.js",
      icon: (
        <IconApi className="text-green-600 dark:text-green-400 h-10 w-10" />
      ),
    },
    {
      quote:
        "The runtime environment for executing JavaScript code on the server.",
      name: "Node.js",
      icon: (
        <IconBrandNodejs className="text-green-500 dark:text-green-400 h-10 w-10" />
      ),
    },
    {
      quote:
        "A CSS framework that lets you rapidly build modern and responsive designs.",
      name: "Tailwind CSS",
      icon: (
        <IconBrandTailwind className="text-blue-500 dark:text-blue-300 h-10 w-10" />
      ),
    },
    {
      quote:
        "A document-oriented NoSQL database, ideal for flexible data storage.",
      name: "MongoDB",
      icon: (
        <IconBrandMongodb className="text-green-600 dark:text-green-400 h-10 w-10" />
      ),
    },
    {
      quote: "PostgreSQL, a powerful, open-source relational database system.",
      name: "PostgreSQL",
      icon: (
        <IconBrandEvernote className="text-blue-700 dark:text-blue-500 h-10 w-10" />
      ),
    },
    {
      quote:
        "React makes it easy to build user interfaces with reusable components.",
      name: "React",
      icon: (
        <IconBrandReact className="text-blue-500 dark:text-blue-300 h-10 w-10" />
      ),
    },
    {
      quote: "Build robust backend systems quickly with Spring Boot.",
      name: "Spring Boot",
      icon: (
        <IconLeaf className="text-green-500 dark:text-green-300 h-10 w-10" />
      ),
    },
  ];
  return (
    <div
      id="tech-stack"
      className="h-screen flex flex-col items-center justify-center bg-transparent"
    >
      <div className="w-full lg:w-[65%] flex justify-end">
        <TextGenerateEffect
          className="p-4 text-4xl lg:text-6xl font-bold text-end"
          words="Tech Stack"
        />
      </div>
        <InfiniteMovingCards items={techStack} speed="normal" />
    </div>
  );
};

export default TechStack;
