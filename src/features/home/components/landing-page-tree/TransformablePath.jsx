import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';

export default function TransformablePath(props) {
  const { panX } = props;
  const matches600 = useMediaQuery('(max-width: 600px)');

  const isFirefox = typeof InstallTrigger !== 'undefined';
  const transition = isFirefox ? 'none' : 'transform 340ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';

  if (matches600) return null;

  return (
    <Box
      component="svg"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '800px',
      }}
    >
      <path
        strokeWidth={2}
        d="M 769 -100 L 769 900"
        stroke="#414650"
        fill="transparent"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: 'dash 2s forwards',
          transform: `translateX(${panX}px)`,
          transition,
        }}
      />
    </Box>
  );
}

TransformablePath.propTypes = {
  panX: PropTypes.number.isRequired,
};
