'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Outfit } from 'next/font/google';
import type { MouseEvent } from 'react';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export function HeroSection() {
  const openQuote = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.replaceState(null, '', '#quote');
    window.dispatchEvent(new CustomEvent('open-quote-panel'));
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[#2f4156] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/portfolio/store.jpg')",
          filter: 'brightness(0.34)',
        }}
      />
      <div className="absolute inset-0 bg-black/24" />

      <header className="absolute left-0 right-0 top-0 z-20 px-6 pt-6 md:px-10 md:pt-8">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between text-xs uppercase tracking-micro text-[#f5efeb]/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          <span>All Glass &amp; Mirror LLC</span>
          <a
            href="#quote"
            onClick={openQuote}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <ArrowUpRight size={14} />
            Get A Quote
          </a>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex h-full items-center justify-center px-6 pt-10"
      >
        <div className="mx-auto max-w-6xl text-center">
          <h1
            className={`${outfit.className} text-balance text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]`}
          >
            Premium Glass &amp; Mirror Solutions
          </h1>

          <p className="mx-auto mt-9 max-w-2xl text-balance text-sm tracking-wide text-white/78 md:text-base">
            Transforming spaces with custom glass and mirror installations for residential and
            commercial properties.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
