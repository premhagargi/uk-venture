
'use client';

import Link from 'next/link';
import { BarChartBig, Menu, Linkedin, Twitter, Facebook } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerHeightThreshold = 70; 
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < headerHeightThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) { 
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
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${APP_NAME} home page`}>
          <BarChartBig className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="flex flex-col bg-gradient-to-b from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10"
            >
              <SheetHeader>
                <SheetTitle><span className="sr-only">{APP_NAME} Menu</span></SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 text-lg font-medium mt-8">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2 text-foreground mb-4 px-2.5">
                    <BarChartBig className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">{APP_NAME}</span>
                  </Link>
                </SheetClose>
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-4 px-2.5 py-3 text-base uppercase rounded-md transition-all duration-200 ease-in-out transform hover:scale-105",
                          isActive
                            ? "bg-primary/10 text-primary font-bold shadow-sm"
                            : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto pt-6">
                <Separator className="mb-6 bg-border/50" />
                <div className="flex justify-center items-center gap-6 px-2.5">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn profile of ${APP_NAME}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter profile of ${APP_NAME}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Facebook page of ${APP_NAME}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
                 <p className="text-xs text-muted-foreground text-center mt-4">Follow us</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
