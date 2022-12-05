import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import Node from './Node';
import NodeDescriptionMd from './NodeDescriptionMd';
import NodeDescriptionSm from './NodeDescriptionSm';
import Transformable from './Transformable';
import NestedNodes from './NestedNodes';
import { terminateNewNode } from './landingPageNodeSlice';

export default function Tree(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const nodesLength = useSelector((state) => Object.keys(state.landingPageNodes).length);
  const [treeHeight, setTreeHeight] = React.useState(800);

  useEffect(() => () => {
    dispatch(terminateNewNode());
  }, [dispatch]);

  useEffect(() => {
    setTreeHeight(nodesLength * 51);
  }, [nodesLength]);

  return (
    <Box className="Tree" sx={{ width: 1, height: 1 }}>
      <Transformable treeHeight={treeHeight}>
        <g>
          <Node
            id={id}
            nestedLevel={0}
            isRoot
          >
            <NestedNodes currentNodeId={id} />
          </Node>
          <NodeDescriptionMd />
        </g>
      </Transformable>
      <NodeDescriptionSm />
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
