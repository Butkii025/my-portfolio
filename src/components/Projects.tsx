import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string;
}

export default function Projects(): React.JSX.Element {
  const projects: Project[] = [
    {
      title: "AI Pneumonia Detection",
      desc: "Deep learning healthcare project using CNN models and image classification.",
      tech: "Python • TensorFlow • AI",
    },
    {
      title: "Stock Market Dashboard",
      desc: "Interactive stock analysis dashboard with indicators and market trends.",
      tech: "React • APIs • Charts",
    },
    {
      title: "Digital Art Gallery",
      desc: "A modern showcase for sketches, charcoal art, and creative illustrations.",
      tech: "Next.js • Tailwind • Motion",
    },
  ];

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Projects
          </p>

          <h2 className="text-4xl md:text-3xl font-bold">
            Featured Work & Experiences
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden hover:-translate-y-2 transition duration-500 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="h-56 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black" />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">
                  {project.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed mb-5">
                  {project.desc}
                </p>

                <div className="text-sm text-zinc-500 mb-6">
                  {project.tech}
                </div>

                <button className="px-5 py-2 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
                  Explore Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
