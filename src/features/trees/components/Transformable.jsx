/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setTransformablePositions } from '../../app/appSlice';
import usePannable from '../hooks/usePannable';
import { TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN } from '../trees.constants';

export default function Transformable(props) {
  const { children, rootId } = props;
  const containerRef = useRef(null);
  const gRef = useRef(null);
  const dispatch = useDispatch();

  const height = (gRef.current && gRef.current.getBBox().height) + TRANSFORMABLE_HEIGHT_MARGIN;

  const newWidth = (gRef.current && gRef.current.getBBox().width + TRANSFORMABLE_WIDTH_MARGIN);
  const width = newWidth > TRANSFORMABLE_MIN_WIDTH ? newWidth : TRANSFORMABLE_MIN_WIDTH;

  //--------------------------------------------------------------------------------------------------------------------
  const { onMouseDown } = usePannable(containerRef);

  //--------------------------------------------------------------------------------------------------------------------
  const handleScroll = () => {
    requestAnimationFrame(() => {
      dispatch(setTransformablePositions({
        id: rootId,
        clientHeight: containerRef.current.clientHeight,
        scrollTop: containerRef.current.scrollTop,
      }));
    });
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
      onScrollCapture={(e) => handleScroll(e)}
      onMouseDown={onMouseDown}
      style={{
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
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
