
'use client';

import { motion } from 'framer-motion';

const loaderVariants = {
  initial: { x: '-101%' }, // Start fully off-screen to the left
  enter: { x: '0%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }, // Slide in to cover screen
  exit: { x: '101%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.5 } }, // Slide out to the right after a delay
};

export function PageTransitionLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-foreground" // Using a theme color similar to #252525
      variants={loaderVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      key="page-transition-loader-instance" // Ensure it's treated as a single animated instance
    />
  );
}
