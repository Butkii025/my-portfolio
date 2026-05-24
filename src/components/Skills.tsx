import React from 'react';
import { FiMonitor, FiServer, FiCpu, FiBarChart2, FiLayers } from 'react-icons/fi';

interface SkillCategory {
  title: string;
  icon: React.JSX.Element;
  technologies: string[];
}

export default function Skills(): React.JSX.Element {
  const skills: Record<string, SkillCategory> = {
    frontEnd: {
      title: 'Front-End',
      icon: <FiMonitor size={24} className="text-blue-400" />,
      technologies: ['React.js', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Animations'],
    },
    backEnd: {
      title: 'Back-End & Databases',
      icon: <FiServer size={24} className="text-green-400" />,
      technologies: ['Node.js', 'Python', 'FastAPI', 'SQL', 'REST APIs'],
    },
    aiml: {
      title: 'AI/ML',
      icon: <FiCpu size={24} className="text-purple-400" />,
      technologies: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'APIs', 'Web Scraping', 'Pandas', 'NumPy', 'Scikit-learn', 'LightGBM', 'Deep Learning', 'Agentic AI'],
    },
    dataAnalytics: {
      title: 'Data Analytics',
      icon: <FiBarChart2 size={24} className="text-yellow-400" />,
      technologies: ['SQL', 'Pandas', 'Tableau', 'Power BI', 'Excel', 'A/B Testing', 'Data Wrangling', 'EDA'],
    },
    designing: {
      title: 'Designing',
      icon: <FiLayers size={24} className="text-pink-400" />,
      technologies: ['Figma', 'Adobe Photoshop', 'Canva', 'Blender'],
    },
  };

  return (
    <section id="skills" className="py-28 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Skills
          </p>

          <h2 className="text-4xl md:text-3xl font-bold">
            Tools & Technologies
          </h2>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(skills).map((category, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Technologies */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {category.technologies.join(' | ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
