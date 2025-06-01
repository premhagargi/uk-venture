
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                Cutting-Edge Financial Services for <span className="text-primary">Modern Investors</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {APP_NAME} combines financial expertise with digital innovation to simplify wealth creation. Invest with technology, transparency, and trust.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/uk-venture-logo.svg"
            width={325}
            height={240}
            alt="UK Venture Logo"
            className="mx-auto sm:w-full object-contain lg:order-last max-h-[240px] md:max-h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
