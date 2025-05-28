import Link from 'next/link';
import { BarChartBig, Menu } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
// import { ModeToggle } from '@/components/layout/ModeToggle'; // Assuming you might add this later

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${APP_NAME} home page`}>
          <BarChartBig className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
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
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle><span className="sr-only">{APP_NAME} Menu</span></SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2 text-foreground mb-4">
                    <BarChartBig className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">{APP_NAME}</span>
                  </Link>
                </SheetClose>
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
