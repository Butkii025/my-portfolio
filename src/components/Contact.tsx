import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';
import { FiSmile } from 'react-icons/fi';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export default function Contact(): React.JSX.Element {
  const socialLinks: SocialLink[] = [
    { name: 'Email', icon: MdEmail, url: 'https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Butkii025' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/priyanshu-v-17243729b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Pinterest', icon: FaPinterest, url: 'https://pin.it/6WXws2ZFQ' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@me_priya_anshu_0?si=UpB7rvQMNGJuWPWS' },
    { name: 'Kaggle', icon: SiKaggle, url: 'https://www.kaggle.com/butkii' },
  ];

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
          Contact
        </p>

        <h2 className="text-5xl font-black mb-6">
          Let's Build Together
        </h2>

        <p className="text-zinc-400 text-2lg max-w-2xl mx-auto leading-relaxed mb-10">
          Interested in collaborations, projects, or creative ideas? Let's connect and create impactful digital experiences together.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 transition duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group"
                title={social.name}
              >
                <IconComponent className="text-2xl text-white group-hover:text-blue-400 group-hover:scale-125 transition duration-300" />
              </a>
            );
          })}
        </div>
        <br></br>
        <br></br>
        <p className="text-zinc-400 text-2lg max-w-2xl mx-auto leading-relaxed mb-10">
          Thank you for visiting my portfolio ~ feel free to reach out anytime <FiSmile size={18} className="inline-block text-white-400 animate-pulse" />
        </p>
      </div>
    </section>
  );
}
