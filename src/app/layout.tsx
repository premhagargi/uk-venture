
'use client';

import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
});

// Metadata should be defined statically or via generateMetadata if RootLayout were a Server Component.
// Since it's now a client component for AnimatePresence, global metadata is typically handled
// in a parent Server Component or a generateMetadata function in a page/layout closer to the root if possible.
// For this exercise, we'll keep it commented out here as a reference.
// export const metadata: Metadata = {
//   title: {
//     default: APP_NAME,
//     template: `%s | ${APP_NAME}`,
//   },
//   description: `UK Venture: A cutting-edge financial services company offering comprehensive stock broking and investment solutions tailored to the needs of modern investors with a strong focus on technology, transparency and trust. We combine financial expertise with digital innovation to simplify wealth creation for every individual.`,
// };

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-16 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
