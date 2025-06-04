
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES_DATA } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const titleVariants = {
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
    transition: { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
  },
};

export function ServicesHighlight() {
  const highlightedServices = SERVICES_DATA.slice(0, 3);

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <motion.div
        className="container px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground"
            variants={titleVariants}
          >
            Our Core Financial Services
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl"
            variants={paragraphVariants}
          >
            Empowering you with comprehensive solutions for financial growth and security.
          </motion.p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlightedServices.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
            >
              <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader className="items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <service.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center flex flex-col">
                  <CardDescription className="text-base mb-6 flex-grow">{service.description}</CardDescription>
                  <Button variant="link" asChild className="text-primary hover:text-primary/80 mt-auto">
                    <Link href={`/services#${service.id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 text-center"
          variants={buttonContainerVariants}
        >
          <Button asChild size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
            <Link href="/services">
              View All Services
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
