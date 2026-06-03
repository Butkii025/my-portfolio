import React from 'react';

export default function Credentials(): React.JSX.Element {
  const cardStyle = "p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm transition duration-500 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 group w-[320px] md:w-[450px] shrink-0 snap-start flex flex-col justify-between";
  const btnStyle = "inline-block px-3 py-2 rounded-xl border border-zinc-800 hover:bg-white/10 active:bg-blue-400 text-sm transition duration-300 text-center";

  return (
    <section id="credentials" className="py-28 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Certification</h2>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory scrollbar-none">

          <div className={cardStyle}>
            <div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition duration-300">Work Related</h3>
              <p className="text-zinc-400 leading-relaxed mb-5 text-sm md:text-base">
                Certification related to Internship and professional experience
              </p>
            </div>
            
            <div className="flex flex-col gap-4 text-xs text-zinc-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5 pt-4">
                <span className="text-left leading-normal">• Internship on Data Analysis, at Science Tech Institute</span>
                <div className="flex gap-2 justify-start">
                  <a href="/credentials/pv-saifai-intership.PDF" className={btnStyle}>
                    Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Educational */}
          <div className={cardStyle}>
            <div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition duration-300">Educational</h3>
              <p className="text-zinc-400 leading-relaxed mb-5 text-sm md:text-base">
                Certification related to education, workshops, course-completion
              </p>
            </div>
            
            <div className="flex flex-col gap-4 text-xs text-zinc-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5 pt-4">
                <span>• Professional Communication, TCS</span>
                <a href="/credentials/TCS-certificate.PDF" className={btnStyle}>
                  Certificate
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>• Master Data Management (MDM), TCS</span>
                <a href="/credentials/MDM-TCS.PDF" className={btnStyle}>
                  Certificate
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>• Machine Learning Workshop at IIT Kanpur</span>
                <a href="/credentials/iit-kanpur-workshop.png" className={btnStyle}>
                  Certificate
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>• Conference at KMCLU</span>
                <a href="/credentials/KMCLU.png" className={btnStyle}>
                  Certificate
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className={cardStyle}>
            <div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition duration-300">Social Events</h3>
              <p className="text-zinc-400 leading-relaxed mb-5 text-sm md:text-base">
                Certification related to Events, Volunteering
              </p>
            </div>

            <div className="flex flex-col gap-4 text-xs text-zinc-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5 pt-4">
                <span>• Spirit 1.0 Chess Tournament</span>
                <a href="/credentials/pv-spirit1.0.png" className={btnStyle}>
                  Certificate
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>• Youth Parliament</span>
                <a href="/credentials/youth-parliament.png" className={btnStyle}>
                  Certificate
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>• Women-Day Act/Play</span>
                <a href="/credentials/play-on-womens day.png" className={btnStyle}>
                  Certificate
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>      
    </section>
  );
}