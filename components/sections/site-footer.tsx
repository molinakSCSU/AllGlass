'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export function SiteFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      id="site-footer"
      className="relative flex min-h-[100dvh] items-stretch overflow-hidden bg-[#2f4156] px-4 pb-10 pt-20 text-white sm:items-end sm:px-6 sm:pb-12 sm:pt-24 md:px-10 md:pb-14 md:pt-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-44"
        style={{ backgroundImage: "url('/img/portfolio/showroom-interior.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#2f4156]/72" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-4 h-48 w-48 rounded-full bg-mist/14 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.55, 0.9, 0.55],
                x: [0, 20, 0],
                y: [0, 18, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.65, 0.35],
                x: [0, -16, 0],
                y: [0, -22, 0],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-7.5rem)] w-full max-w-[1400px] flex-col justify-between sm:block sm:min-h-0">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
          <div>
            <motion.p
              className={`${outfit.className} pointer-events-none select-none text-left text-[15vw] font-medium leading-[0.9] tracking-tight text-mist/18 sm:text-[12vw] md:text-[8vw]`}
              whileHover={shouldReduceMotion ? undefined : { x: 8 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            >
              All Glass &amp; Mirror LLC
            </motion.p>
          </div>

          <motion.div
            className="border border-mist/18 bg-white/8 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xs sm:p-6"
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <div className="grid gap-3 text-sm text-stoneBase/84">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stoneBase/56">
                Connecticut glass and mirror work
              </p>
              <p>©2026, All Glass & Mirror LLC</p>
              <p>420 East Putnam Ave, Cos Cob, CT 06807</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-0 grid gap-6 border-t border-mist/32 pt-6 text-sm text-stoneBase/84 sm:mt-10 sm:gap-8 sm:pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stoneBase/56">Follow</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61578831686095"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stoneBase/56">Company</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>

          <div className="text-[11px] uppercase tracking-[0.24em] text-stoneBase/48 md:text-right">
            Family owned since 1978
          </div>
        </div>
      </div>
    </footer>
  );
}
