import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformablePositions } from '../../../app/appSlice';
// import usePannable from '../../hooks/usePannable';
// import useZoomable from '../../hooks/useZoomable';
// const isFirefox = typeof InstallTrigger !== 'undefined';

const TRANSFORMABLE_HEIGHT_MARGIN = 200;
const MIN_WIDTH = 800;

export default function Transformable(props) {
  const { children, rootId } = props;
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const height = useSelector((state) => (state.nodes.positionsById[rootId]?.yEnds || 0) + TRANSFORMABLE_HEIGHT_MARGIN);

  const resize = () => {
    setTimeout(() => {
      const newWidth = gRef.current.getBBox().width + 500;

      svgRef.current.setAttribute('width', newWidth > MIN_WIDTH ? newWidth : MIN_WIDTH);
    });
  };

  // handle zoom
  // const {
  //   zoom, handleWheel, enableScroll, handleTouchStart: handlePinch,
  // } = useZoomable(gRef, scale, setPan, pan);

  // window.addEventListener('keyup', enableScroll);

  // const transition = isFirefox ? 'none' : 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';

  const dispatch = useDispatch();

  const handleScroll = () => {
    dispatch(setTransformablePositions({
      id: rootId,
      clientHeight: containerRef.current.clientHeight,
      scrollTop: containerRef.current.scrollTop,
    }));
  };

  useEffect(() => {
    if (containerRef.current) {
      dispatch(setTransformablePositions({
        id: rootId,
        clientHeight: containerRef.current.clientHeight,
        scrollTop: containerRef.current.scrollTop,
      }));
    }
  }, [dispatch, rootId]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      ref={containerRef}
      onClick={resize}
      onScrollCapture={(e) => handleScroll(e)}
      onScroll={resize}
      onTouchStart={resize}
      overflow="auto"
      width={1}
      height={1}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={MIN_WIDTH}
        height={height}
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
          transformOrigin: 'top left',
        }}
      >
        <g ref={gRef}>
          {children}
        </g>
      </svg>
    </Box>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
  rootId: PropTypes.string.isRequired,
};
