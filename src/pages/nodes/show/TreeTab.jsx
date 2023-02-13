import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import NodeDescription from '../../../features/nodes/components/NodeDescription';
import TreeContainer from '../../../features/trees/component/TreeContainer';
import Tree from '../../../features/trees/component/Tree';

export default function TreeTab() {
  const { id } = useParams();

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        borderRight={{ xs: 0, md: 1 }}
        borderColor={{ xs: 'borders.box.xs', md: 'borders.box.md' }}
        boxShadow={{ xs: 0, md: 'boxBorder.right.md' }}
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
        <NodeDescription />
      </Box>
    </Box>
  );
}
