'use client';

import { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { MessageCircle } from 'lucide-react';
import GradientText from '../ui/GradientText';


const commands: Record<string, string> = {
  help: 'Available commands: about, skills, projects, experience, research, github, contact, clear',
  about: 'I am Priyanshu Vijay, a Computer Science student interested in AI, ML and software development.',
  skills: 'Python | Machine Learning | Deep Learning | React | Next.js | TypeScript | Tailwind CSS',
  projects: 'Explore Bhoomi Nirvigna AI, India VIX Forecasting and Digital Health Record Management System in the Projects section.',
  experience: 'Explore my professional experience and practical work in the Experience section.',
  research: 'My research interests include Machine Learning, volatility forecasting and AI-driven solutions.',
  github: 'GitHub: https://github.com/Butkii025',
  contact: 'Scroll to the Contact section to connect with me.',
};

export default function DeveloperZone() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Priyanshu Vijay\'s Developer Terminal.',
    'Type "help" to explore available commands.',
  ]);

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault();

    const command = input.trim().toLowerCase();

    if (!command) return;

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const response = commands[command] || `Command not found: ${command}. Type "help" for available commands.`;

    setHistory((prev) => [
      ...prev,
      `visitor@priyanshu:~$ ${command}`,
      response,
    ]);

    setInput('');
  };

  const executeCommand = (cmd: string) => {
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    setHistory((prev) => [
      ...prev,
      `visitor@priyanshu:~$ ${cmd}`,
      commands[cmd] || `Command not found: ${cmd}`,
    ]);

    setInput('');
  };

  return (
    <section className="relative py-24 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
            Developer Zone 
          </p>

          <h2 className=" gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
            Beyond the <span className="text-blue-400">Code.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-center text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-500">
            Explore my coding activity and interact with my developer terminal.
          </p>
        </div>

        {/* FUTURISTIC DEVELOPER TERMINAL */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-blue-400/30 bg-[#070b14] shadow-[0_0_35px_rgba(59,130,246,0.12)]">
          {/* AMBIENT GLOW */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* SCANLINES */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, #ffffff 4px)',
            }}
          />

          {/* TERMINAL HEADER */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-blue-400/20 bg-[#0c1422]/90 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              </div>

              <span className="font-mono text-sm text-zinc-300">
                P_VIJAY <span className="text-blue-400">/</span> TERMINAL
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-blue-400">SYS.ACTIVE</span>
              <span className="flex items-center gap-1.5 text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                ONLINE
              </span>
            </div>
          </div>

          {/* TERMINAL BODY */}
          <div className="relative z-20 p-5 md:p-7">
            {/* SYSTEM IDENTITY */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-blue-400/15 pb-5">
              <div>
                <p className="mb-2 font-mono text-xs text-blue-400">
                  {'// INITIALIZING DEVELOPER INTERFACE'}
                </p>

                <h3 className="font-mono text-sm font-semibold text-zinc-100">
                  Welcome, Explorer<span className="animate-pulse text-blue-400">_</span>
                </h3>

                <p className="mt-1 font-mono text-xs text-zinc-500">
                  Interactive Portfolio Command System
                </p>
              </div>

              <div className="rounded-lg border border-blue-400/20 bg-blue-400/5 px-4 py-2 font-mono text-xs">
                <p className="text-zinc-500">ACCESS LEVEL</p>
                <p className="mt-1 text-blue-400">GUEST // 01</p>
              </div>
            </div>

            {/* COMMAND HISTORY */}
            <div className="mb-5 max-h-72 min-h-48 space-y-2 overflow-y-auto pr-2 font-mono text-sm">
              {history.map((line, index) => (
                <p
                  key={index}
                  className={`whitespace-pre-wrap break-words ${
                    line.startsWith('visitor@')
                      ? 'text-green-400'
                      : 'text-zinc-300'
                  }`}
                >
                  {line}
                </p>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <span className="shrink-0 font-mono text-sm text-green-400">
                  visitor@priyanshu:~$
                </span>

                <form onSubmit={runCommand} className="flex min-w-0 flex-1">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command..."
                    autoComplete="off"
                    className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-600"
                  />
                  <span className="animate-pulse text-blue-400">▋</span>
                </form>
              </div>
            </div>

            {/* QUICK COMMANDS */}
            <div className="border-t border-blue-400/15 pt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500">
                  QUICK ACCESS
                </span>
                <span className="font-mono text-xs text-blue-400">
                  SELECT COMMAND
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {['help', 'about', 'skills', 'projects', 'experience', 'research', 'github', 'contact','clear'].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className="rounded-md border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 font-mono text-xs text-blue-400 transition duration-300 hover:border-blue-400/60 hover:bg-blue-400/15 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* CHAT WITH Ai */}
            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl
              border border-white/10 bg-[#0b1220]/80 p-4
              transition-all duration-300 hover:border-blue-400/40 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-blue-500/10 text-blue-400">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <h3 className="font-serif text-4xl font-semibold text-white"><GradientText
                                  colors={['#cb6bbd', '#464546', '#7b9ce3']}
                                  animationSpeed={2}
                                  showBorder={false}
                                  className="inline"
                                >
                                  Chat in Natural Language
                                </GradientText>
                    
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    Ask anything. Explore my portfolio with Gemini AI bot.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-kiran-chat"))}
                className="shrink-0 rounded-xl border border-blue-400/30
                  bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400
                  transition hover:border-blue-400/60 hover:bg-blue-500/20"
              ><GradientText
                                  colors={['#b5cb6b', '#a076a0', '#4272db']}
                                  animationSpeed={8}
                                  showBorder={false}
                                  className="inline"
                                >
                                  Chat now ↗
                                </GradientText>
                
              </button>
            </div>
          </div>

          {/* FOOTER STATUS BAR */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-blue-400/20 bg-[#0c1422]/80 px-5 py-3 font-mono text-xs">
            <span className="text-zinc-500">
              priyanshu@ai
            </span>
            <span className="text-green-400">
              ● SYSTEM READY
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
