import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Transformable(props) {
  const { children } = props;
  const [scale, setScale] = useState(1);

  const onWheel = (event) => {
    const newVal = Math.min(Math.max(1, scale + event.deltaY * -0.002), 2);

    setScale(newVal);
  };

  return (
    <svg
      onWheel={onWheel}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className="DropShadow"
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
