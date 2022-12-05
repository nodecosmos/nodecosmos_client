import React, { useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PanTip from '../tips/PanTip';
import usePannable from '../../hooks/usePannable';
import TransformablePath from './TransformablePath';
// import useZoomable from '../../hooks/useZoomable';

export default function Transformable(props) {
  const { children, treeHeight } = props;
  const gRef = useRef(null);
  const theme = useTheme();

  const matches600 = useMediaQuery('(max-width: 600px)');
  const matchesLaptop = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('lg'));

  const scale = matches600 ? 0.7 : 1;
  const height = 800 * scale;
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
          position: 'relative',
          overflow: matchesSm ? 'auto' : 'hidden',
          border: `${borderWidth}px solid #5a6577`,
          borderRadius: '4px 4px 0px 0px',
          background: {
            xs: '#2f3238',
            sm: 'transparent',
          },
        }}
      >
        <TransformablePath panX={pan.x} />
        <Box
          ref={gRef}
          onMouseDown={handleMouseDown}
          // onTouchStart={handlePinch}
          sx={{
            // touchAction: 'none',
            p: 0,
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
            height={treeHeight}
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
  treeHeight: PropTypes.number.isRequired,
};
