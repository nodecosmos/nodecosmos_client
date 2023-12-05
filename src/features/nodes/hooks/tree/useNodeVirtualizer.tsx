import { UUID } from '../../../../types';
import { isYInViewport } from '../../../../utils/position';
import { selectTransformablePositionsById } from '../../../app/app.selectors';
import {
    selectBranchNodes, selectBranchOrderedTreeIds, selectBranchPositions,
} from '../../nodes.selectors';
import { NodeId } from '../../nodes.types';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

type AlreadyMounted = boolean;
type VirtualizedNode = [NodeId, AlreadyMounted];

export default function useNodeVirtualizer(treeBranchId: UUID): VirtualizedNode[] {
    const branchPositions = useSelector(selectBranchPositions(treeBranchId));
    const treeNodeIds = useSelector(selectBranchOrderedTreeIds(treeBranchId));
    const transformablePositions = useSelector(selectTransformablePositionsById(treeBranchId));
    const branchNodes = useSelector(selectBranchNodes(treeBranchId));
    const prevIsMounted = useRef<Set<NodeId>>(new Set());

    return useMemo(() => {
        const visibleNodes: VirtualizedNode[] = [];
        const alreadyRendered = new Set<NodeId>();

        if (!treeNodeIds) return [];

        for (let i = 0; i < treeNodeIds.length; i += 1) {
            const id = treeNodeIds[i];
            const node = branchNodes[id];
            const {
                isMounted,
                parentId,
                isJustCreated,
            } = node;
            const { y } = branchPositions[id];
            const parent = branchNodes[parentId];
            const isInViewport = isYInViewport(y, transformablePositions);
            const isLastChild = parent?.lastChildId === id;

            if (isMounted && (isInViewport || isLastChild)) {
                alreadyRendered.add(id);

                // we render parent if any child is rendered
                if (parent && !alreadyRendered.has(parentId)) {
                    alreadyRendered.add(parentId);

                    visibleNodes.push([
                        parentId,
                        Boolean(prevIsMounted.current.has(parentId)),
                    ]);
                }

                visibleNodes.push([
                    id,
                    Boolean(isJustCreated || prevIsMounted.current.has(id)),
                ]);
            }

            if (isMounted) {
                prevIsMounted.current.add(id);
            } else {
                prevIsMounted.current.delete(id);
            }
        }

        return visibleNodes;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branchPositions, transformablePositions, treeNodeIds]);
}
