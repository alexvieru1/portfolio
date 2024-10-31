"use client";
import { useEffect, useState } from "react";
import { appwriteConfig, databases } from "@/lib/appwriteConfig";
import { LayoutGrid } from "./ui/layout-grid";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  const classNamesPattern = [
    "md:col-span-2", // Large card
    "col-span-1", // Small card
    "col-span-1", // Small card
    "md:col-span-2", // Large card
    "md:col-span-2", // Small card
    "col-span-1", // Large card
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.projectCollectionId
        );
        setProjects(response.documents);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const cards = projects.map((project, index) => ({
    id: index,
    content: (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          {project.title}
        </p>
        <p className="font-normal text-base text-white">
          {project.description}
        </p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          {project.details}
        </p>
        <div className="flex justify-between">
          {project.contributors && (
            <p className="text-neutral-300">
              Contributors: {project.contributors}
            </p>
          )}
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-black border-white border-2 border-opacity-85 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Live Site
            </a>
          )}
        </div>
      </div>
    ),
    className: classNamesPattern[index % classNamesPattern.length], // Loop through pattern
    thumbnail: project.image || null,
  }));

  return (
    <div
      id="projects"
      className="h-screen flex flex-col items-center justify-center bg-transparent"
    >
      <div className="w-full lg:w-[65%] flex justify-start">
        <TextGenerateEffect
          className="px-4 text-4xl lg:text-6xl font-bold text-start"
          words="My recent work"
        />
      </div>
      <LayoutGrid cards={cards} />
    </div>
  );
}
