
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

// Metadata for client components is typically handled differently,
// e.g. via generateMetadata in a parent server component or useEffect for document.title.
// For this example, we'll keep the definition commented out for reference.
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
  // State to control the loader's visibility (presence in AnimatePresence)
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(false);
  // State to hold the actual children to be rendered (updated after loader covers screen)
  const [displayedChildren, setDisplayedChildren] = React.useState(children);
  // Key for AnimatePresence around content, to trigger its re-animation
  const [contentAnimationKey, setContentAnimationKey] = React.useState(pathname);

  React.useEffect(() => {
    // Only trigger transition if the pathname actually changes from what content is keyed by
    if (pathname !== contentAnimationKey) {
      setIsLoaderVisible(true); // Show loader, triggers its 'enter' animation
      document.body.classList.add('disable-hover');

      // Wait for loader to cover the screen (its 'enter' animation duration is 0.9s)
      const screenCoverTimer = setTimeout(() => {
        // Update the children and key for the content area
        // This swap happens "under" the full-screen loader
        setDisplayedChildren(children);
        setContentAnimationKey(pathname);

        // Now that new content is staged, tell the loader to start its exit sequence.
        // The loader's 'exit' variant has a 0.5s delay before it starts moving.
        setIsLoaderVisible(false); // This will trigger loader's 'exit' animation via AnimatePresence
      }, 900); // Duration of loader's 'enter' animation

      return () => {
        clearTimeout(screenCoverTimer);
      };
    }
  }, [pathname, children, contentAnimationKey]);

  const handleLoaderExitAnimationComplete = () => {
    // This callback is for AnimatePresence wrapping the loader
    document.body.classList.remove('disable-hover');
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(raleway.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        <Header />

        <AnimatePresence onExitComplete={handleLoaderExitAnimationComplete}>
          {isLoaderVisible && <PageTransitionLoader />}
        </AnimatePresence>

        <main className="flex-grow pt-16 md:pt-0 relative"> {/* Added relative for motion.div context if needed */}
          <AnimatePresence mode="wait">
            <motion.div
              key={contentAnimationKey} // Keyed by pathname to trigger re-animation
              initial={{ opacity: 0 }}
              // Content fade-in starts after loader entrance (0.9s) + loader exit's own delay (0.5s)
              animate={{ opacity: 1, transition: { delay: 0.9 + 0.5, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }} // Old content fades out quickly
              className="w-full h-full" // Ensure it takes up the main content area
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
