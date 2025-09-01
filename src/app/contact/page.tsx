
'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
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
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const cardVariants = (index: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.15, duration: 0.5, ease: 'easeOut' }
  }
});


const pageTitle = `Contact ${APP_NAME}`;
const pageDescription = "We're here to help you with your financial journey. Reach out to us with any questions or to schedule a consultation.";

const contactDetails = [
  { icon: Phone, label: "Phone", value: "+91 7411386561", href: "tel:+917411386561" },
  { icon: Mail, label: "Email", value: "ukadvisory1009@gmail.com", href: "mailto:ukadvisory1009@gmail.com" },
  { icon: MapPin, label: "Address", value: "Ajanta Complex, CTS No 1505, B-1, Beside Satkar Hotel, Maruti Galli, Belagavi - 590001" },
];

export default function ContactPage() {
  return (
    <>
      <motion.div
        className="bg-card p-6 md:p-8 text-center"
        animate="visible" // Changed from initial/whileInView
        variants={sentenceContainerVariants}
        viewport={{ amount: 0.05 }}
      >
        <motion.h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground" variants={sentenceContainerVariants} viewport={{ amount: 0.2 }}>
          {pageTitle.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em"}}>{word}</motion.span>
          ))}
        </motion.h1>
        <motion.p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl" variants={fadeInUpVariants} viewport={{ amount: 0.2 }}>
          {pageDescription}
        </motion.p>
      </motion.div>

      <motion.div
        className="bg-card rounded-2xl shadow-xl p-6 md:p-8"
        initial="hidden"
        whileInView="visible"
        variants={sectionStaggerVariants}
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="grid md:grid-cols-5 gap-12">
            <motion.div className="md:col-span-3" variants={cardVariants(0)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="md:col-span-2" variants={cardVariants(1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <Card className="shadow-lg h-full rounded-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Contact Information</CardTitle>
                  <CardDescription>You can also reach us through the following channels:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactDetails.map((item, index) => (
                    <motion.div key={index} variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{item.label}</h3>
                          {item.href ? (
                             <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors break-all">
                               {item.value}
                             </a>
                          ) : (
                            <p className="text-muted-foreground break-all">{item.value}</p>
                          )}
                        </div>
                      </div>
                      {index < contactDetails.length -1 && <Separator className="my-6" />}
                    </motion.div>
                  ))}
                   <motion.div className="mt-8" variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}}>
                    <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
}
