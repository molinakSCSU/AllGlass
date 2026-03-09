'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function QuotePanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onHashChange = () => {
      if (window.location.hash === '#quote') {
        setOpen(true);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('open-quote-panel', onOpen);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('keydown', onKeyDown);
    onHashChange();

    return () => {
      window.removeEventListener('open-quote-panel', onOpen);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closePanel = () => {
    setOpen(false);
    if (window.location.hash === '#quote') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-80"
        >
          <button
            aria-label="Close quote panel"
            onClick={closePanel}
            className="absolute inset-0 bg-black/48"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            className="absolute inset-y-0 left-0 right-0 overflow-y-auto overscroll-contain border-l border-steel/30 bg-stoneBase px-4 pb-10 pt-20 text-[#2f4156] shadow-2xl sm:px-6 md:left-auto md:w-[calc(100%-190px)] md:px-12 md:py-10"
          >
            <div className="mx-auto max-w-[1220px]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">Get a quote</h2>
                </div>

                <button
                  aria-label="Close quote panel"
                  onClick={closePanel}
                  className="grid h-11 w-11 shrink-0 place-items-center bg-[#2f4156] text-white md:h-12 md:w-12"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="text-xs uppercase tracking-micro text-[#2f4156]/70">
                  All Glass &amp; Mirror LLC
                </div>
                <p className="max-w-md text-lg leading-[1.35] text-[#2f4156]/75 sm:text-xl">
                  Share your details and we&apos;ll follow up with a detailed quote.
                </p>
              </div>

              <div className="mt-10 border-t border-steel/35 pt-6 sm:mt-16 sm:pt-8" />

              <div className="grid gap-10 md:grid-cols-[1fr_1.35fr] md:gap-12">
                <p className="text-3xl tracking-tight sm:text-4xl">Tell us about your project.</p>

                <form className="space-y-6 md:space-y-8">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Name</span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        className="w-full border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Email</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        spellCheck={false}
                        className="w-full border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        className="w-full border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Address</span>
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        className="w-full border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      />
                    </label>
                  </div>

                  <div className="space-y-2 border-y border-steel/35 py-7">
                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">
                        Service Needed
                      </span>
                      <select
                        name="service_needed"
                        defaultValue=""
                        autoComplete="off"
                        className="w-full border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option>Residential Glass</option>
                        <option>Commercial Glass</option>
                        <option>Custom Mirror Cutting</option>
                        <option>Shower Enclosures</option>
                        <option>Glass Tabletops</option>
                        <option>Repair &amp; Replacement</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-micro">How can we help?</p>
                    <textarea
                      rows={6}
                      name="project_notes"
                      placeholder="Project details, dimensions, timeline, and location..."
                      autoComplete="off"
                      className="w-full resize-none border border-steel/45 bg-white/35 px-4 py-3 text-base outline-hidden transition-colors placeholder:text-steel/75 focus:border-[#2f4156]"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <button
                      type="submit"
                      className="inline-flex min-h-11 w-full items-center justify-center bg-[#2f4156] px-8 py-3 text-xs font-semibold uppercase tracking-micro text-white transition-colors hover:bg-steel sm:w-auto"
                    >
                      Submit Quote Request
                    </button>
                    <button
                      type="button"
                      onClick={closePanel}
                      className="inline-flex min-h-11 w-full items-center justify-center border border-steel/45 px-8 py-3 text-xs font-semibold uppercase tracking-micro text-[#2f4156] transition-colors hover:bg-mist/35 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
