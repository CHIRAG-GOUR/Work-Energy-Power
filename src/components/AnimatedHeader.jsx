import React from 'react';
import { motion } from 'framer-motion';

const headerAnimations = {
  wave: {
    hidden: { opacity: 0, y: 40, rotateX: 30 },
    visible: (i) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  },
  slide: {
    hidden: { opacity: 0, x: -60 },
    visible: (i) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.05, duration: 0.5, type: 'spring', stiffness: 120 }
    })
  },
  pop: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: (i) => ({
      opacity: 1, scale: 1,
      transition: { delay: i * 0.04, duration: 0.4, type: 'spring', stiffness: 200, damping: 12 }
    })
  },
  flip: {
    hidden: { opacity: 0, rotateY: 90, y: 20 },
    visible: (i) => ({
      opacity: 1, rotateY: 0, y: 0,
      transition: { delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    })
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 30 },
    visible: (i) => ({
      opacity: 1, filter: 'blur(0px)', y: 0,
      transition: { delay: i * 0.05, duration: 0.6, ease: 'easeOut' }
    })
  },
  bounce: {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.04, duration: 0.5, type: 'spring', bounce: 0.6 }
    })
  },
  typewriter: {
    hidden: { opacity: 0, x: -10, scaleX: 0.8 },
    visible: (i) => ({
      opacity: 1, x: 0, scaleX: 1,
      transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' }
    })
  },
  cascade: {
    hidden: { opacity: 0, y: -40, scale: 0.5 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.06, duration: 0.5, type: 'spring', stiffness: 150, damping: 15 }
    })
  }
};

const animationNames = Object.keys(headerAnimations);

const AnimatedHeader = ({
  children,
  animation = 'wave',
  as = 'h1',
  style = {},
  className = '',
  color
}) => {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');
  const anim = headerAnimations[animation] || headerAnimations.wave;
  const Tag = motion[as] || motion.h1;

  const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    fontSize: as === 'h1' ? '3.2rem' : as === 'h2' ? '2.2rem' : '1.5rem',
    fontWeight: 800,
    fontFamily: '"Playfair Display", serif',
    color: color || '#1e293b',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    perspective: '600px',
    ...style
  };

  return (
    <Tag
      style={baseStyle}
      className={className}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={anim}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedHeader;
export { animationNames };
