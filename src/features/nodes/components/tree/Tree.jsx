import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
/* nodecosmos */
import Node from './Node';
import Transformable from './Transformable';
import NestedNodes from './NestedNodes';

export default function Tree(props) {
  const { id } = props;

  return (
    <Box className="Tree" sx={{ width: 1, height: 1 }}>
      <Transformable>
        <Node
          id={id}
          nestedLevel={0}
          isRoot
        >
          <NestedNodes currentNodeId={id} />
        </Node>
      </Transformable>
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
