'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cards = [
  {
    title: 'Shower Enclosures',
    image: '/img/portfolio/emerald-shower-enclosure.jpg',
    copy: 'Frameless systems measured and installed for clean reveals, smooth hardware action, and long-term durability.',
    eyebrow: 'Measured to fit',
    classes: 'h-[420px] sm:h-[480px] md:col-span-7 md:h-[620px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Residential Glass',
    image: '/img/portfolio/grid-french-doors.jpg',
    copy: 'Custom interior and bath glazing tailored to how each home is actually used.',
    eyebrow: 'Interior detailing',
    classes: 'h-[320px] sm:h-[420px] md:col-span-5 md:h-[620px]',
    imageClass: 'object-cover object-center',
  },
  {
    title: 'Custom Mirror Cutting',
    image: '/img/portfolio/ornate-fireplace-mirror.jpg',
    copy: 'Precision-cut mirrors for vanities, fitness rooms, and large commercial wash areas.',
    eyebrow: 'Clean edgework',
    classes: 'h-[320px] sm:h-[340px] md:col-span-4 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Commercial Glass',
    image: '/img/portfolio/retail-glass-table.jpg',
    copy: 'Storefront and commercial installations built for heavy use, clarity, and structural confidence.',
    eyebrow: 'High-traffic builds',
    classes: 'h-[320px] sm:h-[340px] md:col-span-8 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Window Systems',
    image: '/img/portfolio/kitchen-skylight-window.jpg',
    copy: 'Window packages that improve natural light, energy performance, and day-to-day comfort.',
    eyebrow: 'Light and insulation',
    classes: 'h-[320px] sm:h-[340px] md:col-span-6 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Repair & Replacement',
    image: '/img/portfolio/grey-tile-bench-shower.jpg',
    copy: 'Targeted repairs and precise replacements that restore safety, operation, and finish quality.',
    eyebrow: 'Fast recovery work',
    classes: 'h-[320px] sm:h-[340px] md:col-span-6 md:h-[360px]',
    imageClass: 'object-cover',
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-(--bg-base) px-4 pb-16 sm:px-6 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] gap-6 border-t border-(--line) pt-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-end">
        <div>
          <p className="section-kicker">◆ SERVICES</p>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-medium leading-[1.02] tracking-tight text-[#2f4156] sm:text-4xl">
            Glass and mirror work built around the way each space is used.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-[#2f4156]/74 md:justify-self-end md:text-right">
          From frameless shower enclosures to commercial glass and precision-cut mirrors, these are
          the installations customers come to us for when the fit, finish, and final look need to
          feel exact.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-[1400px] grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:grid-cols-12">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            className={`group relative overflow-hidden border border-steel/22 bg-[#2f4156] ${card.classes}`}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`${card.imageClass} transition duration-700 group-hover:scale-[1.04]`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#142130]/88 via-[#142130]/24 to-transparent" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 sm:p-6 md:p-8">
              <motion.p
                className="border border-white/18 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-xs"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                {card.eyebrow}
              </motion.p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                0{index + 1}
              </p>
            </div>
            <motion.div
              className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h3 className="text-[1.85rem] font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                {card.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/78 md:text-base">
                {card.copy}
              </p>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
