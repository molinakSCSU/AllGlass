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
    image: '/img/portfolio/hero-residential-suite.jpg',
    tags: ['Custom Mirror Cutting', 'Residential Glass'],
    summary: 'A full bath refresh centered on cleaner vanity sightlines, sharper mirror detailing, and a brighter overall glass presence throughout the room.',
  },
  {
    id: '02',
    name: 'Stamford Mirror Wall Upgrade',
    location: 'Stamford, CT',
    image: '/img/portfolio/commercial-mirror-wall.jpg',
    tags: ['Mirror Wall', 'Repair & Replacement'],
    summary: 'A larger-format mirror installation designed to clean up the wall line, strengthen reflection, and give the room a more finished commercial-grade look.',
  },
  {
    id: '03',
    name: 'Darien Marble Shower',
    location: 'Darien, CT',
    image: '/img/portfolio/marble-door-shower.jpg',
    tags: ['Shower Enclosures', 'Custom Hardware'],
    summary: 'A marble bath enclosure detailed around warm metal hardware and clear panel cuts that let the stone remain the hero.',
  },
  {
    id: '04',
    name: 'Riverside Herringbone Build',
    location: 'Riverside, CT',
    image: '/img/portfolio/blue-herringbone-shower.jpg',
    tags: ['Residential Glass', 'Specialty Finishes'],
    summary: 'Custom shower glazing tuned to an expressive tile pattern, with hardware and door swing selected to keep the geometry readable.',
  },
  {
    id: '05',
    name: 'Cos Cob Master Bath',
    location: 'Cos Cob, CT',
    image: '/img/portfolio/tub-glass-enclosure.jpg',
    tags: ['Shower Enclosures', 'Premium Tile Coordination'],
    summary: 'A master bath enclosure balancing clean glass spans, bright finishes, and trim alignment so the space feels lighter and more resolved.',
  },
];

export function ProjectList() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null);
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id ?? null);
  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0];

  return (
    <section id="projects" className="bg-(--bg-base) px-4 pb-16 sm:px-6 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] gap-6 border-t border-(--line) pt-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
        <div>
          <p className="section-kicker">◆ RECENT WORK</p>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-medium leading-[1.02] tracking-tight text-[#2f4156] sm:text-4xl">
            A closer look at the installations that define our recent work.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-[#2f4156]/74 lg:justify-self-end lg:text-right">
          These projects show how the same standard carries across bathrooms, mirrors, window
          packages, and custom interior glass. Each one is shaped by the room, not dropped in from
          a preset system.
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-[1400px] gap-8 sm:mt-8 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] xl:items-start">
        <div className="border-t border-(--line)">
          {projects.map((project, index) => {
            const isActive = activeId === project.id;
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03, ease: 'easeOut' }}
                className="border-b border-(--line)"
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                  onClick={() => {
                    setActiveId(project.id);
                    setExpandedId((current) => (current === project.id ? null : project.id));
                  }}
                  className="grid w-full gap-4 py-6 text-left md:grid-cols-[auto_minmax(220px,1fr)_minmax(260px,1fr)_auto] md:items-center md:gap-5 md:py-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-micro text-[#2f4156]/55">
                    {project.id}
                  </p>

                  <div className="min-w-0">
                    <h3
                      className={`text-[1.85rem] leading-tight tracking-tight transition-colors duration-300 sm:text-3xl md:text-[2.1rem] ${
                        isActive ? 'text-[#2f4156]' : 'text-steel'
                      }`}
                    >
                      {project.name}
                    </h3>
                    <span className="mt-1 block text-xs uppercase tracking-micro text-[#2f4156]/55">
                      {project.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex h-10 w-10 items-center justify-center border border-steel/35 text-[#2f4156] transition group-hover:border-[#2f4156]/55 group-hover:bg-mist/40">
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    >
                      <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
                    </motion.span>
                  </span>
                </button>

                {isExpanded ? (
                  <div className="pb-6 xl:hidden">
                    <div className="relative h-[240px] overflow-hidden border border-steel/28 bg-mist/20 sm:h-[320px]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#142130]/72 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="max-w-2xl text-sm leading-relaxed text-white/82">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-28 overflow-hidden border border-steel/25 bg-white/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="relative aspect-[4/4.4] overflow-hidden bg-mist/20">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.name}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-[#142130]/82 via-[#142130]/10 to-transparent"
                    initial={{ opacity: 0.75 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <motion.h3
                      className="text-3xl font-medium tracking-tight"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.08, ease: 'easeOut' }}
                    >
                      {activeProject.name}
                    </motion.h3>
                    <motion.p
                      className="mt-2 text-sm uppercase tracking-[0.22em] text-white/64"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.12, ease: 'easeOut' }}
                    >
                      {activeProject.location}
                    </motion.p>
                  </div>
                </div>

                <div className="grid gap-6 p-7 text-[#2f4156]">
                  <motion.p
                    className="max-w-xl text-base leading-relaxed text-[#2f4156]/76"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.14, ease: 'easeOut' }}
                  >
                    {activeProject.summary}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.18, ease: 'easeOut' }}
                  >
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
