'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Collection', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const openQuote = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-quote-panel'));
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const useDarkStyle = menuOpen || !heroVisible;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-40 flex flex-col items-center px-4 sm:top-6"
    >
      <div
        className={`pointer-events-auto grid w-[min(94vw,360px)] grid-cols-[1fr_auto_1fr] items-center rounded-none px-4 py-2.5 text-white transition-[background-color,border-color,box-shadow] duration-300 ${
          useDarkStyle
            ? 'border border-mist/22 bg-[#2f4156]/90 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(200,217,230,0.12)] backdrop-blur-md'
            : 'border border-white/24 bg-white/10 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md'
        }`}
      >
        <span aria-hidden="true" />

        <a href="#home" className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Home
        </a>

        <div className="flex justify-end">
          <motion.button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
            whileTap={{ scale: 0.96 }}
            className={`grid h-11 w-11 place-items-center text-white ${
              menuOpen
                ? 'border border-mist/45 bg-[#2f4156]/95'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'icon-close' : 'icon-menu'}
                initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="grid place-items-center"
            >
                {menuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pointer-events-auto mt-3 w-[min(94vw,360px)] rounded-none border border-mist/22 bg-[#2f4156]/90 p-5 text-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(200,217,230,0.12)] backdrop-blur-md sm:p-6"
          >
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-lg tracking-tight text-white/95 transition-colors hover:text-white/65"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-white/70">
              <p>(203) 629-2446</p>
              <p>allglassct@gmail.com</p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex min-h-11 w-full items-center justify-center gap-3 bg-steel px-5 py-3 text-[11px] font-semibold uppercase tracking-micro text-white transition-colors active:translate-y-px hover:bg-mist hover:text-[#2f4156]"
              >
                <ArrowUpRight size={16} />
                Get A Quote
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
