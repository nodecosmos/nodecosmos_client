import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import Box from '@mui/material/Box';
/* micro */
import MicronToolbar from '../../MicronToolbar';

function MicronItemToolbar(props) {
  const { micron, opacity } = props;

  return (
    <Box className="MicronActions" sx={{ ml: 2, opacity, height: 35 }}>
      <MicronToolbar />
    </Box>
  );
}

MicronItemToolbar.propTypes = {
  micron: PropTypes.object.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default MicronItemToolbar;
