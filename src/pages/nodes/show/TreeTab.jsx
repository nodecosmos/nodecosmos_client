import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NodeDescription from '../../../features/nodes/components/NodeDescription';
import Tree from '../../../features/nodes/components/tree/Tree';
import TreeStyledContainer from '../../../features/nodes/components/tree/TreeStyledContainer';
import { clearTree } from '../../../features/nodes/nodesSlice';

export default function TreeTab() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(clearTree());
  });

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        borderRight={{ xs: 0, md: 1 }}
        borderColor={{ xs: 'borders.box.xs', md: 'borders.box.md' }}
        boxShadow={{ xs: 0, md: 'boxBorder.right.md' }}
        width="50%"
        height="100%"
      >
        <TreeStyledContainer>
          <Tree id={id} />
        </TreeStyledContainer>
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
