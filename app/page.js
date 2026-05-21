export default function JunuPortfolio() {
  const projects = [
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

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Python",
    "AI & ML",
    "Git & GitHub",
    "UI/UX Design",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wider">
            P<span className="text-zinc-400">_Vijay</span>
          </h1>

          <div className="hidden md:flex gap-8 text-sm text-zinc-300">
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#skills" className="hover:text-white transition">
              Skills
            </a>
            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>
            <a href="#others" className="hover:text-white transition">
              Others
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black opacity-90" />

        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-4">
              Artist • Developer • AI/ML Enthusiast • DATA_ANALYTIC
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Building
              <span className="block text-zinc-400">Creative Digital</span>
              Experiences.  
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-8">
              I create modern web experiences blending technology, design,
              artificial intelligence, creativity, and storytelling throught my portfolio.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300">
                View Projects
              </button>

              <button className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition duration-300">
                Download Resume
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[320px] h-[420px] rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <div className="w-32 h-32 rounded-full bg-white/10 border border-white/10 mb-6 flex items-center justify-center text-4xl font-bold">
                  J
                </div>

                <h2 className="text-3xl font-bold mb-2">PRIYANSHU</h2>

                <p className="text-zinc-400 leading-relaxed">
                  B.Tech CSE Student passionate about AI, ML models, artistic creativity,
                  frontend development, and futuristic UI design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
              About Me
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Turning Ideas Into
              <span className="block text-zinc-400">Interactive Reality</span>
            </h2>
          </div>

          <div>
            <p className="text-zinc-400 leading-relaxed text-lg">
              I am a Computer Science Engineering student who loves combining
              technology with creativity. From AI-based healthcare projects to
              artistic digital experiences and stock market dashboards, I enjoy
              building projects that look visually impressive while solving
              meaningful problems.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Skills
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Tools & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-white/10 bg-black hover:bg-white hover:text-black transition duration-300 cursor-pointer text-center font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Portfolio
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden hover:-translate-y-2 transition duration-500"
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

                  <button className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white hover:text-black transition duration-300">
                    Explore Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Contact
          </p>

          <h2 className="text-5xl font-black mb-6">
            Let’s Build Something Amazing
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Interested in collaborations, projects, or creative ideas? Let’s
            connect and create impactful digital experiences together.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <button className="px-7 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300">
              Email Me
            </button>

            <button className="px-7 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300">
              GitHub Profile
            </button>
          </div>
        </div>
      </section>
      {/* OTHERS */}
<section id="others" className="py-28 px-6 bg-zinc-950">
  <div className="max-w-6xl mx-auto">
    
    <div className="mb-14">
      <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
        Others
      </p>

      <h2 className="text-4xl md:text-5xl font-bold">
        Certificates & Hobbies
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Certificates */}
      <div className="p-8 rounded-3xl border border-white/10 bg-black">
        <h3 className="text-2xl font-bold mb-4">
          Certificates
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          Showcasing technical certifications, workshops,
          hackathons, and achievements.
        </p>
      </div>
      

      {/* Art Gallery */}
      <div className="p-8 rounded-3xl border border-white/10 bg-black">
        <h3 className="text-2xl font-bold mb-4">
          Art Gallery
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          Pencil sketches, charcoal portraits, creative
          illustrations, and artistic works.
        </p>
      </div>

      {/* Hobbies */}
      <div className="p-8 rounded-3xl border border-white/10 bg-black">
        <h3 className="text-2xl font-bold mb-4">
          Hobbies
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          Rap writing, stock market analysis, filmmaking,
          design exploration, and creative storytelling.
        </p>
      </div>
      

    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center text-zinc-500 text-sm">
        © 2026 P_Vijay Portfolio •
      </footer>
    </div>
  );
}
