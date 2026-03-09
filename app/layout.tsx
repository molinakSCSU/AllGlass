import type { Metadata } from 'next';
import { Outfit, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'All Glass & Mirror LLC',
  description:
    'Exceptional glazing for residential and commercial architecture in Connecticut.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only z-100 bg-[#2f4156] px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
