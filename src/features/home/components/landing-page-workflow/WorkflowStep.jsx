import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import WorkflowButton from './WorkflowButton';

export default function WorkflowStep(props) {
  const {
    x, y, title,
  } = props;

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

WorkflowStep.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
