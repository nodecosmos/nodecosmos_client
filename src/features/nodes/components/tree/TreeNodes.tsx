import Node from './Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import { selectVisibleTreeNodeIds } from '../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export interface TreeNodesProps {
    treeBranchId: string;
}

export default function TreeNodes(props: TreeNodesProps) {
    const { treeBranchId } = props;

    const treeNodeIds = useSelector(selectVisibleTreeNodeIds(treeBranchId));

    if (!treeNodeIds || treeNodeIds.length === 0) return null;

    return (
        <g>
            <g>
                {treeNodeIds.map((id) => (
                    <Node
                        key={id}
                        treeBranchId={treeBranchId}
                        id={id}
                    />
                ))}
            </g>
            <DropNodeAreas />
        </g>
    );
}
