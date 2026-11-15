
'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft, FiChevronRight, FiX, FiExternalLink,
  FiArrowUpRight, FiImage,
} from 'react-icons/fi';

import { ART_IMAGES, RANGOLI_FACTS } from '@/src/Data/creativeData';
import ArtCard from '@/src/components/ArtCard';
import FunZone from './FunZone';

const reveal = {
  hidden: { opacity: 0, y: 45 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};

const Reveal = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    className={className}
  >
    {children}
  </motion.div>
);

const Item = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div variants={reveal} className={className}>{children}</motion.div>
);

function SectionTitle({ eyebrow, title, accent }: {
  eyebrow: string; title: string; accent: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-10"
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, x: -25 },
          show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
        }}
        className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-blue-400"
      >
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-blue-400"
        />
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
          show: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.9, ease: 'easeOut' },
          },
        }}
        className="font-serif text-4xl italic sm:text-5xl md:text-6xl"
      >
        {title}{' '}
        <motion.span
          className="relative inline-block font-semibold not-italic text-blue-400"
          animate={{
            textShadow: [
              '0 0 0px rgba(96,165,250,0)',
              '0 0 22px rgba(96,165,250,0.45)',
              '0 0 0px rgba(96,165,250,0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {accent}
          <motion.span
            className="absolute -bottom-2 left-0 h-[2px] bg-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.span>
      </motion.h2>
    </motion.div>
  );
}

const rangoliImages = [
  { src: '/a.png', alt: 'Kala Arpan artwork moment' },
  { src: '/B.png', alt: 'Featured Kala Arpan artwork' },
  { src: '/C.png', alt: 'Team Kala Arpan artwork' },
];

export default function CreativeCorner() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const next = useCallback(() => {
    setSelected(i => i === null ? 0 : (i + 1) % ART_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setSelected(i => i === null ? 0 : (i - 1 + ART_IMAGES.length) % ART_IMAGES.length);
  }, []);

  useEffect(() => {
    if (selected === null) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const keys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setSelected(null);
    };

    window.addEventListener('keydown', keys);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', keys);
    };
  }, [selected, next, prev]);

  return (
    <section id="creative_corner" className="overflow-hidden py-16 text-zinc-900 dark:text-zinc-100">

      {/* 01 — COVER */}
      <Reveal className="mx-auto mb-28 max-w-7xl px-5 md:px-10 lg:px-16">
        <Item>
          <p className="mb-8 font-mono text-xs tracking-[0.35em] text-blue-400">
            BEYOND THE CODE.
          </p>
        </Item>

        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <Item>
            <h1 className="font-serif text-7xl font-light leading-[0.85] sm:text-8xl md:text-[9rem]">
              PORT<span className="italic text-blue-400">FOLIO</span>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-zinc-500">
              Not everything I create lives on a screen.
              Some things are drawn, imagined, crafted and felt.
            </p>
          </Item>

          <Item className="flex flex-col items-center">
            <motion.img
              src="/cat.png"
              alt="My little creative companion"
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-56 w-56 object-contain sm:h-64 sm:w-64"
            />
            <p className="font-serif text-lg italic text-blue-400">little companion</p>
          </Item>
        </div>
      </Reveal>

      {/* 02 — MEET THE ARTIST */}
      <Reveal className="mx-auto mb-28 max-w-7xl px-5 md:px-10 lg:px-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <Item className="order-2 md:order-1">
            <p className="mb-3 text-xs tracking-[0.3em] text-blue-400">
              THE ARTIST'S SPACE
            </p>
            <h2 className="font-serif text-6xl font-light leading-[0.9] sm:text-7xl md:text-8xl lg:text-[7rem]">
              Meet<br />the <span className="italic text-blue-400">Artist.</span>
            </h2>
            <p className="mt-8 max-w-lg font-serif text-lg italic leading-8 text-zinc-500">
              Sketching emotions, shaping colours and turning blank spaces
              into stories. Every creation carries a little piece of me.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-12 bg-blue-400" />
              <span className="font-serif text-sm italic text-zinc-500">Philosophy</span>
            </div>
            <p className="mt-5 font-serif text-2xl italic sm:text-3xl">
              I CREATE <span className="text-blue-400">WITH EMOTION.</span>
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Priyanshu Vijay · She / Her · Engineer & Artist
            </p>
          </Item>

          <Item className="order-1 mx-auto w-full max-w-[370px] md:order-2">
            <motion.img
              src="/hello_pv.jpeg"
              alt="Priyanshu Vijay"
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.4 }}
              className="w-full object-contain grayscale-[15%] transition duration-700 hover:grayscale-0"
            />
            <p className="mt-2 text-right font-serif italic text-blue-400">
              Artist by passion
            </p>
          </Item>
        </div>
      </Reveal>

      {/* 03 — ARTWORK ARCHIVE */}
      <Reveal className="mb-28">
        <Item className="mx-auto mb-8 flex max-w-7xl items-end justify-between px-5 md:px-10 lg:px-16">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-blue-400">THE ART ARCHIVE</p>
            <h2 className="font-serif text-4xl italic sm:text-5xl">Selected Works.</h2>
          </div>
          <span className="hidden font-mono text-[10px] tracking-widest text-zinc-500 sm:block">
            SCROLL TO EXPLORE →
          </span>
        </Item>

        <Item>
          <div className="relative overflow-hidden border-y border-zinc-200 py-12 dark:border-white/10 md:py-16">
            <motion.div
              className="flex w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {[...ART_IMAGES, ...ART_IMAGES].map((img, i) => (
                <ArtCard
                  key={`${img.name}-${i}`}
                  image={img}
                  index={i % ART_IMAGES.length}
                  onClick={() => setSelected(i % ART_IMAGES.length)}
                />
              ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-black" />
          </div>
        </Item>
      </Reveal>

      {/* 04 — PIXELANSH */}
      <Reveal className="mx-auto mb-28 max-w-7xl px-5 md:px-10 lg:px-16">
        <Item>
          <SectionTitle eyebrow="WHERE ART MEETS TECHNOLOGY" title="Live" accent="Project." />
        </Item>

        <div className="grid items-center gap-10 border-b border-zinc-300 pb-14 dark:border-white/15 lg:grid-cols-2">
          <Item className="relative flex min-h-[320px] items-center justify-center">
            <motion.img
              src="/gallery-logo.png"
              alt="PixelAnsh"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-h-[250px] w-full object-contain"
            />
            <span className="absolute left-5 top-5 font-mono text-[10px] tracking-widest text-blue-400">
              WEB-APPLICATION
            </span>
          </Item>

          <Item>
            <span className="flex items-center gap-2 text-xs tracking-widest text-blue-400">
              <FiImage /> ARTISTIC E-COMMERCE
            </span>
            <h3 className="mt-5 font-serif text-5xl sm:text-6xl">
              Pixel<span className="italic text-blue-400">Ansh.</span>
            </h3>
            <p className="mt-6 text-sm leading-8 text-zinc-500">
              More than an e-commerce platform, PixelAnsh is where creativity
              finds its marketplace. I built this functional platform to help
              artists showcase their creations, connect with art lovers and
              take their work into digital commerce.
            </p>
            <p className="mt-4 text-sm leading-8 text-zinc-500">
              Artists can collaborate, present and sell their artwork while
              reaching a wider creative community. The platform has already
              helped ship more than 70 artworks.
            </p>

            <div className="mt-8 flex gap-10">
              <div>
                <h4 className="text-4xl font-semibold text-blue-400">70+</h4>
                <p className="mt-1 text-xs text-zinc-500">Artworks shipped</p>
              </div>
              <div>
                <h4 className="text-4xl font-semibold text-blue-400">Live</h4>
                <p className="mt-1 text-xs text-zinc-500">Functional platform</p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-6">
              <a
                href="https://pixelansh.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-blue-400 pb-2 text-sm font-semibold text-blue-400"
              >
                Explore PixelAnsh
                <FiArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://pixelansh.vercel.app/commission"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-zinc-400 pb-2 text-sm text-zinc-500 hover:text-blue-400"
              >
                Request a portrait <FiArrowUpRight />
              </a>
            </div>
          </Item>
        </div>
      </Reveal>

      {/* 05 — KALA ARPAN */}
      <Reveal className="mx-auto mb-28 max-w-7xl px-5 md:px-10 lg:px-16">
        <Item>
          <SectionTitle eyebrow="ART BEYOND THE CANVAS" title="Art in" accent="Action." />
        </Item>

        <div className="grid items-center gap-10 border-b border-zinc-300 pb-12 dark:border-white/15 lg:grid-cols-[1.2fr_0.8fr]">
          <Item>
            <p className="mb-5 font-mono text-[10px] tracking-widest text-blue-400">
              ON-GROUND ARTWORK · AWARD-WINNING MOMENT
            </p>
            <p className="mt-7 text-sm leading-8 text-zinc-500 md:text-base">
              Some art is created with a brush. Some is created with thousands
              of little pieces, a shared vision and a purpose bigger than ourselves.
            </p>
            <p className="mt-5 text-sm leading-8 text-zinc-500 md:text-base">
              At Bhoomi Fest 2026, Lucknow University, Team Kala_Arpan created
              a monumental rangoli installation using 50,000 disposable cups,
              covering approximately 2,500 square feet. Created in collaboration
              with SFD-Awadh, the installation stood as a tribute to the victims
              of the Pahalgam tragedy.
            </p>
            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">Kala_Arpan.</h3>

            <div className="mt-8 flex flex-wrap gap-8">
              {[
                ['50,000', 'Disposable cups'],
                ['2,500', 'Sq. ft. coverage'],
                ['2026', 'Bhoomi Fest · LU'],
              ].map(([value, label]) => (
                <div key={label}>
                  <h4 className="text-3xl font-semibold text-blue-400">{value}</h4>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {RANGOLI_FACTS.map((fact, i) => (
                <span key={i} className="text-xs text-zinc-500">
                  {fact.icon} {fact.text}
                </span>
              ))}
            </div>

            <a
              href="https://www.youtube.com/shorts/lpRupMkGGaM"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 border-b border-blue-400 pb-2 text-sm font-semibold text-blue-400"
            >
              झलक <FiExternalLink />
            </a>
          </Item>

          {/* INTERACTIVE THREE-IMAGE FEATURE */}
          <Item className="relative mx-auto w-full max-w-[560px]">
            <div className="relative flex h-[340px] items-center justify-center sm:h-[430px]">
              <svg
                viewBox="0 0 500 130"
                className="absolute -top-8 z-20 w-full overflow-visible"
                fill="none"
              >
                <motion.path
                  d="M35 112 C90 -5 400 -5 465 112"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="6 7"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
              </svg>

              <span className="absolute -top-12 z-30 font-serif text-lg italic text-blue-400">
                Bhoomi Fest '26
              </span>

              {rangoliImages.map((img, i) => (
                <motion.img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setActiveImage(activeImage === i ? null : i)}
                  initial={{
                    opacity: 0,
                    x: i === 0 ? 50 : i === 2 ? -50 : 0,
                    scale: 0.85,
                  }}
                  whileInView={{
                    opacity: activeImage === null || activeImage === i ? 1 : 0.55,
                    x: 0,
                    scale: activeImage === i ? 1.12 : 1,
                  }}
                  animate={{
                    filter: activeImage === null || activeImage === i
                      ? 'blur(0px) grayscale(0%)'
                      : 'blur(2px) grayscale(65%)',
                    zIndex: activeImage === i ? 40 : i === 1 ? 20 : 10,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  whileHover={{ scale: activeImage === i ? 1.12 : 1.05 }}
                  className={`absolute cursor-pointer object-contain ${
                    i === 1 ? 'left-1/2 h-full w-[58%] -translate-x-1/2' : 'h-[65%] w-[34%]'
                  } ${i === 0 ? 'left-0' : i === 2 ? 'right-0' : ''}`}
                />
              ))}
            </div>

            <p className="mt-2 text-center font-serif text-sm italic text-blue-400">
              {activeImage === null
                ? 'Three frames. One unforgettable creation.'
                : 'A closer look — click again to restore.'}
            </p>
          </Item>
        </div>

        <Item className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-serif text-2xl italic">
            Award-winning creation by Team Kala_Arpan.
          </h4>
          <a
            href="https://www.youtube.com/shorts/lpRupMkGGaM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
          >
            Watch the moment <FiArrowUpRight />
          </a>
        </Item>
      </Reveal>

      {/* 06 — ARTIST PORTRAIT + FUN ZONE */}
      <Reveal className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
        <Item className="text-center">
          <p className="mb-5 text-xs tracking-[0.3em] text-blue-400">
            A LITTLE SOMETHING EXTRA
          </p>
          <h2 className="mb-12 font-serif text-4xl italic text-zinc-500 sm:text-5xl">
            Since you've come this far, here's some cool stuff.
          </h2>
        </Item>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* YOUR IMAGE — LEFT OF FUN ZONE */}
          <Item className="flex justify-center">
            <motion.img
              src="/sticker.png"
              alt="Priyanshu — creative engineer and artist"
              loading="lazy"
              whileHover={{ y: -10, scale: 1.035 }}
              transition={{ duration: 0.6 }}
              className="max-h-[480px] w-full object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.18)]"
            />
          </Item>
          {/* <Item className="flex justify-center">
            <motion.img
              src="/card.png"
              alt="Priyanshu — creative engineer and artist"
              loading="lazy"
              whileHover={{ y: -10, scale: 1.035 }}
              transition={{ duration: 0.6 }}
              className="max-h-[480px] w-full object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.18)]"
            />
          </Item> */}

          {/* FUN ZONE — RIGHT */}
          <Item className="flex justify-center">
            <FunZone />
          </Item>
        </div>
      </Reveal>

      {/* ARTWORK LIGHTBOX */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-5"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Artwork viewer"
              className="relative flex flex-col items-center gap-5"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close artwork viewer"
                className="absolute -right-3 -top-3 z-10 rounded-full bg-zinc-800 p-3 text-white"
              >
                <FiX />
              </button>

              <img
                key={selected}
                src={`/${ART_IMAGES[selected].name}`}
                alt={`Artwork ${selected + 1}`}
                className="max-h-[75vh] max-w-[88vw] object-contain"
              />

              <div className="flex items-center gap-6">
                <button onClick={prev} aria-label="Previous artwork" className="text-white">
                  <FiChevronLeft size={25} />
                </button>
                <span className="font-mono text-xs text-zinc-400">
                  {selected + 1} / {ART_IMAGES.length}
                </span>
                <button onClick={next} aria-label="Next artwork" className="text-white">
                  <FiChevronRight size={25} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
