import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* mui */
import { Box } from '@mui/material';
import { setCurrentToolbar } from '../../features/app/appSlice';
/* node-lib */
import NodeCard from '../../features/nodes/components/NodeCard';
import { indexNodes } from '../../features/nodes/nodeSlice';

export default function NodeIndex() {
  const nodes = useSelector((state) => state.nodes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentToolbar('NodeIndexToolbar'));
    dispatch(indexNodes());
  }, [dispatch]);

  const cards = Object.keys(nodes).map((id) => (
    <NodeCard key={id} id={id} />
  ));

  return (
    <Box height={1} sx={{ backgroundColor: 'background.mainContent' }}>
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
          {cards}
        </Box>
      </Box>
    </Box>
  );
}
