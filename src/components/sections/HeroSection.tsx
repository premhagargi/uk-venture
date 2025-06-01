
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export function HeroSection() {
  return (
    <section className="w-full pt-16 md:pt-40 py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-6 lg:pl-16 xl:pl-24"
            initial="initial"
            animate="whileInView" // Changed from animate to whileInView for consistency if needed, or keep animate for on-load
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.2 } }
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="space-y-3 max-w-2xl" variants={fadeInUp}>
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none xl:max-w-xl text-foreground"
                variants={fadeInUp}
              >
                Cutting-Edge Financial Services for <span className="text-primary">Modern Investors</span>
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                variants={fadeInUp}
              >
                {APP_NAME} offers comprehensive stock broking and investment solutions tailored to your needs, focusing on technology, transparency, and trust to simplify your wealth creation.
              </motion.p>
            </motion.div>
            <motion.div 
              className="flex flex-col gap-3 min-[400px]:flex-row"
              variants={fadeInUp}
            >
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
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }} transition={fadeInUp.transition}>
            <Image
              src="/uk-venture-logo.svg"
              width={300}
              height={300}
              alt="UK Venture Logo"
              className="mx-auto sm:w-full object-contain lg:order-last max-h-[240px] md:max-h-[300px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
