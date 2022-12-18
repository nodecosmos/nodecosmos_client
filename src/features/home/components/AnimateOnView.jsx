import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';
import { useMediaQuery, useTheme } from '@mui/material';

export default function AnimateOnView(props) {
  const {
    children,
    initialScale,
    initialOpacity,
  } = props;

  let { delay } = props;

  const [opacity, setOpacity] = React.useState(initialOpacity);
  const [scale, setScale] = React.useState(initialScale);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    delay = 0;
  }

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setOpacity(1);
        setScale(1);
      }, delay);
    } else {
      setOpacity(initialOpacity);
      setScale(initialScale);
    }
  }, [inView, delay, initialOpacity, initialScale]);

  return (
    <Box
      ref={ref}
      height={1}
      sx={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 500ms, transform 500ms',
      }}
    >
      {children}
    </Box>
  );
}

AnimateOnView.defaultProps = {
  delay: 0,
  initialScale: 0.9,
  initialOpacity: 0,
};

AnimateOnView.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  initialOpacity: PropTypes.number,
  initialScale: PropTypes.number,
};
