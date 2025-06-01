
'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';
import { Target, History, Users, Linkedin, Lightbulb, ShieldCheck, GraduationCap, TrendingUp, Handshake, Goal, UsersRound } from 'lucide-react';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// export const metadata: Metadata = { // Metadata should be static or generated via generateMetadata
//   title: `About Us`,
//   description: `Learn about ${APP_NAME}, founded in 2024, our mission to make investing easy and fair, our investment philosophy, and our commitment to client-centric financial empowerment.`,
// };

const teamMembers = [
  {
    name: "Hrishikesh Terani",
    role: "CEO/Founder",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarHint: "CEO/Founder",
    initials: "AP",
    linkedin: "#"
  },
  {
    name: "Naveen K R",
    role: "Senior Director",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarHint: "senior director portrait",
    initials: "NKR",
    linkedin: "#"
  },
];

const historyItems = [
  { year: "2024", event: "Foundation & Vision", description: `${APP_NAME} was founded as a cutting-edge financial services company, aiming to empower investors through technology, transparency, and trust.` },
  { year: "Future", event: "Innovation & Growth", description: "Continuously enhancing our offerings and technology to lead in digital finance and client empowerment." },
];

const investmentPhilosophyItems = [
  { title: "Client Centricity", description: "Our client’s financial well being drives every decision we make.", icon: Handshake },
  { title: "Integrity", description: "We operate with honesty and transparency in all our dealings.", icon: ShieldCheck },
  { title: "Education and Awareness", description: "We promote informed investing by educating clients about risks, opportunites and financial planning.", icon: GraduationCap },
  { title: "Long term Vision", description: "We aim not just for short-term gains but for lasting financial growth built on trust.", icon: Goal },
];

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


export default function AboutPage() {
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
          About {APP_NAME}
        </motion.h1>
        <motion.p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl" variants={fadeInUp}>
          {APP_NAME} was founded in 2024 as a Financial services company. It is a cutting edge financial services company offering comprehensive stock broking and investment solutions tailored to the needs of modern investors with a strong focus on technology, transparency and trust. {APP_NAME}  aims to empower individuals and institutional plans to make informed investment decisions. We combine financial expertise with digital innovation to simplify wealth creation for every individual.
        </motion.p>
      </motion.div>

      <motion.section className="mb-16" variants={fadeInUp}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div className="space-y-8" variants={fadeInUp}>
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-3">
                <Target className="h-10 w-10 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our goal is to make investing easy and fair for everyone by using technology to offer clear, accessible, and trustworthy financial services that help our clients grow their wealth over time.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-3">
                 <Lightbulb className="h-10 w-10 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision is to be a top name in retail broking by using cutting-edge technology and standing out through exceptional customer experience, innovation, high productivity, and streamlined operations.
              </p>
            </motion.div>
          </motion.div>
           <motion.div variants={fadeInUp}>
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Team discussing strategy"
              data-ai-hint="team strategy meeting"
              className="rounded-xl shadow-xl object-cover aspect-[3/2]"
            />
          </motion.div>
        </div>
      </motion.section>

      <Separator className="my-16" />

      <motion.section className="mb-16" variants={fadeInUp}>
        <motion.div className="text-center mb-10" variants={fadeInUp}>
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Our Investment Philosophy</h2>
          </div>
          <motion.p className="mt-2 max-w-3xl mx-auto text-muted-foreground md:text-lg" variants={fadeInUp}>
             We believe that financial empowerment is right, not a privilege. Our philosophy is rooted in the idea of trust, knowledge and accessibility to form the foundation of successful investment. We are committed to simplifying finance through innovation, ensuring that every client - whether a first time investor or a seasoned trader - has access to the tools, guidance and support they need to grow their wealth with confidence.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {investmentPhilosophyItems.map((item, index) => (
            <motion.div key={item.title} variants={cardVariants(index)} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.3 }}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Separator className="my-16" />

      <motion.section className="mb-16" variants={fadeInUp}>
         <motion.div className="text-center mb-10" variants={fadeInUp}>
             <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <History className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Our History</h2>
             </div>
        </motion.div>
         <div className="relative mt-8">
           <div className="absolute top-0 bottom-0 w-0.5 bg-border left-3 md:left-1/2 md:w-1 md:-translate-x-1/2"></div>
            <div className="space-y-8 md:space-y-12">
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={cardVariants(index)}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, amount: 0.3 }}
                  className={cn(
                    "relative",
                    "md:flex md:items-center",
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  <div className="hidden md:block md:w-5/12"></div>
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-md"></div>
                  </div>
                  <div className="absolute left-3 top-1 w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-md md:hidden transform -translate-x-1/2">
                  </div>
                  <div
                    className={cn(
                      "ml-10 p-4 rounded-lg shadow-lg bg-card text-left",
                      "md:w-5/12 md:ml-0",
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    )}
                  >
                    <h3 className="text-xl font-bold text-primary">{item.year} - {item.event}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </motion.section>

      <Separator className="my-16" />

      <motion.section variants={fadeInUp}>
        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <UsersRound className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Meet Our Team</h2>
          </div>
          <motion.p className="mt-2 max-w-2xl mx-auto text-muted-foreground md:text-lg" variants={fadeInUp}>
            The dedicated professionals behind your financial success.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
             <motion.div key={member.name} variants={cardVariants(index)} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.3 }}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl h-full">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                    <AvatarImage src={member.avatarSrc} alt={member.name} data-ai-hint={member.avatarHint} />
                    <AvatarFallback className="text-2xl bg-muted text-muted-foreground">{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn Profile</span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

// export const metadata: Metadata = { // This can be uncommented if you want to keep static metadata here
//   title: `About Us`,
//   description: `Learn about ${APP_NAME}, founded in 2024, our mission to make investing easy and fair, our investment philosophy, and our commitment to client-centric financial empowerment.`,
// };
