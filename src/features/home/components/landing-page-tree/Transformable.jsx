import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PanTip from '../tips/PanTip';
import usePannable from '../../hooks/usePannable';
// import useZoomable from '../../hooks/useZoomable';

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
    pan,
    handleMouseDown,
    // setPan,
    // handleTouchStart,
  } = usePannable(gRef);

  // handle zoom
  // const {
  //   zoom, handleWheel, enableScroll, handleTouchStart: handlePinch,
  // } = useZoomable(gRef, scale, setPan, pan);

  // window.addEventListener('keyup', enableScroll);

  const isFirefox = typeof InstallTrigger !== 'undefined';
  const transition = isFirefox ? 'none' : 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          border: `${borderWidth}px solid #5a6577`,
          background: {
            xs: '#2f3238',
            sm: 'transparent',
          },
        }}
      >
        <Box
          ref={gRef}
          onMouseDown={handleMouseDown}
          // onWheel={handleWheel}
          // onTouchStart={(event) => {
          //   handlePinch(event); // zoom feature is disabled for now as it is not working well on mobile
          //   handleTouchStart(event);
          // }}
          // onMouseLeave={enableScroll}
          sx={{
            // touchAction: 'none',
            p: 0,
            borderRadius: '0px 0px 8px 8px',
            height,
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
          }}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: matches600 && 'top left',
            transition,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000%"
            height="1000%"
          >
            <g>
              {children}
            </g>
          </svg>
        </Box>
      </Box>
      <PanTip />
    </>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
};
