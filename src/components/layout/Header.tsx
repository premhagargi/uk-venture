
'use client';

import Link from 'next/link';
import { BarChartBig, Menu } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetClose, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerHeightThreshold = 80;
  const pathname = usePathname();
  const [activePill, setActivePill] = useState(pathname);

  useEffect(() => {
    setActivePill(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < headerHeightThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > headerHeightThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeightThreshold]);

  const pillAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Mobile Header - Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 h-16 bg-background shadow-sm container mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMobileSheetOpen(false)}>
          <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
        </Link>

        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={cn(
                "!w-screen !h-screen !max-w-none !border-0",
                "bg-card/80 backdrop-blur-md !rounded-none", // Updated for glass morphism
                "data-[state=open]:animate-spread-in-tr data-[state=closed]:animate-spread-out-tr",
                "data-[state=closed]:duration-300 data-[state=open]:duration-500",
                "p-6 flex flex-col"
            )}
          >
            <SheetHeader className="mb-8 text-center">
               <SheetClose asChild>
                <Link href="/" className="inline-flex flex-col items-center gap-3 text-foreground group">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <BarChartBig className="h-10 w-10 text-primary" />
                  </div>
                  <SheetTitle className="font-bold text-2xl group-hover:text-primary transition-colors">{APP_NAME}</SheetTitle>
                </Link>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col gap-4 items-center flex-grow overflow-y-auto py-4">
              {NAV_LINKS.map((link) => {
                 const isActive = pathname === link.href;
                return (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xl sm:text-2xl uppercase font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center relative",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                    onClick={() => setActivePill(link.href)}
                  >
                    {isActive && (
                        <motion.div
                            layoutId="active-mobile-pill"
                            className="absolute inset-0 bg-primary rounded-full z-[-1]"
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </SheetClose>
              );
              })}
            </nav>
            <SheetFooter className="mt-auto pt-8">
                 <p className="text-xs text-muted-foreground text-center w-full">&copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.</p>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Header - Pill Navigation */}
      <AnimatePresence>
      {isVisible && (
        <motion.div
          className="hidden md:flex justify-center pt-4 sm:pt-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pillAnimation}
        >
          <motion.nav
            className="flex items-center gap-4 p-1.5 px-5 bg-black backdrop-blur-md rounded-full shadow-xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 0.1 } }}
          >
             <Link href="/" className="flex-shrink-0" onClick={() => setActivePill('/')}>
              <motion.div
                className="text-background font-semibold text-lg px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {APP_NAME}
              </motion.div>
            </Link>

            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link href={link.href} key={link.href} legacyBehavior>
                  <a
                    onClick={() => setActivePill(link.href)}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      activePill === link.href
                        ? "text-foreground" // Will use theme foreground (e.g., black on light, white on dark)
                        : "text-neutral-200 opacity-70 hover:opacity-100" // Fixed light gray for contrast on black pill
                    )}
                  >
                    {activePill === link.href && (
                      <motion.div
                        layoutId="active-desktop-pill"
                        className="absolute inset-0 bg-background rounded-full z-[-1]" // Will use theme background (e.g., white on light, dark on dark)
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
