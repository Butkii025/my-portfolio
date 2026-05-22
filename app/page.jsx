'use client';

import { useState } from 'react';

export default function VijayPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedArtImage, setSelectedArtImage] = useState(null);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Others', href: '#others' },
    { label: 'Contact', href: '#contact' },
    { label: 'creative_corner', href: '#creative_corner' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLogo = () => {
    setIsLogoOpen(true);
  };

  const closeLogo = () => {
    setIsLogoOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const artImages = [
    { id: 1, name: 'image.jpg' },
    { id: 2, name: 'image1.jpg' },
    { id: 3, name: 'image2.jpg' },
    { id: 4, name: 'image3.jpg' },
    { id: 5, name: 'image4.jpg' },
    { id: 6, name: 'image5.jpg' },
  ];
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
      {/* NAVBAR */}
<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">

  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-3">
      <img
        src="/pv_logo.jpg"
        alt="Logo"
        className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 transition duration-300"
        onClick={openLogo}
      />

      <h1 className="text-2xl font-bold tracking-wider">
        <span className="text-zinc-400">P_Vijay</span>
      </h1>
    </div>

    {/* DESKTOP MENU */}
    <div className="hidden md:flex gap-8 text-sm text-zinc-300">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="cursor-pointer hover:text-blue-400 transition duration-300"
        >
          {link.label}
        </a>
      ))}
    </div>

    {/* MOBILE HAMBURGER */}
    <button
      onClick={toggleMenu}
      className="md:hidden flex flex-col gap-1 cursor-pointer p-2"
      aria-label="Toggle menu"
    >
      <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
      <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
      <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
    </button>

  </div>

  {/* MOBILE DROPDOWN MENU */}
  {isMenuOpen && (
    <>
      {/* Backdrop with blue glow/blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        onClick={closeMenu}
        style={{
          boxShadow: 'inset 0 0 40px rgba(96, 165, 250, 0.15)',
        }}
      />

      {/* Menu */}
      <div className="absolute top-16 right-6 w-48 bg-black border-2 border-blue-400 rounded-2xl shadow-2xl z-40 md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex flex-col py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="px-6 py-3 text-white hover:text-blue-400 hover:bg-white/5 cursor-pointer transition duration-300 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )}
</nav>

{/* LOGO MODAL */}
{isLogoOpen && (
  <>
    {/* Backdrop with blue glow */}
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      onClick={closeLogo}
      style={{
        boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)',
      }}
    />

    {/* Logo Modal - Left side to middle */}
    <div className="fixed inset-0 z-50 flex items-center justify-start pointer-events-none">
      <div
        className="ml-12 pointer-events-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/pv_logo.jpg"
          alt="Profile Logo"
          className="w-64 h-64 rounded-2xl border-4 border-blue-400 shadow-2xl object-cover"
          style={{
            boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)',
          }}
        />
      </div>
    </div>
  </>
)}

{/* PROFILE MODAL */}
{isProfileOpen && (
  <>
    {/* Backdrop with blue glow */}
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      onClick={closeProfile}
      style={{
        boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)',
      }}
    />

    {/* Profile Modal - Center */}
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/profile.png"
          alt="Profile Picture"
          className="w-80 h-80 rounded-full border-4 border-blue-400 shadow-2xl object-cover"
          style={{
            boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)',
          }}
        />
      </div>
    </div>
  </>
)}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black opacity-90" />

        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <p className="uppercase tracking-[0.2em] text-white font-semibold text-sm mb-4">
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
              <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 active:bg-blue-400 cursor-pointer transition duration-300">
                View Projects
              </button>

              <button className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
                Download Resume
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[320px] h-[420px] rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <img
                 src="/profile.png"
                 alt="Profile"
                 className="w-40 h-40 rounded-full object-cover border-4 border-zinc-700 shadow-2xl cursor-pointer hover:scale-110 transition duration-300"
                 onClick={openProfile}
                 />
                
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
                className="p-5 rounded-2xl border border-white/10 bg-black hover:bg-white hover:text-black cursor-pointer transition duration-300 text-center font-medium"
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

                  <button className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white hover:text-black active:bg-blue-400 cursor-pointer transition duration-300">
                    Explore Project
                  </button>
                </div>
              </div>
            ))}
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
        Certificates & Research Papers
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
      

      {/* Research Papers */}
      <div className="p-8 rounded-3xl border border-white/10 bg-black">
        <h3 className="text-2xl font-bold mb-4">
          Research Papers
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          Academic research, publications, and scholarly contributions.
        </p>
      </div>
      

    </div>
  </div>
</section>

{/* CREATIVE CORNER */}
<section id="creative_corner" className="py-28 px-6 border-t border-white/10 bg-zinc-950">
  <div className="max-w-6xl mx-auto">
    <div className="mb-14">
      <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
        Creative
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Art_Gallery
      </h2>
    </div>

    <p className="text-zinc-400 leading-relaxed text-lg mb-12 max-w-3xl">
      My Creative Corner reflects the artistic side of my personality beyond technology and coding. 
      I enjoy sketching, portrait art, charcoal drawing, poster designing, and creating meaningful visual concepts that express emotions, stories, and social messages. 
      Art allows me to transform imagination into reality while improving my creativity, observation, and attention to detail. 
      From detailed pencil sketches to creative designs, every artwork represents my passion for visual storytelling and self-expression.
    </p>

    {/* Gallery Images */}
    <div className="flex justify-center items-center gap-0 overflow-x-auto pb-5">
      {artImages.map((image, index) => (
        <div
          key={image.id}
          className="relative w-48 h-48 flex-shrink-0 cursor-pointer group"
          style={{
            marginLeft: index > 0 ? '-50px' : '0',
            zIndex: index,
          }}
          onClick={() => setSelectedArtImage(image)}
        >
          <img
            src={`image.src`}
            alt={`Art ${image.id}`}
            className="w-full h-full object-cover rounded-lg border-4 border-blue-400 shadow-2xl hover:scale-110 transition duration-300"
            style={{
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.3), inset 0 0 30px rgba(96, 165, 250, 0.1)',
            }}
          />
        </div>
      ))}
    </div>
  </div>
</section>

{/* ART IMAGE MODAL */}
{selectedArtImage && (
  <>
    {/* Backdrop with blue glow */}
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      onClick={() => setSelectedArtImage(null)}
      style={{
        boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)',
      }}
    />

    {/* Image Modal - Center */}
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`/${selectedArtImage.name}`}
          alt={`Art ${selectedArtImage.id}`}
          className="max-w-2xl max-h-96 rounded-lg border-4 border-blue-400 shadow-2xl object-cover"
          style={{
            boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)',
          }}
        />
      </div>
    </div>
  </>
)}

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
            <button className="px-7 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 active:bg-blue-400 cursor-pointer transition duration-300">
              Email Me
            </button>

            <a href="https://github.com/Butkii025" target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-2xl border border-white/10 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300 inline-block">
              GitHub Profile
            </a>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center text-zinc-500 text-sm">
        © 2026 P_Vijay Portfolio
      </footer>
    </div>
  );
}
