'use client';

import React, { useRef } from 'react';

function useTiltCard(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * strength;
    const rotateY = (x / rect.width) * strength;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / rect.width) * 60;
      const gy = 50 + (y / rect.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.15), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

interface CredentialItem {
  label: string;
  href: string;
}

interface CredentialCardProps {
  title: string;
  desc: string;
  items: CredentialItem[];
}

function CredentialCard({ title, desc, items }: CredentialCardProps) {
  const tilt = useTiltCard(8);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
        hover:shadow-2xl hover:shadow-blue-500/10
        dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
        border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50
        w-[320px] md:w-[450px] shrink-0 snap-start flex flex-col justify-between"
    >
      <div
        className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 transition duration-300
          dark:text-white dark:group-hover:text-blue-400
          text-zinc-800 group-hover:text-blue-400">
          {title}
        </h3>
        <p className="leading-relaxed mb-5 text-sm md:text-base
          dark:text-zinc-400 text-zinc-500">
          {desc}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-3 text-sm">
        {items.map((item, i) => (
          <div
            key={i}
            className={`pt-3 ${i === 0 ? 'border-t dark:border-white/5 border-zinc-200' : ''}`}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-all duration-300
                dark:text-zinc-500 dark:hover:text-blue-400
                text-zinc-500 hover:text-blue-400
                hover:scale-[1.03] origin-left"
            >
              <span className="dark:text-zinc-300 text-zinc-400">•</span>
              <span className="hover:underline underline-offset-2">{item.label}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Credentials(): React.JSX.Element {
  const cards: CredentialCardProps[] = [
    {
      title: 'Work Related',
      desc: 'Certification related to Internship and professional experience',
      items: [
        { label: 'Internship in ML / AI at Beeskilled [JUNE-2026]', href: '/credentials/ML-AI.PDF' },
        { label: 'Experience as Data Analyst at Beeskilled [MAY-2026]', href: '/credentials/DataAnalyst.PDF' },
        { label: 'Data Analysis Intern at Science Tech Institute, UP.Gov [JULY-2025] ', href: '/credentials/pv-saifai-intership.PDF' },
        ],
    },
    {
      title: 'Educational',
      desc: 'Certification related to education, workshops, course-completion',
      items: [
        { label: 'Master Data Management (MDM), TCS', href: '/credentials/MDM-TCS.PDF' },
        { label: 'Workshop of Machine Learning at IIT Kanpur', href: '/credentials/iit-kanpur-workshop.png' },
        { label: 'Conference at KMCLU', href: '/credentials/KMCLU.png' },
      ],
    },
    {
      title: 'Social Events',
      desc: 'Certification related to Events,Volunteering, Social Netwoking',
      items: [
        { label: 'Spirit 1.0 Chess Tournament', href: '/credentials/pv-spirit1.0.png' },
        { label: 'Youth Parliament', href: '/credentials/youth-parliament.png' },
        { label: 'Women-Day Act/Play', href: '/credentials/play-on-womens-day.png' },
      ],
    },
  ];

  return (
    <section id="credentials" className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">Certification</h2>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory
          [&::-webkit-scrollbar]:h-1.5
          dark:[&::-webkit-scrollbar-track]:bg-zinc-900
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800
          [&::-webkit-scrollbar-track]:bg-zinc-100
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full">
          {cards.map((card, i) => (
            <CredentialCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}