import React from 'react';

export default function Credentials(): React.JSX.Element {
  return (
    <section id="credentials" className="py-28 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Credentials
          </p>

          <h2 className="text-4xl md:text-3xl font-bold">
            Certificates & Research
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Certificates */}
          <div className="p-8 rounded-3xl border border-white/10 bg-black group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
            <h3 className="text-2xl font-bold mb-4">
              Certificates
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Showcasing technical certifications, workshops,
              hackathons, and achievements
            </p>
          </div>
          {/* Research Work */}
          <div className="p-8 rounded-3xl border border-white/10 bg-black group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
            <h3 className="text-2xl font-bold mb-4">
              Research Work
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Research on Indian market volatility forecasting system using NSE/BSE official data with Python, Random Forest, machine learning, predictive analytics techniques and forecasting market insights. 
            </p>
            <p className="text-sm text-zinc-500 mt-4 mb-6">
               • Volatility Forecasting • Machine Learning: Random Forest • Python Analytics • Risk Modeling • NSE|BSE Data
            </p>
                  
                <a className="px-6 py-3 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300 mb-10 ml-4"
                href='https://zenodo.org/records/20373118'>
                  Preview
                </a>
              
                <a href="/NCMPCS.PDF">
                  <button className="px-5 py-2 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 cursor-pointer transition duration-300 mb-10 ml-4">
                    Certificate 
                  </button>
                </a>
              

          </div>
        </div>
      </div>      
    </section>
  );
}
