
'use client';

import { FinancialInsightsTool } from '@/components/insights/FinancialInsightsTool';
import { APP_NAME } from '@/lib/constants';
import { Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';

// export const metadata: Metadata = { // Metadata should be static or generated via generateMetadata
//   title: `Smart Financial Insights `,
//   description: `Utilize our AI-driven tool on ${APP_NAME} to analyze your financial summary and receive key insights and potential areas of concern.`,
// };

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }
};

export default function InsightsPage() {
  return (
    <motion.div 
      className="container px-4 md:px-6 pt-12 md:pt-36 pb-16 md:pb-20 lg:pb-24"
      initial="initial"
      animate="whileInView"
      variants={{ initial: {}, whileInView: {transition: {staggerChildren: 0.2}}}}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={fadeInUp}>
        <motion.div variants={fadeInUp}>
          <Lightbulb className="h-16 w-16 text-primary mx-auto mb-4" />
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground"
          variants={fadeInUp}
        >
          Unlock Your Financial Potential
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl"
          variants={fadeInUp}
        >
          Our Smart Financial Insights tool uses advanced AI to analyze your financial situation and provide actionable advice. Understand your finances better and make smarter decisions.
        </motion.p>
      </motion.div>
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.1 }}>
        <FinancialInsightsTool />
      </motion.div>
    </motion.div>
  );
}

export const metadata: Metadata = {
  title: `Smart Financial Insights `,
  description: `Utilize our AI-driven tool on ${APP_NAME} to analyze your financial summary and receive key insights and potential areas of concern.`,
};
