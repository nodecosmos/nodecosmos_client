import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import NodeToolbar from '../../../NodeToolbar';

function NodeItemToolbar(props) {
  const { node, opacity } = props;

  return (
    <Box className="NodeActions" sx={{ ml: 2, opacity, height: 35 }}>
      <NodeToolbar />
    </Box>
  );
}

NodeItemToolbar.propTypes = {
  node: PropTypes.object.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default NodeItemToolbar;
