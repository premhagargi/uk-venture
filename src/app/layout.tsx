
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
import React from 'react';
import { PageTransitionLoader } from '@/components/layout/PageTransitionLoader';
import { cn } from '@/lib/utils';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(false);
  const [displayedChildren, setDisplayedChildren] = React.useState(children);
  const [contentAnimationKey, setContentAnimationKey] = React.useState(pathname);
  const [showContent, setShowContent] = React.useState(true);

  React.useEffect(() => {
    if (pathname !== contentAnimationKey) {
      setShowContent(false);
      setIsLoaderVisible(true);
      document.body.classList.add('disable-hover');

      const screenCoverTimer = setTimeout(() => {
        setDisplayedChildren(children);
        setContentAnimationKey(pathname);
        setIsLoaderVisible(false);
      }, 900);

      return () => {
        clearTimeout(screenCoverTimer);
      };
    }
  }, [pathname, children, contentAnimationKey]);

  const handleLoaderExitAnimationComplete = () => {
    setShowContent(true);
    document.body.classList.remove('disable-hover');
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(raleway.variable, "font-sans antialiased flex flex-col min-h-screen bg-background")}>
        <Header />

        <AnimatePresence onExitComplete={handleLoaderExitAnimationComplete}>
          {isLoaderVisible && <PageTransitionLoader />}
        </AnimatePresence>

        <main className="flex-grow pt-16 md:pt-[calc(4rem+1rem)] relative"> {/* 4rem header + 1rem gap approx for md:pt-20 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={contentAnimationKey}
              initial={{ opacity: 0 }}
              animate={{
                opacity: showContent ? 1 : 0,
                transition: { duration: showContent ? 0.5 : 0.1, ease: "easeOut" }
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="w-full h-full p-2 sm:p-4 md:p-6 flex flex-col gap-4 md:gap-6"
            >
              {displayedChildren}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

    