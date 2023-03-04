import React, { useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import usePannable from '../hooks/usePannable';
// import useZoomable from '../../hooks/useZoomable';
const isFirefox = typeof InstallTrigger !== 'undefined';

export default function LandingPageTransformable(props) {
  const { children } = props;
  const gRef = useRef(null);
  const svgRef = useRef(null);
  const theme = useTheme();

  const matchesSm = useMediaQuery(theme.breakpoints.down('lg'));
  const scale = matchesSm ? 0.7 : 1;

  const containerHeight = 800 * scale;

  const minHeight = matchesSm ? 790 : 800;
  const minWidth = matchesSm ? 400 : 1050;

  const resize = () => {
    const newHeight = gRef.current.getBBox().height + 50;
    const newWidth = gRef.current.getBBox().width + 50;

    svgRef.current.setAttribute('height', newHeight > minHeight ? newHeight : minHeight);
    svgRef.current.setAttribute('width', newWidth > minWidth ? newWidth : minWidth);
  };

  // handle pan
  const {
    pan,
    handleMouseDown,
  } = usePannable(gRef);

  // handle zoom
  // const {
  //   zoom, handleWheel, enableScroll, handleTouchStart: handlePinch,
  // } = useZoomable(gRef, scale, setPan, pan);

  // window.addEventListener('keyup', enableScroll);

  const transition = isFirefox ? 'none' : 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      onClick={resize}
      onMouseDown={handleMouseDown}
      onTouchStart={resize}
      overflow={{
        xs: 'auto',
        lg: 'hidden',
      }}
      width={{
        xs: '100%',
        lg: '61.803%',
      }}
    >
      {/* <TransformablePath panX={pan.x} /> */}
      <Box
          // onTouchStart={handlePinch}
        sx={{
          p: 0,
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
          transformOrigin: 'top left',
          height: containerHeight,
        }}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transition,
        }}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width={minWidth}
          height={minHeight}
          style={{
            marginLeft: -35,
            marginTop: -10,
          }}
        >
          <g ref={gRef}>
            {children}
          </g>
        </svg>
      </Box>
    </Box>
  );
}

LandingPageTransformable.propTypes = {
  children: PropTypes.element.isRequired,
};
