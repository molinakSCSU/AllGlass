'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

type SubmitState =
  | { status: 'idle'; message: string }
  | { status: 'submitting'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export function QuotePanel() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  });

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
    setSubmitState({ status: 'idle', message: '' });
    if (window.location.hash === '#quote') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState({ status: 'submitting', message: 'Sending your quote request...' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          serviceNeeded: formData.get('service_needed'),
          projectNotes: formData.get('project_notes'),
          address: formData.get('address'),
        }),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setSubmitState({
          status: 'error',
          message: result?.message ?? 'Unable to send your request right now.',
        });
        return;
      }

      form.reset();
      setSubmitState({
        status: 'success',
        message: result?.message ?? 'Quote request sent successfully.',
      });
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Unable to send your request right now.',
      });
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
            className="absolute inset-y-0 left-0 right-0 overflow-y-auto overscroll-contain border-l border-steel/30 bg-stoneBase px-4 pb-6 pt-16 text-[#2f4156] shadow-2xl sm:px-6 sm:pb-8 sm:pt-18 md:left-auto md:w-[min(1120px,calc(100%-72px))] md:px-8 md:py-8 lg:px-10 lg:py-10"
          >
            <div className="mx-auto max-w-[1220px]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2f4156]/55">
                    Contact us
                  </p>
                  <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl lg:text-6xl">
                    Get a quote
                  </h2>
                </div>

                <button
                  aria-label="Close quote panel"
                  onClick={closePanel}
                  className="grid h-11 w-11 shrink-0 place-items-center bg-[#2f4156] text-white md:h-12 md:w-12"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 grid gap-4 border-t border-steel/35 pt-6 lg:mt-10 lg:grid-cols-[minmax(220px,0.5fr)_minmax(0,1.5fr)] lg:gap-6 lg:pt-8">
                <div className="grid h-fit gap-4 border border-[#2f4156]/18 bg-[#2f4156] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
                  <div className="grid gap-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/58">
                      All Glass &amp; Mirror LLC
                    </p>
                    <p className="max-w-[18rem] text-xl leading-[1.08] tracking-tight sm:text-[1.75rem]">
                      Tell us about the space and we&apos;ll take it from there.
                    </p>
                  </div>

                  <div className="border-t border-white/12 pt-5 text-sm text-white/80">
                    <a
                      href="mailto:allglassct@gmail.com"
                      className="transition-colors hover:text-white"
                    >
                      allglassct@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border border-steel/24 bg-white/46 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xs sm:p-6 lg:p-7">
                  <div className="grid gap-2">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#2f4156]/55">
                      Quote request
                    </p>
                    <p className="max-w-2xl text-lg leading-[1.35] text-[#2f4156]/75 sm:text-xl">
                      A few project details are enough to get the conversation started.
                    </p>
                  </div>

                  <form className="mt-6 space-y-5 sm:mt-8 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Name</span>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          required
                          disabled={submitState.status === 'submitting'}
                          className="w-full border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Email</span>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          spellCheck={false}
                          required
                          disabled={submitState.status === 'submitting'}
                          className="w-full border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">Phone</span>
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          disabled={submitState.status === 'submitting'}
                          className="w-full border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">
                          Service needed
                        </span>
                        <select
                          name="service_needed"
                          defaultValue=""
                          autoComplete="off"
                          required
                          disabled={submitState.status === 'submitting'}
                          className="w-full border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
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

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">
                        Project details
                      </span>
                      <textarea
                        rows={6}
                        name="project_notes"
                        placeholder="Project type, location, approximate dimensions, timeline, or anything else that would help us understand the job."
                        autoComplete="off"
                        required
                        disabled={submitState.status === 'submitting'}
                        className="w-full resize-none border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors placeholder:text-steel/75 focus:border-[#2f4156]"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-micro text-[#2f4156]/75">
                        Address or town
                      </span>
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        disabled={submitState.status === 'submitting'}
                        className="w-full border border-steel/45 bg-white/70 px-4 py-3 text-base outline-hidden transition-colors focus:border-[#2f4156]"
                      />
                    </label>

                    {submitState.status !== 'idle' ? (
                      <div
                        className={`border px-4 py-3 text-sm leading-relaxed ${
                          submitState.status === 'success'
                            ? 'border-emerald-700/20 bg-emerald-50 text-emerald-900'
                            : submitState.status === 'error'
                              ? 'border-red-700/20 bg-red-50 text-red-900'
                              : 'border-steel/25 bg-white/70 text-[#2f4156]/74'
                        }`}
                      >
                        {submitState.message}
                      </div>
                    ) : null}

                    <div className="grid gap-5 border-t border-steel/28 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                      <div className="grid gap-2 text-sm text-[#2f4156]/68">
                        <p>Prefer to call instead?</p>
                        <a href="tel:+12036292446" className="font-medium text-[#2f4156] hover:text-steel">
                          (203) 629-2446
                        </a>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-4">
                        <button
                          type="button"
                          onClick={closePanel}
                          disabled={submitState.status === 'submitting'}
                          className="inline-flex min-h-11 w-full items-center justify-center border border-steel/45 px-8 py-3 text-xs font-semibold uppercase tracking-micro text-[#2f4156] transition-colors hover:bg-mist/35 sm:w-auto"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitState.status === 'submitting'}
                          className="inline-flex min-h-11 w-full items-center justify-center bg-[#2f4156] px-8 py-3 text-xs font-semibold uppercase tracking-micro text-white transition-colors hover:bg-steel sm:w-auto"
                        >
                          {submitState.status === 'submitting' ? 'Sending...' : 'Request Quote'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
