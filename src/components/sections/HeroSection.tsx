
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
                Secure Your Financial Future with <span className="text-primary">{APP_NAME}</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Expert guidance, personalized strategies, and smart insights to help you achieve your financial goals and build lasting wealth.
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
            src="https://placehold.co/600x500.png"
            width={600}
            height={500}
            alt="Financial planning illustration"
            data-ai-hint="financial planning success"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
