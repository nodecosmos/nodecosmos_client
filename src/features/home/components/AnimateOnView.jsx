import React, { useEffect, useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useAnimation, motion, useInView } from 'framer-motion';

export default function AnimateOnView(props) {
  const controls = useAnimation();
  const {
    visible, hidden, children, threshold,
  } = props;

  let { delay } = props;

  const [currentThreshold, setCurrentThreshold] = React.useState(threshold);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: currentThreshold });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // disable scale animation on mobile
  // disable delay on mobile
  if (isMobile) {
    // hidden.scale = 1;
    delay = 0;
  }

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, delay);
    } else {
      setCurrentThreshold(0);
      controls.start('hidden');
    }
  }, [controls, inView, delay, threshold]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{ visible, hidden }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

AnimateOnView.defaultProps = {
  delay: 0,
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  threshold: 0.4,
};

AnimateOnView.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  visible: PropTypes.object,
  hidden: PropTypes.object,
  threshold: PropTypes.number,
};
