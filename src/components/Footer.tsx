import { LuArrowUp } from "react-icons/lu";
import GradientText from "./ui/GradientText";
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
      { name: 'Email', icon: MdEmail, url: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!' },
      { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Butkii025' },
      { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/priyanshu-v-17243729b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
      { name: 'Pinterest', icon: FaPinterest, url: 'https://pin.it/6WXws2ZFQ' },
      { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@me_priya_anshu_0?si=UpB7rvQMNGJuWPWS' },
      { name: 'Kaggle', icon: SiKaggle, url: 'https://www.kaggle.com/butkii' },
    ];

  const iconSize = 18;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-2 sm:mt-1">
      <div className="pt-6 sm:pt-8 pb-4 sm:pb-6">


        <div className="flex justify-center gap-5 flex-wrap">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 hover:border-blue-400/50 transition duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer group"
                title={social.name}
              >
                <IconComponent className="text-2xl text-white/50 group-hover:text-blue-400 group-hover:scale-110 transition duration-300" />
              </a>
            );
          })}
        </div>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          <p className="text-xs sm:text-xs text-zinc-500 text-center sm:text-center">
            © {currentYear} P_Vijay Portfolio.
          </p>
          
          <button
            onClick={scrollToTop}
            className="cursor-pointer inline-flex items-center gap-2 text-xs sm:text-xs text-zinc-500 hover:text-blue-400 transition-colors duration-300 group active:scale-95 px-3 py-2 sm:px-0 sm:py-0 rounded-lg sm:rounded-none hover:bg-zinc-800/50 sm:hover:bg-transparent"
            aria-label="Scroll to top"
          >
            <GradientText
                  colors={["#f2f2f3", "#464546", "#8787da"]}
                  animationSpeed={20}
                  showBorder={false}
                  className="py-3 px-1 mt-3 inline"
                >
                  Back to top    <LuArrowUp />         

            </GradientText>
            
            <LuArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}