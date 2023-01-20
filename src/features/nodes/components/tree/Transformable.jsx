import React, { useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import usePannable from '../../hooks/usePannable';
// import useZoomable from '../../hooks/useZoomable';
const isFirefox = typeof InstallTrigger !== 'undefined';

export default function Transformable(props) {
  const { children } = props;
  const gRef = useRef(null);
  const svgRef = useRef(null);
  const theme = useTheme();

  const matchesSm = useMediaQuery(theme.breakpoints.down('lg'));
  const scale = matchesSm ? 0.7 : 1;

  const minHeight = 800;
  const minWidth = 800;

  const resize = () => {
    setTimeout(() => {
      const newHeight = gRef.current.getBBox().height + 500;
      const newWidth = gRef.current.getBBox().width + 500;

      svgRef.current.setAttribute('height', newHeight > minHeight ? newHeight : minHeight);
      svgRef.current.setAttribute('width', newWidth > minWidth ? newWidth : minWidth);
    }, 0);
  };

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
      onTouchStart={resize}
      overflow="auto"
      width={1}
      height={1}
    >
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
          height: 1,
        }}
        style={{
          transform: `scale(${scale})`,
          transition,
        }}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width={minWidth}
          height={minHeight}
        >
          <g ref={gRef}>
            {children}
          </g>
        </svg>
      </Box>
    </Box>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
};
