import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import NodeDetails from '../../../features/nodes/components/NodeDetails';
import TreeContainer from '../../../features/trees/components/TreeContainer';
import Tree from '../../../features/trees/components/Tree';

export default function TreeTab() {
  const { id } = useParams();

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        borderRight={{ xs: 0, md: 1 }}
        borderColor={{ xs: 'borders.box.xs', md: 'borders.box.md' }}
        width="50%"
        height="100%"
      >
        <TreeContainer>
          <Tree rootNodeId={id} />
        </TreeContainer>
      </Box>
      <Box
        width={{
          xs: 1,
          md: '50%',
        }}
        // position={{
        //   xs: 'sticky',
        //   md: 'static',
        // }}
        // bottom={{
        //   xs: 0,
        //   md: 'auto',
        // }}
      >
        <NodeDetails />
      </Box>
    </Box>
  );
}
