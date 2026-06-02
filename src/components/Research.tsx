import React from 'react';

export default function Credentials(): React.JSX.Element {
  const cardStyle = "p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm transition duration-500 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 group";
  const btnStyle = "px-6 py-3 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 text-sm transition duration-300 text-center";

  return (
    <section id="research" className="py-28 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">Research</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Research & Blogs </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Research Work Card */}
          <div className={cardStyle}>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition duration-300">Research Work</h3>
            <p className="text-zinc-400 leading-relaxed">
              Research on Indian market volatility forecasting system using NSE/BSE official data with Python, Random Forest, machine learning, predictive analytics techniques and forecasting market insights.
            </p>
            <p className="text-xs text-zinc-500 mt-4 mb-6">
              • Volatility Forecasting • Machine Learning: Random Forest • Python Analytics • Risk Modeling • NSE|BSE Data
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/NCMPCS.PDF" className={btnStyle}>
                Certificate
              </a>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}