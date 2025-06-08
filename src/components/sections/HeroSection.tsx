
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { motion } from 'framer-motion';

const sectionRootVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1, duration: 0.5 },
  },
};

const sentenceContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: i * 0.1 },
  }),
};

const wordChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 100 },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 },
  },
};

const buttonsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.1 },
  },
};

const heroTitleLine1 = "Cutting-Edge Financial Services for";
const heroTitleSpan = "Modern Investors";

export function HeroSection() {
  return (
    <motion.section
      className="w-full bg-card rounded-2xl shadow-xl overflow-hidden p-6 md:p-8"
      initial="hidden"
      whileInView="visible"
      variants={sectionRootVariants}
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <motion.div
          className="flex flex-col justify-center space-y-6"
          variants={sentenceContainerVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none xl:max-w-xl text-foreground"
            variants={sentenceContainerVariants}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            {heroTitleLine1.split(" ").map((word, index) => (
              <motion.span key={`word1-${index}`} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em" }}>
                {word}
              </motion.span>
            ))}
            <motion.span style={{ display: "inline-block" }} className="text-primary">
               {heroTitleSpan.split(" ").map((word, index) => (
                <motion.span key={`word2-${index}`} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em" }}>
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            className="max-w-[600px] text-muted-foreground md:text-xl"
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            {APP_NAME} offers comprehensive stock broking and investment solutions tailored to your needs, focusing on technology, transparency, and trust to simplify your wealth creation.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 min-[400px]:flex-row"
            variants={buttonsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
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

        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center lg:order-last"
        >
          <Image
            src="/uk-venture-logo.svg"
            width={450}
            height={450}
            alt="UK Venture Logo"
            className="mx-auto aspect-square object-contain max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px]"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
