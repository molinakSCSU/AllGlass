'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cards = [
  {
    title: 'Shower Enclosures',
    image: '/img/portfolio/emerald-shower-enclosure.jpg',
    copy: 'Frameless systems measured and installed for clean reveals, smooth hardware action, and long-term durability.',
    classes: 'h-[420px] sm:h-[480px] md:col-span-7 md:h-[620px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Residential Glass',
    image: '/img/portfolio/grid-french-doors.jpg',
    copy: 'Custom interior and bath glazing tailored to how each home is actually used.',
    classes: 'h-[320px] sm:h-[340px] md:col-span-5 md:h-[300px]',
    imageClass: 'object-contain object-center bg-[#2f4156]/28 p-2 md:p-3',
  },
  {
    title: 'Custom Mirror Cutting',
    image: '/img/portfolio/ornate-fireplace-mirror.jpg',
    copy: 'Precision-cut mirrors for vanities, fitness rooms, and large commercial wash areas.',
    classes: 'h-[320px] sm:h-[340px] md:col-span-4 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Commercial Glass',
    image: '/img/portfolio/retail-glass-table.jpg',
    copy: 'Storefront and commercial installations built for heavy use, clarity, and structural confidence.',
    classes: 'h-[320px] sm:h-[340px] md:col-span-8 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Window Systems',
    image: '/img/portfolio/kitchen-skylight-window.jpg',
    copy: 'Window packages that improve natural light, energy performance, and day-to-day comfort.',
    classes: 'h-[320px] sm:h-[340px] md:col-span-6 md:h-[360px]',
    imageClass: 'object-cover',
  },
  {
    title: 'Repair & Replacement',
    image: '/img/portfolio/grey-tile-bench-shower.jpg',
    copy: 'Targeted repairs and precise replacements that restore safety, operation, and finish quality.',
    classes: 'h-[320px] sm:h-[340px] md:col-span-6 md:h-[360px]',
    imageClass: 'object-cover',
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-(--bg-base) px-4 pb-16 sm:px-6 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1400px] border-t border-(--line) pt-6">
        <p className="section-kicker">◆ PRODUCT COLLECTION</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-[1400px] grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:grid-cols-12">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08 + index * 0.07, ease: 'easeOut' }}
            className={`group relative overflow-hidden border border-steel/22 ${card.classes}`}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`${card.imageClass} transition duration-700 group-hover:scale-[1.04]`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/62 via-black/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
              <p className="mb-2 text-xs uppercase tracking-micro text-white/75">
                0{index + 1} Collection
              </p>
              <h3 className="text-[1.85rem] font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                {card.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/78 md:text-base">{card.copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
