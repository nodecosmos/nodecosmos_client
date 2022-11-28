import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PanTip from '../tips/PanTip';
import usePannable from '../../hooks/usePannable';
import useZoomable from '../../hooks/useZoomable';

export default function Transformable(props) {
  const { children } = props;
  const gRef = useRef(null);

  const matches600 = useMediaQuery('(max-width: 600px)');
  const matchesLaptop = useMediaQuery('(min-width: 1024px)');

  const scale = matches600 ? 0.5 : 1;
  const height = matches600 ? 400 : 800;
  const borderWidth = !matchesLaptop ? 1 : 0;

  // handle pan
  const {
    pan, handleMouseDown, setPan,
  } = usePannable(gRef);

  // handle zoom
  const {
    zoom, enableScroll,
  } = useZoomable(gRef, scale, setPan, pan);

  window.addEventListener('keyup', enableScroll);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          // touchAction: 'none',
          p: 0,
          borderRadius: '0px 0px 8px 8px',
          height,
          border: `${borderWidth}px solid #5a6577`,
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
          background: {
            xs: '#2f3238',
            sm: 'transparent',
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000%"
          height="800"
          onMouseDown={handleMouseDown}
          // onWheel={(event) => {
          //   if (isPanning) return;
          //   handleWheel(event);
          // }}
          // onTouchStart={(event) => {
          //   handlePinch(event); // zoom feature is disabled for now as it is not working well on mobile
          //   handleTouchStart(event);
          // }}
          onMouseLeave={enableScroll}
        >
          <g
            ref={gRef}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            }}
          >
            {children}
          </g>
        </svg>
      </Box>
      <PanTip />
    </>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
};
