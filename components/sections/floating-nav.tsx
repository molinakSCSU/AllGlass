'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Recent Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [manualMenuOpen, setManualMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [footerReadyToOpen, setFooterReadyToOpen] = useState(false);
  const [footerDismissed, setFooterDismissed] = useState(false);
  const autoFooterOpen = footerReadyToOpen && !footerDismissed;
  const menuOpen = manualMenuOpen || autoFooterOpen;
  const glassMode = heroVisible || footerVisible;

  const openQuote = () => {
    setManualMenuOpen(false);
    setFooterDismissed(true);
    window.dispatchEvent(new CustomEvent('open-quote-panel'));
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (manualMenuOpen) {
          setManualMenuOpen(false);
          return;
        }

        if (autoFooterOpen) {
          setFooterDismissed(true);
        }
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [autoFooterOpen, manualMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const syncMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncMobile();
    mediaQuery.addEventListener('change', syncMobile);
    return () => mediaQuery.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const heroThreshold = isMobile ? 0.82 : 0.08;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.intersectionRatio >= heroThreshold);
      },
      { threshold: [0, 0.08, 0.55, 0.82, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const footerThreshold = isMobile ? 0.12 : 0.65;
    const footerOpenThreshold = isMobile ? 0.92 : 0.65;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const isFooterVisible = ratio >= footerThreshold;
        const canAutoOpenFooter = ratio >= footerOpenThreshold;

        setFooterVisible(isFooterVisible);
        setFooterReadyToOpen(canAutoOpenFooter);

        if (!isFooterVisible) {
          setFooterDismissed(false);
        }
      },
      { threshold: [0, 0.12, 0.65, 0.92, 1] }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = manualMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [manualMenuOpen]);

  const useDarkStyle = !glassMode;
  const panelClassName = glassMode
    ? 'pointer-events-auto mb-3 w-[min(92vw,320px)] rounded-none border border-white/24 bg-white/10 p-5 text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md sm:mb-0 sm:mt-3 sm:p-6'
    : 'pointer-events-auto mb-3 w-[min(92vw,320px)] rounded-none border border-mist/22 bg-[#2f4156]/90 p-5 text-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(200,217,230,0.12)] backdrop-blur-md sm:mb-0 sm:mt-3 sm:p-6';

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex flex-col-reverse items-center px-4 sm:top-6 sm:bottom-auto sm:flex-col"
    >
      <div
        className={`pointer-events-auto grid w-[min(92vw,320px)] grid-cols-[1fr_auto_1fr] items-center rounded-none px-4 py-2 text-white transition-[background-color,border-color,box-shadow] duration-300 ${
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
            onClick={() => {
              if (manualMenuOpen) {
                setManualMenuOpen(false);
                return;
              }

              if (autoFooterOpen) {
                setFooterDismissed(true);
                return;
              }

              setManualMenuOpen(true);
            }}
            whileTap={{ scale: 0.96 }}
            className={`grid h-8 w-8 place-items-center text-white ${
              menuOpen
                ? glassMode
                  ? 'border border-white/28 bg-white/10'
                  : 'border border-mist/45 bg-[#2f4156]/95'
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
                {menuOpen ? <X size={14} className="text-white" /> : <Menu size={14} className="text-white" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={panelClassName}
          >
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setManualMenuOpen(false);
                    setFooterDismissed(true);
                  }}
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
