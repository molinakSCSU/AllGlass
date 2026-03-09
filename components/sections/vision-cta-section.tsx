import { ArrowUpRight } from 'lucide-react';

export function VisionCtaSection() {
  return (
    <section id="contact" className="bg-(--bg-base) px-4 pb-14 sm:px-6 md:px-10 md:pb-20">
      <div className="mx-auto max-w-[1400px] border border-steel/28 bg-white/50 p-6 sm:p-8 md:p-12">
        <p className="section-kicker mb-8">◆ CONTACT US</p>
        <h3 className="max-w-4xl text-balance text-3xl leading-[1.03] tracking-tight text-[#2f4156] sm:text-5xl md:text-[4.2rem]">
          The right result starts with understanding.
        </h3>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
          <a href="tel:+12036292446" className="cta-dark w-full sm:w-auto">
            <ArrowUpRight size={16} />
            Call (203) 629-2446
          </a>
          <a
            href="mailto:allglassct@gmail.com"
            className="inline-flex min-h-11 w-full items-center justify-center gap-3 border border-steel/35 px-4 py-3 text-center text-xs font-semibold uppercase tracking-micro text-[#2f4156] transition-colors hover:bg-white/70 sm:w-auto sm:border-0 sm:px-1 sm:py-0"
          >
            <ArrowUpRight size={16} />
            allglassct@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
