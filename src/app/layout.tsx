
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

// Metadata for client components is typically handled differently.
// export const metadata: Metadata = {
//   title: {
//     default: APP_NAME,
//     template: `%s | ${APP_NAME}`,
//   },
//   description: `UK Venture: A cutting-edge financial services company offering comprehensive stock broking and investment solutions tailored to the needs of modern investors with a strong focus on technology, transparency and trust. We combine financial expertise with digital innovation to simplify wealth creation for every individual.`,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(false);
  const [displayedChildren, setDisplayedChildren] = React.useState(children);
  const [contentAnimationKey, setContentAnimationKey] = React.useState(pathname);
  const [canShowContent, setCanShowContent] = React.useState(true); // Initially true for first load without transition

  React.useEffect(() => {
    if (pathname !== contentAnimationKey) {
      setCanShowContent(false); // Hide current content immediately
      setIsLoaderVisible(true); // Show loader, triggers its 'enter' animation
      document.body.classList.add('disable-hover');

      // Wait for loader to cover the screen
      const screenCoverTimer = setTimeout(() => {
        setDisplayedChildren(children);
        setContentAnimationKey(pathname);
        // Loader will start its exit animation when isLoaderVisible becomes false
        // Content visibility will be handled by onExitComplete of the loader
        setIsLoaderVisible(false);
      }, 900); // Duration of loader's 'enter' animation (0.9s)

      return () => {
        clearTimeout(screenCoverTimer);
      };
    } else {
      // For initial load or if path hasn't changed, ensure content is visible
      // This handles the case where the page loads for the first time.
      // The content is already `displayedChildren`, so we just ensure it's visible.
       if (!isLoaderVisible) { // Only if not already in a transition
         setCanShowContent(true);
       }
    }
  }, [pathname, children, contentAnimationKey, isLoaderVisible]);

  const handleLoaderExitAnimationComplete = () => {
    setCanShowContent(true); // Now allow new content to fade in
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
              animate={{ opacity: canShowContent ? 1 : 0, transition: { duration: 0.5, delay: canShowContent ? 0 : 0 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
