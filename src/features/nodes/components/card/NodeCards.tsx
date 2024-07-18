import NodeCard from './NodeCard';
import { selectIndexNodesById } from '../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodeCards() {
    const nodes = useSelector(selectIndexNodesById);

    return Object.keys(nodes).map((id) => (
        <NodeCard key={id} id={id} />
    ));
}
