
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES_DATA, APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sentenceContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
  }),
};

const wordChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 },
  },
};

const sectionStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = (index: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' }
  }
});

const pageTitle = "Our Financial Services";
const pageDescription = `At ${APP_NAME}, we offer comprehensive stock broking and investment solutions. We combine financial expertise with digital innovation to simplify wealth creation, focusing on technology, transparency, and trust.`;

export default function ServicesPage() {
  return (
    <motion.div>
      <motion.div
        className="bg-card rounded-2xl shadow-xl p-6 md:p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={sentenceContainerVariants}
        viewport={{ amount: 0.05 }}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground"
          variants={sentenceContainerVariants}
        >
          {pageTitle.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em"}}>{word}</motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl"
          variants={fadeInUpVariants}
        >
          {pageDescription}
        </motion.p>
      </motion.div>

      <motion.div
        className="space-y-4 md:space-y-6 lg:space-y-8" // Replaced outer bg-card with space-y for individual service cards
        initial="hidden"
        whileInView="visible"
        variants={sectionStaggerVariants}
        viewport={{ once: true, amount: 0.05 }}
      >
        {SERVICES_DATA.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            variants={cardVariants(index)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-card rounded-2xl shadow-xl overflow-hidden" // Apply detached style to each service card container
          >
            <Card className="overflow-hidden shadow-none transition-shadow duration-300 rounded-2xl border-0"> {/* Remove default card shadow if parent has one */}
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
      </motion.div>
    </motion.div>
  );
}

    