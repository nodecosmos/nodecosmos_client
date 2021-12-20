import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Box,
} from '@mui/material';

export default function Tree(props) {
  const { micron } = props;

  if (!micron) return null;

  return (
    <Box width={1} height="calc(100%-45px)" p={4}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text x={30} y={15} fill="white">{micron.title}</text>
        <circle cx={20} cy={10} r="4" fill="#e91e63" />
        <circle cx={20} cy={50} r="4" fill="#e91e63" />
        <circle cx={70} cy={50} r="4" fill="#e91e63" />
        {/* <path strokeWidth={3} d="M 20 10 C 10 10, 0 80, 70 50" stroke="#e91e63" fill="transparent" /> */}
        {/* <path strokeWidth={3} d="M 20 10 Q 2 75 70 50" stroke="#e91e63" fill="transparent" /> */}
        <path
          strokeWidth={3}
          d="M 20 10 A 30 50 0 0 1 162.55 162.45"
          stroke="#e91e63"
          fill="transparent"
        />
      </svg>
    </Box>
  );
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
};
