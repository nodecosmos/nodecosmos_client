/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectChildIdsByParentId } from '../../nodes/nodes.selectors';
import useTreeNodeVirtualizer from '../hooks/useTreeNodesVirtualizer';
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setTreeNodesPositions } from '../treesSlice';
import { TREES_TYPES } from '../trees.constants';
import { selectDragAndDrop, selectTreeNodes } from '../trees.selectors';
import useTreeContext from '../hooks/useTreeContext';
import useTreeCommands from '../hooks/useTreeCommands';
import Node from './node/Node';
import DraggableNodePoints from './reorderer/DraggableNodePoints';

const MemoizedNode = React.memo(Node);

export default function TreeNodes({
    rootNodeId, type,
}) {
    const treeNodes = useSelector(selectTreeNodes(rootNodeId));
    const childIdsByParentId = useSelector(selectChildIdsByParentId);
    const positionsById = useTreePositionCalculator(rootNodeId);
    const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId);
    const dispatch = useDispatch();
    const { isDragging: nodeDragInProgress } = useSelector(selectDragAndDrop);

    const { shouldRebuildTree } = useTreeContext();
    const { finishTreeRebuild } = useTreeCommands();

    const isTreeBuilt = treeNodes && !!treeNodes[rootNodeId];

    useEffect(() => {
        if (isTreeBuilt && !shouldRebuildTree) return;

        dispatch(buildTreeFromRootNode({ rootId: rootNodeId, childIdsByParentId, type }));

        if (shouldRebuildTree) finishTreeRebuild();
    }, [dispatch, rootNodeId, childIdsByParentId, type, isTreeBuilt, finishTreeRebuild, shouldRebuildTree]);

    useEffect(() => {
        if (nodeDragInProgress) return;
        dispatch(setTreeNodesPositions({ rootNodeId, positionsById }));
    }, [dispatch, nodeDragInProgress, positionsById, rootNodeId]);

    return (
        <g>
            <g>
                {treeNodeIdsToView.map(([treeNodeId, isAlreadyMounted]) => (
                    <MemoizedNode
                        key={treeNodeId}
                        treeNodeId={treeNodeId}
                        isAlreadyMounted={isAlreadyMounted}
                    />
                ))}
            </g>
            <DraggableNodePoints rootNodeId={rootNodeId} />
        </g>

    );
}

TreeNodes.defaultProps = {
    type: TREES_TYPES.default,
};

TreeNodes.propTypes = {
    rootNodeId: PropTypes.string.isRequired,
    type: PropTypes.string,
};
