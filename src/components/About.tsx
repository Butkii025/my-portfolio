import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import GradientText from "./ui/GradientText";
import { FiSmile } from 'react-icons/fi';


interface AboutProps {
  onProfileClick: () => void;
}

interface SemesterMark {
  sem: string;
  mark: number;
}

interface SchoolDetail {
  label: string;
  value: string | number;
}

const semesterMarks: SemesterMark[] = [
  { sem: 'Sem I', mark: 6.86 },
  { sem: 'Sem II', mark: 6.36 },
  { sem: 'Sem III', mark: 8.91 },
  { sem: 'Sem IV', mark: 8.55 },
  { sem: 'Sem V', mark: 9.64 },
];

const schoolDetails: SchoolDetail[] = [
  
  { label: 'Stream', value: 'Science PCM' },
  { label: 'Best Performance', value: 'Maths (95%)' },
  {
    label: 'Marks',
    value: '75%',
  },
];

export default function About({ onProfileClick }: AboutProps): React.JSX.Element {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div>
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">About</p>

          <h2 className="flex items-center gap-2 text-4xl md:text-3xl font-bold mb-6 mt-4 leading-tight">
            My Introduction
            <FaStar size={18} className="inline-block ml-2 animate-bounce" />
          </h2>

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center ">
            <img
              src="/profile1.png"
              alt="Profile"
              className="w-70 h-90 rounded-full object-cover border-2 border-zinc-700 shadow-2xl hover:scale-110 transition duration-300 bg-gradient-to-br hover:border-blue-400/50 backdrop-blur-sm hover:shadow-blue-500/50"
            />
          </div>

          <a
            href="https://docs.google.com/document/d/14TxRuxXbM5NHvk2eK67MxWU4YnDQQSfl/edit?usp=sharing&ouid=111029989741912499048&rtpof=true&sd=true"
            className="px-3 py-3 rounded-2xl border border-white/20 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300"
          >
            Resume <FaDownload size={18} className="inline-block ml-2" />
          </a>
        </div>

        <div>
          <p className="text-zinc-400 text-2lg leading-relaxed max-w-xl mt-15">
            Hello! I'm{' '}
            <GradientText
                    colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                    animationSpeed={10}
                    showBorder={false}
                    className="inline cursor-default italic"
                  >
                    Priyanshu Vijay{' '}
            </GradientText>Passionate about AI & ML models, artistic creativity, data engineering, and futuristic UI design.
            Immersed in the data science landscape, I specialize in transforming raw data into actionable insights that
            blend innovation with efficiency. My drive for AI/ML exploration pushes me toward cutting-edge algorithms,
            while my interest in front-end development empowers me to design engaging, human-centered user experiences
          </p>
          <p className="text-zinc-400 text-2lg leading-relaxed mt-8">
            Beyond pure coding, my entire mindset is shaped by design, whether I'm using a pencil on paper or tools
            like Figma and Canva. This artistic background helps me easily see things from other people's perspectives,
            allowing me to turn complex logic into creative, user-friendly experiences.
          </p>
        </div>
      </div>

      {/* Heading */}

      <div className="max-w-3xl mx-auto mt-15">
        
        <h2 className="flex justify-center items-center gap-2 text-zinc-400 text-3xl md:text-2xl font-bold w-full mb-12 leading-tight">
          Education
          <FaPencil size={18} className="inline-block ml-2 animate-bounce" />
        </h2>

        <div className="relative border-l-4 border-zinc-600 ml-4 md:ml-20 pl-6 md:pl-8 space-y-12 py-2">
          {/*   COLLEGE BLOCK */}
          <div className="relative">
            <span className="absolute -left-[38px] top-1.5 bg-zinc-900 border-2 text-zinc-400 font-semibold text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:animate-bounce hover:border-white hover:scale-110 active:scale-95">
              College
            </span>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ml-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <h3 className="text-white font-bold text-2lg tracking-wide group-hover:text-blue-400 transition duration-300">
                  B.Tech in Computer Science and Engineering
                </h3>
                <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded-md w-fit">2023-2027</span>
              </div>
              <span className="text-xs bg-zinc-900 italic text-zinc-400 px-10 py-1 rounded-md w-fit flex items-center justify-center">
                Dr. Sakuntala Misra National Rehabilitation University, Lucknow, India
              </span>

              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-medium border-t border-zinc-900 pt-4 mt-2 text-zinc-400">
                {semesterMarks.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 bg-zinc-950/40 p-2 rounded-xl border border-zinc-900">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                    <span>{item.sem}: <strong className="text-zinc-400 font-semibold">{item.mark}</strong></span>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>

          {/* SCHOOL BLOCK */}
          <div className="relative">
            <span className="absolute -left-[38px] top-1.5 bg-zinc-900 border-2 text-zinc-400 font-semibold text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:animate-bounce hover:border-white hover:scale-110 active:scale-95">
              School
            </span>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ml-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <h3 className="text-white font-bold text-2lg tracking-wide group-hover:text-blue-400 transition duration-300">
                  Higher Schooling (XII)
                </h3>
                <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded-md w-fit">May-2023</span>
              </div>
              <span className="text-xs bg-zinc-900 italic text-zinc-400 px-10 py-1 rounded-md w-fit flex items-center justify-center">
                New Public Inter College, Lucknow
              </span>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium border-t border-zinc-900 pt-4 mt-2 text-zinc-400">
                {schoolDetails.map((detail, index) => (
                  <li key={index} className="flex flex-col gap-1 bg-zinc-950/40 p-3 rounded-xl border border-zinc-900">
                    <span className="text-xs text-zinc-500 font-normal uppercase tracking-wider">{detail.label}</span>
                    <span><strong className="text-zinc-400 font-semibold">{detail.value}</strong></span>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}