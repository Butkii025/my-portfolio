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
    desc: "A Next-Gen Library of Custom-Classic Games with Core Frameworks and Algorithms (chess-is-best)",
    tech: ["JavaScript", "TypeScript", "React", "Next.js", "Framer Motion", "Lucide React"],
    url: 'https://xela-arcade.netlify.app/',
    img: 'project-img/Xela_Arcade.png',
    code: 'https://github.com/Butkii025/Xela_Arcade',
  },
  {
    title: "Personal Portfolio",
    desc: "Developed an optimized and responsive personal space to showcase my work.",
    tech: ["Next.js", "React", "Tailwind CSS", "Turbo Pack", "SmoothCursor"],
    url: 'https://p-vijay.vercel.app/',
    img: 'project-img/portfolio.png',
    code: 'https://github.com/Butkii025/my-portfolio',
  },
  {
    title: "Craft-Greet",
    desc: "Custom or predefined direct device downloads. Personalized cards with custom images/message.",
    tech: ["HTML5", "JS"],
    url: 'https://butkii025.github.io/Craft-Greet/',
    img: 'project-img/craftgreet.png',
    code: 'https://github.com/Butkii025/Craft-Greet',
  },
  {
    title: "GPA calculator",
    desc: " Allows users to calculate their GPA by subject grade points and credits.",
    tech: ["HTML5", "JS"],
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

        {/* Outer Gallery Wrapper Container */}
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-4 pb-6 items-stretch">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={index}
              className="
                group relative rounded-3xl overflow-hidden 
                bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 
                backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-blue-500/10 
                flex flex-col justify-between
                
                /* Mobile Layout Defaults */
                w-full min-h-[480px]
                
                /* Desktop Gallery Layout Configuration */
                md:flex-1 md:hover:flex-[4.5] md:min-w-[95px]
              "
            >
              {/* Top Layer Content: Image and Header details */}
              <div className="w-full flex flex-col">
                {/* Image layout container */}
                <div className="h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-zinc-900 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black relative shrink-0">
                  <img
                    src={project.img}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-zinc-950/20 transition-opacity duration-300 group-hover:opacity-0" />
                </div>

                {/* Text Block Content */}
                <div className="p-5 md:p-6 flex-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight truncate group-hover:whitespace-normal transition-colors duration-300 group-hover:text-blue-400">
                    {project.title}
                  </h3>
                  
                  {/* Descriptions: Perfectly responsive animation without dynamic absolute max-height cutting layout limits */}
                  <div className="
                    text-zinc-400 leading-relaxed text-sm md:text-base transition-all duration-300 ease-out
                    /* Mobile: Visible naturally */
                    opacity-100 block
                    /* Desktop: Collapsed smoothly until hovered */
                    md:opacity-0 md:invisible md:h-0 md:group-hover:h-auto md:group-hover:opacity-100 md:group-hover:visible md:group-hover:mt-2
                  ">
                    {project.desc}
                  </div>
                </div>
              </div>

              {/* Bottom Layer Content: Badges and Interactive Action Buttons */}
              <div className="
                p-5 md:p-6 pt-0 mt-auto w-full shrink-0 transition-all duration-300 ease-out
                /* Mobile: standard layout rendering */
                opacity-100 block
                /* Desktop: Collapsed smoothly until card expands */
                md:opacity-0 md:invisible md:h-0 md:group-hover:h-auto md:group-hover:opacity-100 md:group-hover:visible md:group-hover:mt-4
              ">
                
                {/* Tech Stack Chips Wrapper */}
                <div className="flex flex-wrap gap-1.5 mb-5 text-xs text-zinc-400">
                  {project.tech.map((techItem, techIndex) => (
                    <span key={techIndex} className="bg-zinc-900/80 px-2 py-0.5 rounded-md border border-zinc-800/80 whitespace-nowrap">
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center"
                    onClick={(e) => handleExploreClick(e, project.title)}
                  >
                    <button className="w-full px-3 py-2.5 text-xs md:text-sm font-medium rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-200">
                      Preview
                    </button>
                  </a>

                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center"
                  >
                    <button className="w-full px-3 py-2.5 text-xs md:text-sm font-medium rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-200 capitalize">
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