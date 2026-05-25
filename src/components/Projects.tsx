import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string;
  url: string;
  img:string;
}

export default function Projects(): React.JSX.Element {
  const projects: Project[] = [
    {
      title: "Personal Portfolio",
      desc: "Developed a optimized/responsive personal space, to showcase my work",
      tech: "Next.js • TypeScript • React • Tailwind CSS • Turbo Pack • SmoothCursor",
      url: 'https://p-vijay.vercel.app/',
      img: '/portfolio.png',
    },
    {
      title: "Personalized Greeting Card Web-App",
      desc: "Custom or predefined direct device downloads, greeting cards with personalized image/message with responsive UI",
      tech: "HTML5 • CSS3 • JS",
      url: 'https://craftgreet.vercel.app/',
      img: '/craftgreet.png',
    },
    {
      title: "GPA calculator",
      desc: "Web app that allows users to calculate their GPA by inputting subject grade points and credits,result display with pre-coded feedback",
      tech: "HTML5 • CSS3 • JS",
      url: 'https://clgplusminus.vercel.app/',
      img: '/clgplusminus.png',
    },
  ];

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
  if (title === "Personal Portfolio") {
    e.preventDefault(); 
    // Custom message
    alert("वाह वाह 👏! क्या अर्थ है इसका, अभी तो पोर्टफोलियो ही देखा जा रहा है न 🤨 ?? कोई बात नहीं, अब फिर से प्रारंभ करो ✌️ आपका दिन मंगलमय हो 🙏");
    window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
  }
};

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

              <div className="h-56 w-full overflow-hidden bg-zinc-900 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black">
                <img 
                  src={project.img} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>

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

                <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm mb-6"
                onClick={(e)=> handleExploreClick(e,project.title)}
                >
                  
                <button className="px-5 py-2 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
                  प्रदर्शन
                </button>
              </a>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
