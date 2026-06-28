'use client';

import { LuArrowUp } from "react-icons/lu";
import GradientText from "../ui/GradientText";
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export default function Footer() {
  const socialLinks: SocialLink[] = [
    { name: 'Email',     icon: MdEmail,     url: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!' },
    { name: 'GitHub',    icon: FaGithub,    url: 'https://github.com/Butkii025' },
    { name: 'LinkedIn',  icon: FaLinkedin,  url: 'https://www.linkedin.com/in/priyanshu-v-17243729b' },
    { name: 'Pinterest', icon: FaPinterest, url: 'https://pin.it/6WXws2ZFQ' },
    { name: 'YouTube',   icon: FaYoutube,   url: 'https://youtube.com/@me_priya_anshu_0?si=UpB7rvQMNGJuWPWS' },
    { name: 'Kaggle',    icon: SiKaggle,    url: 'https://www.kaggle.com/butkii' },
  ];

  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="dark:bg-transparent border-t dark:border-zinc-800 border-zinc-100 px-6 md:px-12 lg:px-24 py-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <p className="text-xs dark:text-zinc-500 text-zinc-400 order-3 md:order-1 text-center md:text-left">
            © {currentYear} P_Vijay Portfolio. Made with Black Magic ⚫
          </p>
          
          <div className="flex justify-center order-2">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="inline-flex items-center gap-1.5 text-xs transition-all duration-300 cursor-pointer group active:scale-95
                dark:text-zinc-500 dark:hover:text-blue-400
                text-zinc-400 hover:text-blue-400"
            >
              <GradientText
                colors={["#f2f2f3", "#464546", "#7b9ce3"]}
                animationSpeed={2}
                showBorder={false}
                className="inline"
              >
                Back to top
              </GradientText>
              <LuArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end order-1 md:order-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer group
                    dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:hover:border-blue-400/60
                    dark:hover:shadow-[0_0_16px_rgba(96,165,250,0.25)]
                    bg-zinc-100 border border-zinc-200 hover:border-blue-400/60
                    hover:shadow-[0_0_16px_rgba(96,165,250,0.15)]"
                >
                  <Icon className="text-lg transition-all duration-300
                    dark:text-zinc-400 dark:group-hover:text-blue-400
                    text-zinc-500 group-hover:text-blue-400 group-hover:scale-110" />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
}