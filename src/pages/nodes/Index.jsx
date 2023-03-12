import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
/* mui */
import { Container } from '@mui/material';
import { setHeaderContent } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
/* node-lib */
import NodeCard from '../../features/nodes/components/NodeCard';
import { indexNodes } from '../../features/nodes/nodes.thunks';

export default function NodeIndex() {
  const nodes = useSelector((state) => state.nodes.indexNodesById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderContent('NodeIndexToolbar'));
    dispatch(indexNodes());
  }, [dispatch]);

  const cards = Object.keys(nodes).map((id) => (
    <NodeCard key={id} id={id} />
  ));

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        borderRight={1}
        height={1}
        borderColor="borders.1"
      />
      <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
        <Container
          maxWidth="md"
          overflow="auto"
        >
          {cards}
        </Container>
      </Box>
    </Box>
  );
}
