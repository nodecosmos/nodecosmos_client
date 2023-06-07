/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../app.selectors';
import { setTransformablePositions } from '../appSlice';
import { TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN } from '../constants';
import usePannable from '../hooks/usePannable';

export default function Transformable(props) {
  const { children, transformableId } = props;
  const containerRef = useRef(null);
  const gRef = useRef(null);
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const { scrollTop } = useSelector(selectTransformablePositionsById(transformableId));

  setTimeout(() => {
    const height = (gRef.current && gRef.current.getBBox().height) + TRANSFORMABLE_HEIGHT_MARGIN;

    const newWidth = (gRef.current && gRef.current.getBBox().width + TRANSFORMABLE_WIDTH_MARGIN);
    const width = newWidth > TRANSFORMABLE_MIN_WIDTH ? newWidth : TRANSFORMABLE_MIN_WIDTH;

    if (height !== dimensions.height || width !== dimensions.width) { setDimensions({ height, width }); }
  }, 100);

  //--------------------------------------------------------------------------------------------------------------------
  const { onMouseDown } = usePannable(containerRef);

  //--------------------------------------------------------------------------------------------------------------------
  const handleScroll = () => {
    requestAnimationFrame(() => {
      dispatch(setTransformablePositions({
        id: transformableId,
        clientHeight: containerRef.current.clientHeight,
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
        clientHeight: containerRef.current.clientHeight,
        scrollTop: containerRef.current.scrollTop,
      }));
    }
  }, [dispatch, transformableId, scrollTop]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      ref={containerRef}
      onScrollCapture={(e) => handleScroll(e)}
      onMouseDown={onMouseDown}
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
  transformableId: PropTypes.string.isRequired,
};
