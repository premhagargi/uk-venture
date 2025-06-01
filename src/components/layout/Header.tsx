
'use client';

import Link from 'next/link';
import { BarChartBig, Menu } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter } from '@/components/ui/sheet';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerHeightThreshold = 80; // Threshold to start hiding header
  const pathname = usePathname();

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
      {/* Mobile Header - Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 h-16 bg-background shadow-sm container mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
            <BarChartBig className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
        </Link>

        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={cn(
                "!w-screen !h-screen !max-w-none !border-0", // Full screen
                "!bg-card !rounded-none", // Override default rounding for full screen
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
                  <span className="font-bold text-2xl group-hover:text-primary transition-colors">{APP_NAME}</span>
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
                      "text-xl sm:text-2xl uppercase font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center",
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

      {/* Desktop Header - Full Width Top Bar */}
      <div className="hidden md:block bg-background shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo & App Name */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full">
                <BarChartBig className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-foreground">{APP_NAME}</span>
            </Link>

            {/* Center: Navigation Links */}
            <ul className="flex items-center space-x-6 lg:space-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
