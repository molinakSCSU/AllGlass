'use client';

import { motion } from 'framer-motion';

export function ApproachSection() {
  return (
    <section id="about" className="bg-(--bg-base) px-4 py-16 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 border-t border-(--line) pt-6 md:grid-cols-[0.9fr_1.8fr] md:gap-14 md:pt-7">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-8"
        >
          <p className="section-kicker">◆ ABOUT US</p>
          <div className="h-px w-full bg-steel/32" />
          <div className="grid gap-5 text-xs uppercase tracking-micro text-[#2f4156]/70 sm:grid-cols-3 md:grid-cols-1 md:gap-6">
            <div>
              <p className="mb-2 text-[#2f4156]">Heritage</p>
              <p>Family owned since 1978</p>
            </div>
            <div>
              <p className="mb-2 text-[#2f4156]">Address</p>
              <p>420 E Putnam Ave, Cos Cob, CT 06807</p>
            </div>
            <div>
              <p className="mb-2 text-[#2f4156]">Hours</p>
              <div className="space-y-1">
                <p>Sunday: Closed</p>
                <p>Monday: 8 AM-4:30 PM</p>
                <p>Tuesday: 8 AM-4:30 PM</p>
                <p>Wednesday: 8 AM-4:30 PM</p>
                <p>Thursday: 8 AM-4:30 PM</p>
                <p>Friday: 8 AM-4:30 PM</p>
                <p>Saturday: Closed</p>
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="max-w-4xl text-balance text-2xl font-medium leading-[1.08] tracking-tight text-[#2f4156] sm:text-4xl md:text-5xl">
            Family owned and operated since 1978, with new management as of 2025.
          </h2>

          <p className="mt-5 max-w-4xl text-balance text-base leading-relaxed text-[#2f4156]/88 sm:text-lg md:text-xl">
            For nearly five decades, All Glass &amp; Mirror LLC has served the community with
            high-quality glass and mirror solutions. We combine skilled craftsmanship, premium
            materials, and modern installation methods to deliver results that are beautiful,
            durable, and built around your vision from simple mirror cuts to complex custom
            glasswork.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
