import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';

export default function NodeSectionLink(props) {
  const { pathStroke, circleFill, strokeWidth } = props;
  const ref = React.createRef();

  const refInView = useInView(ref, { amount: 0.1 });

  return (
    <svg
      width={760}
      height={190}
      version="1.1"
      id="svg5"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <defs id="defs2" />
      <g id="layer1" transform="translate(-320.0,-230)">
        <path
          style={{
            fill: 'none',
            fillOpacity: 1,
            stroke: pathStroke,
            strokeWidth,
            strokeOpacity: 1,
            strokeDasharray: 1032.3072,
            strokeDashoffset: 1032.3072,
            animation: refInView ? 'node-link 0.5s forwards' : 'node-link-reverse 0.3s forwards',
          }}
          d="m 698.47,241.72424
             v 44.71745
             l -0.40938,27.34781
             c -0.84391,15.12641 -21.08006,14.14461 -30.90792,14.30333
             l -308.6109,0.8204 c -6.52848,0.20841 -22.84019,-1.37459 -25.91924,17.40476
             l -1.22194,62.50904"
          id="path5853"
        />
        <path
          style={{
            fill: 'none',
            fillOpacity: 1,
            stroke: pathStroke,
            strokeWidth,
            strokeDasharray: 1032.3072,
            strokeDashoffset: 1032.3072,
            animation: refInView ? 'node-link 0.5s forwards' : 'node-link-reverse 0.3s forwards',
          }}
          d="m 698.47,241.724
            v 44.71745
            l 0.4094,27.34781
            c 0.8439,15.12641 21.08,14.14461 30.9079,14.30333
            l 308.6109,0.8204
            c 6.5285,0.20841 22.8402,-1.37459 25.9192,17.40476
            l 1.222,62.50904"
          id="path5853-2"
        />
        <circle
          style={{
            fill: circleFill,
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 5,
            strokeDasharray: 'none',
            strokeOpacity: 1,
            r: refInView ? 9 : 0,
            transition: `r 0.3s ${refInView ? '0s' : '0.3s'}`,
          }}
          id="path8022"
          cx="698.65106"
          cy="243.73494"
        />
        <circle
          style={{
            fill: circleFill,
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 5,
            strokeDasharray: 'none',
            strokeOpacity: 1,
            r: refInView ? 9 : 0,
            transition: `r 0.3s ${refInView ? '0.4s' : '0s'}`,
          }}
          id="path8022-6"
          cx="331.34399"
          cy="408.86957"
        />
        <circle
          style={{
            fill: circleFill,
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 5,
            strokeDasharray: 'none',
            strokeOpacity: 1,
            r: refInView ? 9 : 0,
            transition: `r 0.3s ${refInView ? '0.4s' : '0s'}`,
          }}
          id="path8022-6-1"
          cx="1065.4189"
          cy="408.86942"
        />
      </g>
    </svg>
  );
}

NodeSectionLink.defaultProps = {
  circleFill: '#414650',
  pathStroke: '#414650',
  strokeWidth: 5,
};

NodeSectionLink.propTypes = {
  circleFill: PropTypes.string,
  pathStroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};
