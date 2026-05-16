'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PulsingIconProps {
  children: ReactNode;
  duration?: number;
}

export default function PulsingIcon({
  children,
  duration = 2.8,
}: PulsingIconProps) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.52, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'loop',
      }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {children}
    </motion.span>
  );
}
