import React from 'react';
import { FaPencil } from 'react-icons/fa6';

interface SemesterMark {
  sem: string;
  mark: number;
}

interface SchoolDetail {
  label: string;
  value: string | number;
  highlightColor: 'emerald' | 'blue';
}

export default function Education(): React.JSX.Element {
  const semesterMarks: SemesterMark[] = [
    { sem: 'Sem I', mark: 6.86 },
    { sem: 'Sem II', mark: 6.36 },
    { sem: 'Sem III', mark: 8.91},
    { sem: 'Sem IV', mark: 8.55},
    { sem: 'Sem V', mark: 9.64 },
  ];

  const schoolDetails: SchoolDetail[] = [
    {
        label: 'Marks', value: '75%',
        highlightColor: 'emerald'
    },
    { label: 'Stream', value: 'Science PCM', highlightColor: 'blue' },
    { label: 'Best Performance', value: 'Maths (95%)', highlightColor: 'blue' },
  ];

  return (
    <section id="education" className="py-20 px-6 text-zinc-400">
      <div className="max-w-3xl mx-auto">
        
        {/* Heading */}
        <h2 className="flex justify-center items-center gap-2 text-zinc-400 text-3xl md:text-2xl font-bold w-full mb-12 leading-tight">
          Education
          <FaPencil size={18} className="inline-block ml-2 animate-bounce" />
        </h2>

        <div className="relative border-l-4 border-zinc-600 ml-4 md:ml-20 pl-6 md:pl-8 space-y-12 py-2">
          
          {/* COLLEGE BLOCK */}
          <div className="relative">
           <span className="absolute -left-[38px] top-1.5 bg-zinc-900 border-2 text-zinc-400 font-semibold text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:animate-bounce hover:border-white hover:scale-110 active:scale-95">
              College
            </span>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ml-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <h3 className="text-white font-bold text-2lg tracking-wide group-hover:text-blue-400 transition duration-300">B.Tech in Computer Science and Engineering</h3>
                <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded-md w-fit">2023-2027</span>
              </div>
              <span className="text-xs bg-zinc-900 italic text-zinc-400 px-10 py-1 rounded-md w-fit flex items-center justify-center">Dr. Sakuntala Misra National Rehabilitaion University, Lucknow, India</span>
              
              <ul className="space-y-1.5 text-sm font-medium border-l border-zinc-800 pl-3 mt-4">
                {semesterMarks.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span> 
                    {item.sem} : {item.mark}
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
                <h3 className="text-white font-bold text-2lg tracking-wide group-hover:text-blue-400 transition duration-300">Higher Schooling (XII)</h3>
                <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded-md w-fit">May-2023</span>
              </div>
              <span className="text-xs bg-zinc-900 italic text-zinc-400 px-10 py-1 rounded-md w-fit flex items-center justify-center">New Public Inter College, Lucknow</span>
               
              <ul className="space-y-2 text-sm font-medium border-l border-zinc-800 pl-3 mt-4">
                {schoolDetails.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
                    <span>
                      {detail.label}:{' '}
                      <strong className={detail.highlightColor === 'emerald' ? 'text-zinc-400' : 'text-zinc-400'}>
                        {detail.value}
                      </strong>
                    </span>
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