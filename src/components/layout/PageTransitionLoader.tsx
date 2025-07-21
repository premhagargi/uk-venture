
'use client';

import { motion } from 'framer-motion';

export const PageTransitionLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] origin-[0%_50%]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
    />
  );
};
