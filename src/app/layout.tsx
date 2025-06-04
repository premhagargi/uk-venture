
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
  const [showContent, setShowContent] = React.useState(true); // true for initial load

  React.useEffect(() => {
    // Only trigger transition if the pathname has actually changed.
    // contentAnimationKey holds the pathname of the currently displayed content.
    if (pathname !== contentAnimationKey) {
      setShowContent(false); // Trigger fast fade-out of current content
      setIsLoaderVisible(true); // Start loader's 'enter' animation
      document.body.classList.add('disable-hover');

      // After loader's enter animation duration (0.9s)
      const screenCoverTimer = setTimeout(() => {
        setDisplayedChildren(children);   // Update to new page's children
        setContentAnimationKey(pathname); // Change key for AnimatePresence to handle new content.
                                          // New content mounts with initial opacity 0 and showContent still false.
        setIsLoaderVisible(false); // Trigger loader's 'exit' animation
      }, 900); // Duration of loader's 'enter' animation

      return () => {
        clearTimeout(screenCoverTimer);
      };
    }
  }, [pathname, children, contentAnimationKey]); // contentAnimationKey is needed to detect actual route change

  const handleLoaderExitAnimationComplete = () => {
    setShowContent(true); // Now, allow the new content to fade in
    document.body.classList.remove('disable-hover');
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(raleway.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        <Header />

        <AnimatePresence onExitComplete={handleLoaderExitAnimationComplete}>
          {isLoaderVisible && <PageTransitionLoader />}
        </AnimatePresence>

        <main className="flex-grow pt-16 md:pt-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentAnimationKey}
              initial={{ opacity: 0 }}
              animate={{
                opacity: showContent ? 1 : 0,
                transition: { duration: showContent ? 0.5 : 0.1, ease: "easeOut" } // 0.5s fade-in, 0.1s fade-out
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }} // Quick exit for old content instance
              className="w-full h-full"
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
