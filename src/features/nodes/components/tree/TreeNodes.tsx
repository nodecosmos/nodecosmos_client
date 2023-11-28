import Node from './Node';
import DraggableNodePoints from './reorder/DraggableNodePoints';
import { selectTreeNodeIds } from '../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export interface TreeNodesProps {
    branchId: string;
}

export default function TreeNodes(props: TreeNodesProps) {
    const { branchId } = props;

    const treeNodeIds = useSelector(selectTreeNodeIds(branchId));

    if (!treeNodeIds) return null;

    return (
        <g>
            <g>
                {treeNodeIds.map((id) => (
                    <Node
                        key={id}
                        branchId={branchId}
                        id={id}
                    />
                ))}
            </g>
            <DraggableNodePoints />
        </g>

    );
}

