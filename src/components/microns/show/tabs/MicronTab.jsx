import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Typography,
  Box,
} from '@mui/material';

export default function MicronTab(props) {
  const { micron } = props;

  return (
    <Box py={4} px={5} width={1}>
      <Typography variant="h5" textAlign="center" mb={2}>
        {micron.title}
      </Typography>
      <Typography variant="body2" fontWeight="normal">
        {micron.description}
      </Typography>
    </Box>
  );
}

MicronTab.propTypes = {
  micron: PropTypes.object.isRequired,
};
