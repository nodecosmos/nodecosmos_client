import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

export default function WorkflowButton(props) {
  const { x, y, title } = props;

  return (
    <foreignObject width="100%" height={40} x={x} y={y}>
      <Box display="flex" width="100%">
        <Button
          className="expanded"
          style={{ backgroundColor: '#414650' }}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            {title}
          </Box>
        </Button>
      </Box>
    </foreignObject>
  );
}

WorkflowButton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
