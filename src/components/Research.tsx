import React from 'react';

export default function Research(): React.JSX.Element {
  const researchTechnologies = [
    'Python',
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'Matplotlib',
    'API: NSE/BSE',
    'Random Forest',
    'Jupyter Notebook',
  ];

  return (
    <section id="research_work" className="py-28 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Research
          </p>

          <h2 className="text-4xl md:text-3xl font-bold mb-6">
            Research Work
          </h2>
        </div>

        <p className="text-zinc-400 leading-relaxed text-lg mb-8 max-w-3xl">
          My research work focuses on building intelligent systems and data-driven solutions. I work with cutting-edge tools and libraries to develop machine learning models, perform data analysis, and create scalable applications.
        </p>

        {/* Technologies Grid */}
        <div className="flex flex-wrap gap-3">
          {researchTechnologies.map((tech, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-400/30 hover:border-blue-400 transition duration-300 text-sm font-medium text-blue-300 hover:text-blue-200 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
