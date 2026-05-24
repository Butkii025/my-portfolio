import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';

interface AboutProps {
  onProfileClick: () => void;
}

export default function About({ onProfileClick }: AboutProps): React.JSX.Element {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div>
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            About
          </p>

          <h2 className="flex items-center gap-2 text-4xl md:text-3xl font-bold mb-6 mt-4 leading-tight">
            My Introduction<FaStar size={18} className="inline-block ml-2 animate-bounce"/>
          </h2>

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center ">
            <img
              src="/profile1.png"
              alt="Profile"
              className="w-70 h-90 rounded-full object-cover border-2 border-zinc-700 shadow-2xl hover:scale-110 transition duration-300 bg-gradient-to-br hover:border-blue-400/50 backdrop-blur-sm hover:shadow-blue-500/50"
            />
          </div>

          <a download href="/P_vijay Resume.PDF" className="px-3 py-3 rounded-2xl border border-white/20 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
            Resume <FaDownload size={18} className="inline-block ml-2" />
          </a>
        </div>

        <div>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-8">
            Hello! I'm <span className="transition duration-100 font-medium text-blue-300 hover:text-blue-200 cursor-default italic text-sky-700 text-1.5xl">Priyanshu Vijay</span>. Immersed in the data science landscape, I transform raw data into actionable insights that blend innovation with efficiency. While my core passion for AI/ML drives me to explore cutting-edge algorithms, my interest in front-end development helps me build engaging user experiences.
          </p>
          <p className="text-zinc-400 text-2lg leading-relaxed">  
            Beyond pure coding, my entire mindset is shaped by design—whether I'm using a pencil on paper or tools like Figma and Blender. This artistic background helps me easily see things from other people's perspectives, allowing me to turn complex logic into creative, user-friendly experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
