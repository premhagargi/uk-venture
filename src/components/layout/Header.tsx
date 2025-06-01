
'use client';

import Link from 'next/link';
import { BarChartBig, Menu, ChevronRight } from 'lucide-react'; // Removed Linkedin, Twitter, Facebook as they are not used
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter } from '@/components/ui/sheet';
// import { Separator } from '@/components/ui/separator'; // Not used
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerHeightThreshold = 80;
  const pathname = usePathname();
  const [activePill, setActivePill] = useState(pathname); // For desktop pill animation

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 h-16 bg-background shadow-sm container mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
            <BarChartBig className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={cn(
                "!inset-auto !right-4 !top-4 !bottom-4 !h-auto max-h-[calc(100dvh-2rem)] !w-auto max-w-md !bg-card !rounded-2xl !shadow-2xl",
                "data-[state=open]:animate-spread-in-tr data-[state=closed]:animate-spread-out-tr",
                "data-[state=closed]:duration-300 data-[state=open]:duration-500",
                "p-6 flex flex-col" // Keep padding and flex for internal layout
            )}
          >
            <SheetHeader className="mb-8 text-center">
              <SheetClose asChild>
                <Link href="/" className="inline-flex flex-col items-center gap-3 text-foreground group">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <BarChartBig className="h-10 w-10 text-primary" />
                  </div>
                  <span className="font-bold text-2xl group-hover:text-primary transition-colors">{APP_NAME}</span>
                </Link>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col gap-4 items-center flex-grow overflow-y-auto py-4"> {/* Added flex-grow and overflow */}
              {NAV_LINKS.map((link) => {
                 const isActive = pathname === link.href;
                return (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-lg sm:text-xl uppercase font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center", // Added w-full and text-center
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    {link.label}
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

      {/* Desktop Header (Floating Pill) */}
      <div className="hidden md:flex justify-center pt-4 sm:pt-6">
        <div className="container px-4 md:px-6">
          <motion.nav
            className="relative flex items-center justify-between w-full max-w-2xl mx-auto py-1.5 px-2 bg-foreground text-background rounded-full shadow-xl" // Adjusted padding and max-width
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1, duration: 0.5 }}
          >
            <Link href="/" className="flex-shrink-0">
              <motion.div
                className="flex items-center justify-center w-10 h-10 bg-background rounded-full cursor-pointer" // Adjusted size
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <BarChartBig className="h-5 w-5 text-primary" /> {/* Adjusted size */}
              </motion.div>
              <span className="sr-only">{APP_NAME} Home</span>
            </Link>

            <ul className="flex items-center space-x-1 relative"> {/* Ensure it's centered or spaced appropriately */}
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-300", // Adjusted padding
                      activePill === link.href ? "text-foreground" : "text-muted-foreground hover:text-background"
                    )}
                  >
                    {link.label}
                  </Link>
                  {activePill === link.href && (
                    <motion.div
                      layoutId="active-pill-desktop"
                      className="absolute inset-0 bg-background rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
            {/* "Get Started" button removed */}
          </motion.nav>
        </div>
      </div>
    </header>
  );
}
