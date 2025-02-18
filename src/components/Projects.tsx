// src/components/Projects.tsx
"use client";

import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    { title: "Projeto 1", description: "Descrição do projeto 1" },
    { title: "Projeto 2", description: "Descrição do projeto 2" },
    { title: "Projeto 3", description: "Descrição do projeto 3" },
  ];

  return (
    <section id="projetos" className="py-16 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-4 text-gray-300">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
