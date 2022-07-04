import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
/* nodecosmos */
import Node from './components/Node';
import Transformable from './components/Transformable';
import NestedNodes from './components/NestedNodes';

export default function Tree(props) {
  const { id } = props;

  return (
    <Box className="Tree" sx={{ width: 1, height: 1 }}>
      <Transformable>
        <Node
          id={id}
          nestedLevel={0}
          index={0}
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
