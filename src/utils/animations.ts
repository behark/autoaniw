/**
 * Animation utilities for AutoAni
 * Contains reusable animation variants for Framer Motion
 */

import { Variants } from 'framer-motion';

// Fade in/out animations
export const fadeAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

// Slide in from bottom
export const slideUpAnimation: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 1
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

// Slide in from right
export const slideInRightAnimation: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  },
  exit: { 
    x: 20, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

// Scale animations
export const scaleAnimation: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

// Card hover effect
export const cardHoverAnimation: Variants = {
  initial: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  hover: { 
    y: -4, 
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Media item hover effect
export const mediaItemAnimation: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.02,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: { duration: 0.1 }
  },
  selected: {
    scale: 1,
    boxShadow: '0 0 0 2px var(--color-primary-600)',
    transition: { duration: 0.2 }
  }
};

// List item hover
export const listItemAnimation: Variants = {
  initial: { backgroundColor: 'var(--color-bg-paper)' },
  hover: { 
    backgroundColor: 'var(--color-bg-subtle)',
    transition: { duration: 0.1 }
  }
};

// Staggered children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Animation for staggered grid items
export const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

// Button hover animations
export const buttonAnimation: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.04 },
  tap: { scale: 0.96 }
};

// Modal animations
export const modalAnimation: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 }
  }
};

// Modal backdrop animation
export const backdropAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

// Tooltip animation
export const tooltipAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: 5,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15 }
  },
  exit: { 
    opacity: 0,
    y: 5,
    transition: { duration: 0.1 }
  }
};
