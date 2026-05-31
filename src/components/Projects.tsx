import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  url: string;
  img: string;
  code: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Xela_Arcade",
    desc: "A Next-Gen Library of Custom-Classic Game Engines with Core Frameworks and Algorithms (chess-is-best)",
    tech: ["JavaScript", "DSA", "TypeScript", "React", "Tailwind CSS", "Next.js", "Framer Motion", "Lucide React"],
    url: 'https://ansharcade.netlify.app/',
    img: 'project-img/Xela_Arcade.png',
    code: 'https://github.com/Butkii025/Xela_Arcade',
  },
  {
    title: "Personal Portfolio",
    desc: "Developed an optimized and responsive personal space to showcase my work.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Turbo Pack", "SmoothCursor"],
    url: 'https://p-vijay.vercel.app/',
    img: 'project-img/portfolio.png',
    code: 'https://github.com/Butkii025/my-portfolio',
  },
  {
    title: "Craft-Greet",
    desc: "Custom or predefined direct device downloads. Personalized greeting cards with custom images/messages and a responsive UI.",
    tech: ["HTML5", "CSS3", "JS"],
    url: 'https://butkii025.github.io/Craft-Greet/',
    img: 'project-img/craftgreet.png',
    code: 'https://github.com/Butkii025/Craft-Greet',
  },
  {
    title: "GPA calculator",
    desc: "Web app that allows users to calculate their GPA by inputting subject grade points and credits. Includes custom feedback display.",
    tech: ["HTML5", "CSS3", "JS"],
    url: 'https://butkii025.github.io/SGPA-calculator/',
    img: 'project-img/clgplusminus.png',
    code: 'https://github.com/Butkii025/SGPA-calculator',
  },
];

export default function Projects(): React.JSX.Element {
  
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    if (title === "Personal Portfolio") {
      e.preventDefault();
      alert("वाह वाह 👏! क्या अर्थ है इसका, अभी तो पोर्टफोलियो ही देखा जा रहा है न 🤨 ?? कोई बात नहीं, अब फिर से प्रारंभ करो ✌️ आपका दिन मंगलमय हो 🙏");
      window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-28 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4 ">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Work & Experiences
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory scrollbar-none">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={index}
              className="group rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between w-[300px] md:w-[360px] shrink-0 snap-start"
            >
              {/* Project Image Layout */}
              <div>
                <div className="h-56 w-full overflow-hidden bg-zinc-900 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black">
                  <img
                    src={project.img}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Project Details */}
                <div className="p-6 pb-0">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-5 text-2lg md:text-base">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Technology Buttons */}
              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-1.5 mb-6 text-xs text-zinc-400">
                  {project.tech.map((techItem, techIndex) => (
                    <span key={techIndex} className="bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                      {techItem}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center"
                    onClick={(e) => handleExploreClick(e, project.title)}
                  >
                    <button className="w-full px-4 py-2 text-sm font-medium rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
                      Preview
                    </button>
                  </a>

                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center"
                    >
                    <button className="w-full px-4 py-2 text-sm font-medium rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300 capitalize">
                      Code
                    </button>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}