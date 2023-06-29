/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../app.selectors';
import { setTransformablePositions } from '../appSlice';
import { TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN } from '../constants';
import usePannable from '../hooks/usePannable';

export default function Transformable({ children, transformableId, scale }) {
  const containerRef = useRef(null);
  const gRef = useRef(null);
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const { scrollTop } = useSelector(selectTransformablePositionsById(transformableId));

  setTimeout(() => {
    const height = (gRef.current && gRef.current.getBBox().height) + TRANSFORMABLE_HEIGHT_MARGIN;

    const newWidth = (gRef.current && gRef.current.getBBox().width + TRANSFORMABLE_WIDTH_MARGIN);
    const width = newWidth > TRANSFORMABLE_MIN_WIDTH ? newWidth : TRANSFORMABLE_MIN_WIDTH;

    if (height !== dimensions.height || width !== dimensions.width) {
      setDimensions({ height, width });
    }
  }, 100);

  //--------------------------------------------------------------------------------------------------------------------
  const { onMouseDown } = usePannable(containerRef);

  //--------------------------------------------------------------------------------------------------------------------
  const handleScroll = () => {
    requestAnimationFrame(() => {
      dispatch(setTransformablePositions({
        id: transformableId,
        scrollTop: containerRef.current.scrollTop,
      }));
    });
  };

  useEffect(() => {
    if (scrollTop && containerRef.current && containerRef.current.scrollTop !== scrollTop) {
      containerRef.current.scrollTop = scrollTop;
    } else if (containerRef.current) {
      dispatch(setTransformablePositions({
        id: transformableId,
        clientHeight: containerRef.current.clientHeight * (1 / scale),
        scrollTop: containerRef.current.scrollTop,
      }));
    }
  }, [dispatch, transformableId, scrollTop, scale]);

  const resizeTimeout = useRef(null);

  window.addEventListener('resize', () => {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }

    resizeTimeout.current = setTimeout(() => {
      if (containerRef.current) {
        dispatch(setTransformablePositions({
          id: transformableId,
          clientHeight: containerRef.current.clientHeight * (1 / scale),
        }));
      }
    }, 250);
  });

  useEffect(() => {
    if (containerRef.current) {
      dispatch(setTransformablePositions({
        id: transformableId,
        clientHeight: containerRef.current.clientHeight * (1 / scale),
      }));
    }
  }, [dispatch, transformableId, scale]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      ref={containerRef}
      onMouseDown={onMouseDown}
      onScroll={(e) => handleScroll(e)}
      sx={{
        overflow: 'auto',
        width: 1,
        height: 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={dimensions.width}
        height={dimensions.height}
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        <g ref={gRef}>
          {children}
        </g>
      </svg>
    </Box>
  );
}

Transformable.defaultProps = {
  scale: 1,
};

Transformable.propTypes = {
  children: PropTypes.element.isRequired,
  transformableId: PropTypes.string.isRequired,
  scale: PropTypes.number,
};
