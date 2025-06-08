
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TESTIMONIALS_DATA } from '@/lib/constants';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const titleContainerVariants = {
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
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.1 },
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


export function TestimonialsSection() {
  const title = "What Our Clients Say";
  const description = "Real stories from clients who trust UK Venture with their financial future.";

  return (
    <motion.section
      className="w-full bg-card rounded-2xl shadow-xl overflow-hidden p-6 md:p-8"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        className="text-center mb-10 md:mb-12"
        variants={titleContainerVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground"
          variants={titleContainerVariants}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
          {title.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em"}}>{word}</motion.span>
          ))}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl"
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
          {description}
        </motion.p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 h-full rounded-xl">
              <CardHeader>
                <testimonial.icon className="h-8 w-8 text-primary mb-4" />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg italic text-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.author} data-ai-hint={testimonial.avatarHint} />
                    <AvatarFallback>{testimonial.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
