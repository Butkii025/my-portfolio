
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { LuArrowUp } from 'react-icons/lu';
import GradientText from '../ui/GradientText';
import { MdEmail } from 'react-icons/md';
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
} from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';

import { PROJECTS_DATA } from '@/src/Data/projectsData';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export default function Footer() {
  const pathname = usePathname();
  const isGalleryPage = pathname === '/gallery';

  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: MdEmail,
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!',
    },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Butkii025' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/priyanshu-v/' },
    { name: 'Pinterest', icon: FaPinterest, url: 'https://pin.it/6WXws2ZFQ' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@me_priya_anshu_0?si=UpB7rvQMNGJuWPWS' },
    { name: 'Kaggle', icon: SiKaggle, url: 'https://www.kaggle.com/butkii' },
  ];

  const featuredProjects = [
    ...PROJECTS_DATA.filter(project => project.url || project.code).slice(0, 5),
    ...PROJECTS_DATA.filter(
      project => project.name === 'mini-txt' && !(project.url || project.code)
    ),
  ].filter((project, index, self) =>
    self.findIndex(item => item.name === project.name) === index
  );

  // Explore links: two columns
  const exploreColumns = [
    [
      { label: 'Home', href: '/#hero' },
      { label: 'About', href: '/#about' },
      { label: 'Academics', href: '/#academics' },
      { label: 'Skills', href: '/#skills' },
      { label: 'Credentials', href: '/#credentials' },
    ],
    [
      { label: 'Research', href: '/#research' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: isGalleryPage ? '/gallery#contact' : '/#contact' },
    ],
  ];

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-100 px-6 pb-6 pt-8 dark:border-zinc-800 dark:bg-transparent md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">

        {/* FOOTER COLUMNS */}
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-zinc-100 pb-8 dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-3">

          {/* SELECTED PROJECTS */}
          <div>
            <h2 className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
              Selected Projects
            </h2>

            <ul className="flex flex-col gap-2.5">
              {featuredProjects.map(project => {
                const projectUrl = project.url || project.code;
                if (!projectUrl) return null;

                return (
                  <li key={project.name}>
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {project.title.split(' - ')[0]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* EXPLORE - TWO COLUMNS */}
          <div>
            <h2 className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
              Explore
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {exploreColumns.map((column, index) => (
                <ul key={index} className="flex flex-col gap-2.5">
                  {column.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h2 className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
              Connect
            </h2>

            <ul className="flex flex-col gap-2.5">
              {socialLinks.map(social => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect on ${social.name}`}
                    className="group inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <social.icon className="text-sm" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SIGNATURE */}
        <div
          aria-hidden="true"
          className="mb-8 mt-4 flex w-full items-center justify-center overflow-visible px-4"
        >
          <p
            className="whitespace-nowrap text-[clamp(3rem,9vw,8rem)] leading-[1.2] text-zinc-900/20 dark:text-white/20"
            style={{ fontFamily: 'var(--font-great-vibes)' }}
          >
            Priyanshu Vijay
          </p>
        </div>
        

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between">

          <p className="order-3 text-center text-xs text-zinc-400 dark:text-zinc-500 md:order-1 md:text-left">
            © {currentYear} P_Vijay Portfolio. Made with Black Magic ⚫
          </p>

          <div className="order-2 flex justify-center">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group inline-flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400 active:scale-95 dark:text-zinc-500"
            >
              <GradientText
                colors={['#f2f2f3', '#464546', '#7b9ce3']}
                animationSpeed={2}
                showBorder={false}
                className="inline"
              >
                Back to top
              </GradientText>
              <LuArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
