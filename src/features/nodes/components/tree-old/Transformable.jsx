import React, { useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import usePannable from '../../hooks/usePannable';

export default function Transformable(props) {
  const { children } = props;
  const gRef = useRef(null);

  const matches600 = useMediaQuery('(max-width: 600px)');

  const scale = matches600 ? 0.5 : 1;
  const height = matches600 ? 400 : 800;
  const borderWidth = matches600 ? 1 : 0;

  const {
    pan, isPanning, handleMouseDown, handleTouchStart,
  } = usePannable(gRef, { x: 0, y: 0 });

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      mt={2}
      sx={{
        overflow: 'hidden',
        touchAction: 'none',
        p: 0,
        height,
        border: `${borderWidth}px solid #3c434f`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="800"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Box
          component="g"
          ref={gRef}
          sx={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'top left',
            transition: isPanning ? 'none' : 'transform 0.5s ease',
          }}
        >
          {children}
        </Box>
      </svg>
    </Box>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
};
