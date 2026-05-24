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
            Certificates & Records
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
              hackathons, and achievements.
            </p>
          </div>

          {/* Records */}
          <div className="p-8 rounded-3xl border border-white/10 bg-black group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
            <h3 className="text-2xl font-bold mb-4">
              Records
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Showcasing my record and achievements in creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
