import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformablePositions } from '../../features/app/appSlice';
import {
  TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN,
} from '../../features/app/constants';
import usePannable from '../hooks/usePannable';
import {
  selectTransformablePositionAttribute,
} from '../../features/app/app.selectors';

export default function Transformable({
  children, transformableId, scale, heightMargin,
}) {
  const containerRef = useRef(null);
  const gRef = useRef(null);
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const scrollTop = useSelector(selectTransformablePositionAttribute(transformableId, 'scrollTop'));

  setTimeout(() => {
    const gRefHeight = gRef.current?.getBBox().height || 0;
    const gRefWidth = gRef.current?.getBBox().width || 0;

    const svgHeight = gRefHeight + heightMargin;
    const clientHeight = containerRef.current?.clientHeight || 0;
    const height = Math.max(svgHeight, clientHeight - 8);

    const newWidth = gRefWidth + TRANSFORMABLE_WIDTH_MARGIN;
    const width = newWidth > TRANSFORMABLE_MIN_WIDTH ? newWidth : TRANSFORMABLE_MIN_WIDTH;

    if (height !== dimensions.height || width !== dimensions.width) {
      setDimensions({ height, width });
    }
  }, 250);

  //------------------------------------------------------------------------------------------------
  const { onMouseDown } = usePannable(containerRef);

  //------------------------------------------------------------------------------------------------
  const handleScroll = () => {
    requestAnimationFrame(() => {
      dispatch(setTransformablePositions({
        id: transformableId,
        scrollTop: containerRef.current.scrollTop,
      }));
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      dispatch(setTransformablePositions({
        id: transformableId,
        clientHeight: containerRef.current.clientHeight,
        scrollTop: containerRef.current.scrollTop,
      }));
    }
  }, [dispatch, transformableId]);

  // used by breadcrumbs
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const resizeTimeout = useRef(null);
  const clientHeight = containerRef.current?.clientHeight;

  useEffect(() => {
    window.onresize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      resizeTimeout.current = setTimeout(() => {
        if (!clientHeight) return;
        dispatch(setTransformablePositions({
          id: transformableId,
          clientHeight: containerRef.current.clientHeight,
        }));
      }, 100);
    };

    return () => {
      window.onresize = null;
    };
  }, [dispatch, transformableId, clientHeight]);

  //------------------------------------------------------------------------------------------------
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
      <Box
        sx={{
          transformOrigin: 'top left',
          width: 1,
          height: 1,
        }}
        style={{ transform: `scale(${scale})` }}
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
            display: 'block',
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

Transformable.defaultProps = {
  scale: 1,
  heightMargin: TRANSFORMABLE_HEIGHT_MARGIN,
};

Transformable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
  transformableId: PropTypes.string.isRequired,
  scale: PropTypes.number,
  heightMargin: PropTypes.number,
};
