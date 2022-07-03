import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
/* mui */
import { Box } from '@mui/material';
import { setCurrentToolbar } from '../../features/app/appSlice';
/* node-lib */
import NodeCard from '../../features/nodes/components/NodeCard';
import { indexNodes } from '../../features/nodes/nodeSlice';

function NodeIndex(props) {
  const { nodes } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentToolbar('NodeIndexToolbar'));
    dispatch(indexNodes());
  }, [dispatch]);

  const renderNodes = () => Object.keys(nodes).map((nodeId) => {
    const node = nodes[nodeId];
    return (
      <Box width="60%" p={2} key={nodeId}>
        <NodeCard node={node} />
      </Box>
    );
  });

  return (
    <Box height={1}>
      <Box p={2} mt="2px" height={0.95}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          spacing={3}
          mt={-2}
          height={1}
          overflow="auto"
        >
          {renderNodes()}
        </Box>
      </Box>
    </Box>
  );
}

NodeIndex.propTypes = {
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { nodes } = state;
  return { nodes };
}

export default connect(mapStateToProps)(NodeIndex);
