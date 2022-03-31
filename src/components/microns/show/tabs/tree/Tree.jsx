import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
import MicronTreeNode from './MicronTreeNode';

export default function Tree(props) {
  const { micron } = props;

  if (!micron) return null;

  return (
    <Box className="Tree" sx={{ p: 4, width: 1, height: 1 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g className="DropShadow">
          <MicronTreeNode micron={micron} nestedLevel={1} />
        </g>
      </svg>
    </Box>
  );
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
};
