import React from 'react';
import { FaDownload, FaGithub, FaSadCry, FaSmile } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { MdWavingHand } from 'react-icons/md';
import GradientText from "./ui/GradientText";

interface HomeProps {
  onProfileClick: () => void;
}

export default function Home({ onProfileClick }: HomeProps): React.JSX.Element {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black opacity-90" />

      <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-center items-center mt-10">
        <div>
          <p className="flex items-center gap-2 uppercase tracking-[0.2em] text-white font-semibold text-sm mb-10">
             
          प्रियांशु <FiSmile size={18} className=" ml-2 animate-pulse" />
      
          </p>

          <h1 className="text-5xl md:text-4xl font-black leading-tight mb-3">
            Designer
            <span className="block text-zinc-400"> Data_Analyst & Creative_Coder</span>
          </h1>

          <p className="text-zinc-400 text-2lg leading-relaxed max-w-xl mb-8">
            Building intelligent systems powered by data and creativity
          </p>

          <div className="flex gap-4 flex-wrap">
            <a href="https://docs.google.com/document/d/14TxRuxXbM5NHvk2eK67MxWU4YnDQQSfl/edit?usp=sharing&ouid=111029989741912499048&rtpof=true&sd=true" className="px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300">
              Resume <FaDownload size={18} className="inline-block ml-2" />
            </a>

            <a href="https://github.com/Butkii025" target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-2xl border border-white/10 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300 inline-block">
              GitHub <FaGithub size={18} className="inline-block ml-2" />
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative w-[320px] h-[420px] rounded-[3rem] border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl transition duration-300 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              <img
                src="/profile.png"
                alt="Profile Full"
                className="w-40 h-40 rounded-full object-cover border-4 border-zinc-700 shadow-2xl cursor-pointer hover:scale-110 transition duration-300"
                onClick={onProfileClick}
              />

              <h2 className="text-3xl font-bold font-['Alex_Brush',_cursive] mb-2 mt-2">PRIYANSHU</h2>

              <p className="text-zinc-400 text-2lg">
                My friends regard me as an artist
              </p><br></br>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/10 active:bg-zinc-400 cursor-pointer transition duration-300">
                Say Hi <MdWavingHand size={18} className="inline-block ml-2 animate-wave" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
