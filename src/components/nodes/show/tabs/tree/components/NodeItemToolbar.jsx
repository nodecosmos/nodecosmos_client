import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import NodeToolbar from '../../../NodeToolbar';

function NodeItemToolbar(props) {
  const { node } = props;

  return (
    <Box className="NodeActions" sx={{ ml: 2 }}>
      <NodeToolbar />
    </Box>
  );
}

NodeItemToolbar.propTypes = {
  node: PropTypes.object.isRequired,
};

export default NodeItemToolbar;
