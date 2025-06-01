
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TESTIMONIALS_DATA } from '@/lib/constants';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          whileInView="whileInView"
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.1 } }
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground"
            variants={fadeInUp}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl"
            variants={fadeInUp}
          >
            Real stories from clients who trust UK Venture with their financial future.
          </motion.p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              custom={index}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                initial: { opacity: 0, y: 30 },
                whileInView: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' }
                })
              }}
            >
              <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
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
      </div>
    </section>
  );
}
