'use client'
import { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
    return (
      <div id="projects" className="h-screen flex items-center justify-center bg-transparent">
        <h2 className="text-4xl font-semibold text-white">Projects</h2>
      </div>
    );
  }
  