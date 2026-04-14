import type {Variants} from "framer-motion";

const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const
};

export const fadeIn = (delay = 0): Variants => ({
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      ...transition,
      delay
    }
  }
});

export const slideUp = (delay = 0): Variants => ({
  hidden: {opacity: 0, y: 28},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
      delay
    }
  }
});

export const staggerContainer = (staggerChildren = 0.14, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});
