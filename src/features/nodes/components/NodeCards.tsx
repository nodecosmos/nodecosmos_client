import NodeCard from './NodeCard';
import NodeCardsContainer from './NodeCardsContainer';
import { selectIndexedNode } from '../selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodeCards() {
    const nodes = useSelector(selectIndexedNode);

    return (
        <NodeCardsContainer>
            {Object.keys(nodes).map((id) => (
                <NodeCard key={id} id={id} />
            ))}
        </NodeCardsContainer>
    );
}
