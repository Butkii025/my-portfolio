'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface Component {
  id: string;
  name: string;
  category: string;
  code: string;
  preview: React.ReactNode;
}

const CATEGORIES = ['All', 'Buttons', 'Cards', 'Loaders', 'Interactions', 'Forms'];

const COMPONENTS: Component[] = [
  // Buttons
  {
    id: 'btn-gradient',
    name: 'Gradient Button',
    category: 'Buttons',
    code: '<motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">\n  Click\n</motion.button>',
    preview: (
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      >
        Click
      </motion.button>
    ),
  },
  {
    id: 'btn-shimmer',
    name: 'Shimmer Button',
    category: 'Buttons',
    code: '<motion.button className="relative px-6 py-3 rounded-lg bg-zinc-900 text-white overflow-hidden">\n  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" animate={{ x: ["0%", "100%"] }} />\n  Shimmer\n</motion.button>',
    preview: (
      <motion.button className="relative px-6 py-3 rounded-lg bg-zinc-900 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Shimmer
      </motion.button>
    ),
  },
  // Cards
  {
    id: 'card-glass',
    name: 'Glassmorphism',
    category: 'Cards',
    code: '<motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:shadow-2xl">\n  Glass Card\n</motion.div>',
    preview: (
      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:shadow-2xl w-40 text-center text-sm font-semibold dark:text-white"
      >
        Glass Card
      </motion.div>
    ),
  },
  {
    id: 'card-tilt',
    name: '3D Tilt Card',
    category: 'Cards',
    code: '<motion.div style={{ perspective: 1000 }} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/50">\n  3D Tilt\n</motion.div>',
    preview: (
      <motion.div
        style={{ perspective: 1000 }}
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/50 w-40 text-center text-sm font-semibold dark:text-white"
      >
        3D Tilt
      </motion.div>
    ),
  },
  // Loaders
  {
    id: 'loader-spin',
    name: 'Spinner',
    category: 'Loaders',
    code: '<motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-8 border-3 border-transparent border-t-blue-500 rounded-full" />',
    preview: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-8 h-8 border-3 border-transparent border-t-blue-500 rounded-full"
      />
    ),
  },
  {
    id: 'loader-pulse',
    name: 'Pulse Dots',
    category: 'Loaders',
    code: '<div className="flex gap-2">\n  {[0,1,2].map(i => (\n    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ delay: i*0.2 }} className="w-2 h-2 rounded-full bg-blue-500" />\n  ))}\n</div>',
    preview: (
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-blue-500"
          />
        ))}
      </div>
    ),
  },
  // Interactions
  {
    id: 'badge-float',
    name: 'Floating Badge',
    category: 'Interactions',
    code: '<motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">\n  New\n</motion.span>',
    preview: (
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      >
        New
      </motion.span>
    ),
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    category: 'Interactions',
    code: 'const [isOn, setIsOn] = useState(false);\nreturn (\n  <motion.button onClick={() => setIsOn(!isOn)} className={`w-14 h-8 rounded-full ${isOn ? "bg-blue-500" : "bg-gray-300"}`}>\n    <motion.div animate={{ x: isOn ? 28 : 4 }} className="w-6 h-6 bg-white rounded-full" />\n  </motion.button>\n);',
    preview: <TogglePreview />,
  },
  // Forms
  {
    id: 'input-focus',
    name: 'Focus Input',
    category: 'Forms',
    code: '<motion.input whileFocus={{ borderColor: "#60a5fa" }} className="w-full px-4 py-3 rounded-lg border-2 border-zinc-300 bg-transparent focus:outline-none" placeholder="Type..." />',
    preview: (
      <motion.input
        whileFocus={{ borderColor: '#60a5fa' }}
        className="w-40 px-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 dark:bg-transparent dark:text-white bg-transparent focus:outline-none text-sm"
        placeholder="Type..."
      />
    ),
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    category: 'Forms',
    code: '<div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">\n  <motion.div animate={{ width: "75%" }} className="h-full bg-gradient-to-r from-blue-500 to-purple-600" />\n</div>',
    preview: (
      <div className="w-40 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          animate={{ width: '75%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
        />
      </div>
    ),
  },
];

function TogglePreview() {
  const [isOn, setIsOn] = React.useState(false);
  return (
    <motion.button
      onClick={() => setIsOn(!isOn)}
      className={`relative w-14 h-8 rounded-full transition ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}
    >
      <motion.div
        animate={{ x: isOn ? 28 : 4 }}
        className="w-6 h-6 bg-white rounded-full absolute top-1"
      />
    </motion.button>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="p-3 rounded-lg dark:bg-zinc-900 bg-zinc-100 text-[10px] overflow-x-auto dark:text-zinc-300 text-zinc-700 max-h-32 overflow-y-auto">
        <code>{code}</code>
      </pre>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg dark:bg-zinc-800 bg-zinc-200 opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? (
          <FiCheck className="text-emerald-500" size={14} />
        ) : (
          <FiCopy className="dark:text-zinc-400 text-zinc-600" size={14} />
        )}
      </motion.button>
    </div>
  );
}

export default function ComponentLibraryCarousel(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filtered =
    selectedCategory === 'All'
      ? COMPONENTS
      : COMPONENTS.filter(c => c.category === selectedCategory);

  return (
    <section id="creative_corner" className="pt-8 pb-28 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Creative_Corner</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Component Library
              </h2>
            </div>
              <p className="leading-relaxed mb-10 dark:text-zinc-400 text-zinc-500 text-base   max-w-3xl">
               Ready to Use Component Card which I used in my Portfolio..
              </p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'dark:bg-blue-500 dark:text-white bg-blue-600 text-white shadow-lg'
                  : 'dark:bg-white/10 dark:text-zinc-400 bg-zinc-100 text-zinc-700'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {selectedCategory === 'All' ? (
          <>
            <div className="relative w-full overflow-hidden py-8 dark:bg-zinc-900/30 bg-zinc-100/60 rounded-xl">
              <div className="flex w-max gap-6 px-4" style={{ animation: 'marquee 45s linear infinite' }}>
                {[...filtered, ...filtered].map((comp, i) => (
                  <motion.div
                    key={`${comp.id}-${i}`}
                    className="shrink-0 p-6 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-zinc-200 w-80"
                  >
                    <div className="mb-4 p-6 rounded-lg dark:bg-white/5 bg-zinc-50 border dark:border-white/10 border-zinc-200 flex items-center justify-center min-h-32">
                      {comp.preview}
                    </div>

                    <h3 className="text-base font-semibold dark:text-white text-black mb-3">
                      {comp.name}
                    </h3>

                    <CodeBlock code={comp.code} />
                  </motion.div>
                ))}
              </div>

              <div className="absolute left-0 top-0 h-full w-12 pointer-events-none z-10 dark:bg-gradient-to-r dark:from-black dark:to-transparent bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 h-full w-12 pointer-events-none z-10 dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent" />
            </div>

            <p className="text-xs dark:text-zinc-500 text-zinc-400 text-center mt-4">
              ← drag / swipe to explore →
            </p>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((comp) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-zinc-200"
                >
                  <div className="mb-4 p-6 rounded-lg dark:bg-white/5 bg-zinc-50 border dark:border-white/10 border-zinc-200 flex items-center justify-center min-h-32">
                    {comp.preview}
                  </div>

                  <h3 className="text-base font-semibold dark:text-white text-black mb-3">
                    {comp.name}
                  </h3>

                  <CodeBlock code={comp.code} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}