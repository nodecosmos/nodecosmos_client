import React from 'react';
import { useSelector } from 'react-redux';
import NodeCardsContainer from './NodeCardsContainer';
import NodeCard from './NodeCard';

export default function NodeCards() {
  const nodes = useSelector((state) => state.nodes.indexNodesById);

  return (
    <NodeCardsContainer>
      {Object.keys(nodes).map((id) => (
        <NodeCard key={id} id={id} />
      ))}
    </NodeCardsContainer>
  );
}
