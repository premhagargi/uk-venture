
'use client';

import { FinancialInsightsTool } from '@/components/insights/FinancialInsightsTool';
import { APP_NAME } from '@/lib/constants';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

// Word-by-word animation variants
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

// General fade-in-up for paragraphs or less prominent elements
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 10, stiffness: 100, delay: 0.1 },
  },
}

// Stagger children for sections
const sectionStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const pageTitle = "Unlock Your Financial Potential";
const pageDescription = `Our Smart Financial Insights tool uses advanced AI to analyze your financial situation and provide actionable advice. Understand your finances better and make smarter decisions.`;


export default function InsightsPage() {
  return (
    <motion.div
      className="container px-4 md:px-6 pt-12 md:pt-40 pb-16 md:pb-20 lg:pb-24"
      initial="hidden"
      whileInView="visible"
      variants={sectionStaggerVariants}
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={sentenceContainerVariants}>
        <motion.div variants={iconVariants}>
          <Lightbulb className="h-16 w-16 text-primary mx-auto mb-4" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground"
          variants={sentenceContainerVariants}
        >
          {pageTitle.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em"}}>{word}</motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl"
          variants={fadeInUpVariants}
        >
         {pageDescription}
        </motion.p>
      </motion.div>
      <motion.div variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <FinancialInsightsTool />
      </motion.div>
    </motion.div>
  );
}

// export const metadata: Metadata = {
//   title: `Smart Financial Insights `,
//   description: `Utilize our AI-driven tool on ${APP_NAME} to analyze your financial summary and receive key insights and potential areas of concern.`,
// };
