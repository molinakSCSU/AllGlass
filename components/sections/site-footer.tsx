import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#2f4156] px-4 pb-24 pt-14 text-white sm:px-6 md:px-10 md:pb-36 md:pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/img/portfolio/display-shower-plant.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#2f4156]/82" />

      <div className="relative mx-auto max-w-[1400px]">
        <p
          className={`${outfit.className} pointer-events-none select-none text-center text-[15vw] font-medium leading-[0.9] tracking-tight text-mist/18 sm:text-[12vw] md:text-[8vw]`}
        >
          All Glass &amp; Mirror LLC
        </p>

        <div className="mt-8 grid gap-6 border-t border-mist/32 pt-6 text-sm text-stoneBase/84 sm:mt-10 sm:gap-8 sm:pt-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-2">
            <p>©2026, All Glass & Mirror LLC</p>
            <p>420 East Putnam Ave, Cos Cob, CT 06807</p>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="https://www.instagram.com/" className="hover:text-white">
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578831686095" className="hover:text-white">
              Facebook
            </a>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 md:justify-end">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
