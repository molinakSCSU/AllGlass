'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function ShowroomSection() {
  return (
    <section className="bg-[#141922] px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-6">
        <p className="section-kicker text-white/70">◆ SHOWROOM</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-md space-y-8"
        >
          <h3 className="text-balance text-5xl font-medium leading-[0.96] tracking-tight md:text-6xl">
            A place where precision and creativity connect.
          </h3>
          <p className="max-w-sm text-lg leading-[1.35] text-white/70">
            Visit the studio to review systems, hardware finishes, and live corner details before
            fabrication starts.
          </p>
          <a href="#contact" className="cta-dark bg-white/10 hover:bg-white/20">
            <ArrowUpRight size={16} />
            Book Visit
          </a>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative grid gap-4 md:grid-cols-[1.45fr_0.85fr]"
        >
          <div className="relative h-[340px] overflow-hidden md:h-[560px]">
            <Image
              src="/img/store.jpg"
              alt="All Glass showroom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/24" />
          </div>

          <div className="grid gap-4">
            <div className="relative h-[168px] overflow-hidden border border-white/10 md:h-[272px]">
              <Image
                src="/img/kitchen.jpg"
                alt="Showroom detail"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="border border-white/10 p-6">
              <p className="mb-3 text-xs uppercase tracking-micro text-white/60">Address</p>
              <p className="text-xl leading-[1.2] text-white/90">
                420 East Putnam Ave
                <br />
                Cos Cob, CT 06807
              </p>
              <p className="mt-5 text-sm text-white/70">(203) 629-2446</p>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
