'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    id: '01',
    name: 'Greenwich Vanity Upgrade',
    location: 'Old Greenwich, CT',
    image: '/img/portfolio/powder-room-mirror-square.jpg',
    tags: ['Custom Mirror Cutting', 'Residential Glass'],
  },
  {
    id: '02',
    name: 'Stamford Double Mirror Install',
    location: 'Stamford, CT',
    image: '/img/portfolio/black-frame-double-mirror-square.jpg',
    tags: ['Mirror Wall', 'Repair & Replacement'],
  },
  {
    id: '03',
    name: 'Darien Marble Shower',
    location: 'Darien, CT',
    image: '/img/portfolio/white-marble-gold-shower.jpg',
    tags: ['Shower Enclosures', 'Custom Hardware'],
  },
  {
    id: '04',
    name: 'Riverside Herringbone Build',
    location: 'Riverside, CT',
    image: '/img/portfolio/blue-herringbone-shower.jpg',
    tags: ['Residential Glass', 'Specialty Finishes'],
  },
  {
    id: '05',
    name: 'Cos Cob Master Suite',
    location: 'Cos Cob, CT',
    image: '/img/portfolio/gold-slider-shower-square.jpg',
    tags: ['Shower Enclosures', 'Premium Tile Coordination'],
  },
];

export function ProjectList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="bg-(--bg-base) px-4 pb-16 sm:px-6 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1400px] border-t border-(--line) pt-6">
        <p className="section-kicker">◆ FEATURED PROJECTS</p>
      </div>

      <div className="mx-auto mt-6 max-w-[1400px] border-t border-(--line) sm:mt-8">
        {projects.map((project, index) => {
          const isHovered = hoveredId === project.id;
          const isExpanded = expandedId === project.id;
          const showPreview = isExpanded || isHovered;

          return (
            <div key={project.id} className="border-b border-(--line)">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId((current) => (current === project.id ? null : current))}
                onFocus={() => setHoveredId(project.id)}
                onBlur={() => setHoveredId((current) => (current === project.id ? null : current))}
                className="group grid gap-4 py-6 md:grid-cols-[auto_minmax(220px,1fr)_minmax(320px,1.8fr)_auto] md:items-center md:gap-5 md:py-7"
              >
                <p className="text-xs font-semibold uppercase tracking-micro text-[#2f4156]/55">
                  {project.id}
                </p>

                <h3
                  className={`text-[1.9rem] leading-tight tracking-tight transition-colors duration-300 sm:text-3xl md:text-[2.15rem] ${
                    showPreview
                      ? 'text-[#2f4156]'
                      : 'text-steel group-hover:text-[#2f4156]'
                  }`}
                >
                  {project.name}
                  <span className="mt-1 block text-xs uppercase tracking-micro text-[#2f4156]/55">
                    {project.location}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label={`Expand image for ${project.name}`}
                  onClick={() =>
                    setExpandedId((current) => (current === project.id ? null : project.id))
                  }
                  className="inline-flex h-11 w-11 items-center justify-center border border-steel/35 text-[#2f4156] transition hover:border-[#2f4156]/55 hover:bg-mist/40 md:h-10 md:w-10"
                >
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  >
                    <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
                  </motion.span>
                </button>
              </motion.article>

              <AnimatePresence initial={false}>
                {showPreview && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`relative mx-auto mb-6 w-full max-w-[860px] overflow-hidden border border-steel/28 bg-mist/20 md:mb-7 ${
                        isExpanded ? 'h-[240px] sm:h-[300px] md:h-[420px]' : 'h-[170px] sm:h-[210px] md:h-[240px]'
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 860px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
