
'use client';

import { motion } from 'framer-motion';
import { APP_NAME } from '@/lib/constants';

const loaderVariants = {
  initial: { y: '101%' }, // Start fully off-screen at the bottom
  enter: { y: '0%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }, // Slide in from bottom to cover screen
  exit: { y: '-101%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.5 } }, // Slide out to the top after a delay
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.3 }, // Delay text appearance slightly
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 150,
    },
  },
};

export function PageTransitionLoader() {
  const appNameChars = APP_NAME.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-accent flex items-center justify-center" // Changed background, added flex
      variants={loaderVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      key="page-transition-loader-instance"
    >
      <motion.div
        className="text-center overflow-hidden" // Added overflow-hidden for safety with y-transforms
        variants={textContainerVariants}
        // Animate 'visible' when loader is 'enter', 'hidden' when loader is 'exit'
        // This is implicitly handled by being a child of the loader's motion.div
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-accent-foreground tracking-wide">
          {appNameChars.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={charVariants}
              className="inline-block"
              // Use non-breaking space for actual spaces to maintain layout during animation
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </motion.div>
  );
}
