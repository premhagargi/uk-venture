
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES_DATA, APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// export const metadata: Metadata = { // Metadata should be static or generated via generateMetadata
//   title: `Our Services`,
//   description: `Explore ${APP_NAME}'s comprehensive financial services: Equity Investing, Derivatives Trading, Mutual Funds, IPOs, and more, designed for modern investors with a focus on technology, transparency, and trust.`,
// };

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }
};

const cardVariants = (index: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' }
  }
});

export default function ServicesPage() {
  return (
    <motion.div
      className="container px-4 md:px-6 pt-12 md:pt-40 pb-16 md:pb-20 lg:pb-24"
      initial="initial"
      animate="whileInView"
      variants={{ initial: {}, whileInView: {transition: {staggerChildren: 0.2}}}}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={fadeInUp}>
        <motion.h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground" variants={fadeInUp}>
          Our Financial Services
        </motion.h1>
        <motion.p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl" variants={fadeInUp}>
          At {APP_NAME}, we offer comprehensive stock broking and investment solutions. We combine financial expertise with digital innovation to simplify wealth creation, focusing on technology, transparency, and trust.
        </motion.p>
      </motion.div>

      <div className="space-y-12 md:space-y-16">
        {SERVICES_DATA.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            variants={cardVariants(index)}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className={`grid md:grid-cols-2 gap-0 items-stretch`}>
                <div className={`p-6 md:p-8 flex flex-col justify-center ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl font-semibold text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                      {service.longDescription}
                    </CardDescription>
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4 space-y-2">
                        <h4 className="font-semibold text-foreground">Key Highlights:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                     <Button variant="link" asChild className="text-primary hover:text-primary/80 px-0">
                       <Link href={`/contact?service=${service.id}`}>
                         Inquire Now <ChevronRight className="ml-1 h-4 w-4" />
                       </Link>
                     </Button>
                  </CardContent>
                </div>
                <div className={`relative h-64 md:h-auto ${index % 2 !== 0 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    data-ai-hint={service.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// export const metadata: Metadata = {
//   title: `Our Services`,
//   description: `Explore ${APP_NAME}'s comprehensive financial services: Equity Investing, Derivatives Trading, Mutual Funds, IPOs, and more, designed for modern investors with a focus on technology, transparency, and trust.`,
// };
