
'use client';

import Link from 'next/link';
import { BarChartBig, Menu, Linkedin, Twitter, Facebook, ChevronRight } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerHeightThreshold = 80; // Adjusted for potentially taller new header
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-[calc(100%+2rem)]", // Hides header including its top margin
        "pt-4 sm:pt-6" // Add some padding at the top so the sticky header doesn't touch screen edge
      )}
    >
      <div className="container px-4 md:px-6">
        <motion.nav 
          className="relative flex items-center justify-between w-full max-w-3xl mx-auto p-2 bg-foreground text-background rounded-full shadow-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-background rounded-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BarChartBig className="h-5 w-5 md:h-6 md:h-6 text-primary" />
            </motion.div>
            <span className="sr-only">{APP_NAME} Home</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-1 relative">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative px-1 py-1">
                <Link
                  href={link.href}
                  onClick={() => setActivePill(link.href)}
                  className={cn(
                    "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300",
                    activePill === link.href ? "text-foreground" : "text-muted-foreground hover:text-background"
                  )}
                >
                  {link.label}
                </Link>
                {activePill === link.href && (
                  <motion.div
                    layoutId="active-pill-desktop"
                    className="absolute inset-0 bg-background rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          
          {/* Desktop CTA */}
          <Link href="/contact" className="hidden md:block ml-2">
             <motion.div
                className="px-4 py-2 text-sm font-medium bg-background text-foreground rounded-full shadow-sm flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px hsl(var(--background))" }}
                whileTap={{ scale: 0.95 }}
             >
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
             </motion.div>
          </Link>


          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-background hover:bg-background/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="!inset-auto !right-4 !top-4 !bottom-4 !h-auto max-h-[calc(100dvh-2rem)] !w-auto max-w-md bg-card !rounded-xl !shadow-2xl flex flex-col p-4"
              >
                <SheetHeader className="px-2 pt-2">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 text-foreground">
                      <BarChartBig className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">{APP_NAME}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6 flex-grow relative px-2">
                  {NAV_LINKS.map((link) => {
                     const isActive = pathname === link.href;
                    return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative flex items-center gap-3 px-4 py-3 text-base uppercase rounded-full transition-colors duration-300 z-10",
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <link.icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="active-pill-mobile"
                            className="absolute inset-0 bg-primary/10 rounded-full z-[-1]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </SheetClose>
                  );
                  })}
                </nav>
                <div className="mt-auto pt-4">
                  <Separator className="mb-4 bg-border/50" />
                  <div className="flex justify-center items-center gap-5 px-2.5">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn profile of ${APP_NAME}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Twitter profile of ${APP_NAME}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Facebook page of ${APP_NAME}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3">Follow us</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
