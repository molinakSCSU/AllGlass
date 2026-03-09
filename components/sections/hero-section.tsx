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
    <section
      id="home"
      className="relative min-h-dvh overflow-hidden bg-[#2f4156] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/portfolio/store.jpg')",
          filter: 'brightness(0.34)',
        }}
      />
      <div className="absolute inset-0 bg-black/24" />

      <header className="absolute left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 sm:pt-5 md:px-10 md:pt-8">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 text-[11px] uppercase tracking-micro text-stoneBase/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          <span>All Glass &amp; Mirror LLC</span>
          <a
            href="#quote"
            onClick={openQuote}
            className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white"
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
        className="relative z-10 flex min-h-dvh items-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:items-center md:px-10 md:pb-24 md:pt-24"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(250px,0.65fr)] md:items-end">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">
              Residential and commercial glazing in Connecticut
            </p>
            <h1
              className={`${outfit.className} mt-5 max-w-4xl text-balance text-4xl font-medium leading-[0.94] tracking-tight sm:text-5xl md:text-7xl lg:text-[6.25rem]`}
            >
              Premium glass and mirror work built to feel exact.
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/80 sm:text-lg">
              Custom shower enclosures, mirror cutting, window systems, and replacement work for
              homes, storefronts, and interior spaces that need clean details and lasting clarity.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" onClick={openQuote} className="cta-dark w-full sm:w-auto">
                <ArrowUpRight size={16} />
                Start Your Quote
              </a>
              <a
                href="tel:+12036292446"
                className="inline-flex min-h-11 w-full items-center justify-center border border-white/25 bg-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-micro text-white transition-colors active:translate-y-px hover:bg-white/18 sm:w-auto"
              >
                Call (203) 629-2446
              </a>
            </div>
          </div>

          <div className="grid gap-3 border border-white/14 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xs sm:grid-cols-3 md:grid-cols-1 md:justify-self-end md:p-6">
            <div className="space-y-1 border-b border-white/10 pb-3 sm:border-b-0 sm:pb-0 md:border-b md:pb-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Coverage</p>
              <p className="text-sm leading-relaxed text-white/84">
                Greenwich and Fairfield County
              </p>
            </div>
            <div className="space-y-1 border-b border-white/10 pb-3 sm:border-b-0 sm:pb-0 md:border-b md:pb-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Legacy</p>
              <p className="text-sm leading-relaxed text-white/84">Family owned since 1978</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Specialty</p>
              <p className="text-sm leading-relaxed text-white/84">
                Shower glass, mirrors, windows, and repairs
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
