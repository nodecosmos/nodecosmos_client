import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useAnimation, motion, useInView } from 'framer-motion';

export default function AnimateOnView(props) {
  const controls = useAnimation();
  const {
    delay, visible, hidden, children, threshold,
  } = props;
  const [currentThreshold, setCurrentThreshold] = React.useState(threshold);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: currentThreshold });

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
    transition: { duration: 0.6 },
  },
  hidden: {
    opacity: 0,
    scale: 1,
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
