import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import Node from './Node';
import NodeDescriptionMd from './NodeDescriptionMd';
import Transformable from './Transformable';
import NestedNodes from './NestedNodes';
import { terminateNewNode } from './landingPageNodeSlice';

export default function Tree(props) {
  const { id } = props;
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(terminateNewNode());
  }, [dispatch]);

  return (
    <Box
      className="Tree"
      display={{
        xs: 'block',
        md: 'flex',
      }}
      sx={{
        width: 1,
      }}
    >
      <Transformable>
        <g>
          <Node
            id={id}
            nestedLevel={0}
            isRoot
          >
            <NestedNodes currentNodeId={id} />
          </Node>
        </g>
      </Transformable>
      <Box width={{
        xs: 1,
        md: '38.19700%',
      }}
      >
        <NodeDescriptionMd />
      </Box>
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
