'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    name: 'Ariane Soto',
    meta: 'Local Guide · a month ago',
    quote:
      'I had an excellent experience with this all-glass company from start to finish. I purchased a glass shower door and the entire process was smooth, professional, and stress-free.',
  },
  {
    name: 'Natalie Rodrigues',
    meta: '10 reviews · 3 photos · a month ago',
    quote:
      'Awesome service !! I highly recommended. Their work is great! High quality , punctual , clean and price is fair. I will ask for their service again!',
  },
  {
    name: 'Luz Velez',
    meta: '8 reviews · a month ago',
    quote:
      'Excellent service, very professional, I definitely recommend them to my family and to my friends! Their job is like a royal touch!',
  },
  {
    name: 'Ralph Meyer',
    meta: '4 reviews · 10 months ago',
    quote:
      'I’m very pleased with my new shower door. All Glass did an amazing job.',
  },
  {
    name: 'Jeff Weir',
    meta: '2 reviews · 8 months ago',
    quote:
      'Excellent professional service! Very clean, very polite. Highly recommended.',
  },
];

export function ClientStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((index) => (index - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIndex((index) => (index + 1) % reviews.length);

  const activeReview = reviews[activeIndex];

  return (
    <section className="bg-(--bg-base) px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1400px] border-t border-(--line) pt-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="section-kicker">◆ CLIENT STORIES</p>
          <p className="text-xs uppercase tracking-micro text-[#2f4156]/70">Google ★★★★★ · 11 Reviews</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto mt-6 max-w-[980px] border border-steel/25 bg-[#ffffff]/75 p-4 sm:mt-7 sm:p-5 md:p-7"
      >
        <div className="grid gap-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.name}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-5"
            >
              <blockquote className="text-balance text-lg font-medium leading-[1.2] tracking-tight text-[#2f4156] sm:text-2xl md:text-3xl">
                “{activeReview.quote}”
              </blockquote>

              <div className="grid gap-2 border-t border-(--line) pt-4 md:grid-cols-2 md:items-end">
                <div>
                  <p className="text-lg tracking-tight text-[#2f4156]">{activeReview.name}</p>
                  <p className="mt-1 text-sm tracking-[0.2em] text-[#b9912d]">★★★★★</p>
                  <p className="mt-1 text-xs uppercase tracking-micro text-[#2f4156]/65">
                    {activeReview.meta}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-micro text-[#2f4156]/65 md:text-right">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-4 border-t border-(--line) pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-6 transition-colors sm:w-8 ${
                    activeIndex === index ? 'bg-[#2f4156]' : 'bg-steel/35 hover:bg-steel/60'
                  }`}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="grid h-11 w-11 place-items-center border border-steel/45 text-[#2f4156] transition-colors hover:bg-mist/40 md:h-10 md:w-10"
                aria-label="Previous review"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                className="grid h-11 w-11 place-items-center border border-steel/45 text-[#2f4156] transition-colors hover:bg-mist/40 md:h-10 md:w-10"
                aria-label="Next review"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
