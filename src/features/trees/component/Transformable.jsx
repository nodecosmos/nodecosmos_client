/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformablePositions } from '../../app/appSlice';
import { selectPosition } from '../trees.selectors';
import { TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN } from '../trees.constants';
// import usePannable from '../../hooks/usePannable';
// import useZoomable from '../../hooks/useZoomable';

export default function Transformable(props) {
  const { children, rootId } = props;
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const { yEnd } = useSelector(selectPosition(rootId));
  const height = (yEnd || 0) + TRANSFORMABLE_HEIGHT_MARGIN;

  const [width, setWidth] = React.useState(TRANSFORMABLE_MIN_WIDTH);

  const resize = () => {
    const newWidth = gRef.current.getBBox().width + TRANSFORMABLE_WIDTH_MARGIN;

    if (newWidth > TRANSFORMABLE_MIN_WIDTH) {
      setWidth(newWidth);
    }
  };

  // handle zoom
  // const {
  //   zoom, handleWheel, enableScroll, handleTouchStart: handlePinch,
  // } = useZoomable(gRef, scale, setPan, pan);

  // window.addEventListener('keyup', enableScroll);

  const dispatch = useDispatch();

  const scrollTimeout = useRef(null);
  const handleScroll = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    }
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
      dispatch(setTransformablePositions({
        id: rootId,
        clientHeight: containerRef.current.clientHeight,
        scrollTop: containerRef.current.scrollTop,
      }));
    }, 100);
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
    <div
      ref={containerRef}
      onClick={resize}
      onScroll={resize}
      onTouchStart={resize}
      onScrollCapture={(e) => handleScroll(e)}
      style={{
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
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
    </div>
  );
}

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
  rootId: PropTypes.string.isRequired,
};
