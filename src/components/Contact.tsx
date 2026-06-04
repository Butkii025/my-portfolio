import React from 'react';
import ContactForm from './contactform';
import { FaCoffee } from 'react-icons/fa';

export default function Contact(): React.JSX.Element {
  return (
    <section id="contact" className="py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
          Contact
        </p>

        <h2 className="text-5xl font-black mb-6">
          Let's Build Together
        </h2>

        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Interested in collaborations, projects, or creative ideas? Let's connect and create impactful digital experiences together.
        </p>
        
        <ContactForm />
        
        <p className="inline-flex items-center justify-center text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mt-10">
          Feel free to offer me chai<FaCoffee className="ml-2 text-amber-600" />
        </p>

      </div>
    </section>
  );
}