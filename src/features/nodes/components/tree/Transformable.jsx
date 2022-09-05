import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Transformable(props) {
  const { children } = props;
  const [scale, setScale] = useState(1);
  const svgRef = useRef(null);

  const onWheel = (event) => {
    if (event.altKey) {
      const newVal = Math.min(Math.max(0.9, scale + event.deltaY * -0.002), 2);

      setScale(newVal);
    }
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      onWheel={onWheel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{
          transition: 'transform 20ms',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </g>
    </svg>
  );
}

Transformable.propTypes = {
  children: PropTypes.object.isRequired,
};
