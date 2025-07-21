
'use client';

import { Raleway } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(raleway.variable, "font-sans antialiased flex flex-col min-h-screen bg-background")}>
        <Header />
        <main className="flex-grow pt-16 md:pt-16 relative">
          <div className="w-full flex flex-col flex-grow gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
