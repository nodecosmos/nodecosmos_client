import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* mui */
import { Container } from '@mui/material';
import { setCurrentToolbar } from '../../features/app/appSlice';
/* node-lib */
import NodeCard from '../../features/nodes/components/NodeCard';
import { indexNodes } from '../../features/nodes/nodes.thunks';

export default function NodeIndex() {
  const nodes = useSelector((state) => state.nodes.indexNodesById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentToolbar('NodeIndexToolbar'));
    dispatch(indexNodes());
  }, [dispatch]);

  const cards = Object.keys(nodes).map((id) => (
    <NodeCard key={id} id={id} />
  ));

  return (
    <Container
      maxWidth="md"
      overflow="auto"
    >
      {cards}
    </Container>
  );
}
