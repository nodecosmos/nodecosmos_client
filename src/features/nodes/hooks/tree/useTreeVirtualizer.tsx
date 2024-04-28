import useTreeContext from './useTreeContext';
import { UUID } from '../../../../types';
import { isYInViewport } from '../../../../utils/position';
import { selectTransformablePositionsById } from '../../../app/app.selectors';
import { selectJustCreatedNodeId } from '../../nodes.selectors';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

type isAlreadyMounted = boolean;
type VirtualizedNode = [UUID, isAlreadyMounted];

export default function useTreeVirtualizer(): VirtualizedNode[] {
    const {
        branchId, orderedTreeNodeIds, treeNodes,
    } = useTreeContext();
    const justCreatedNodeId = useSelector(selectJustCreatedNodeId);
    const transformablePositions = useSelector(selectTransformablePositionsById(branchId));
    const prevIsMounted = useRef<Set<UUID>>(new Set());

    return useMemo(() => {
        const visibleNodes: VirtualizedNode[] = [];
        const alreadyRendered = new Set<UUID>();

        if (!orderedTreeNodeIds) return [];

        for (let i = 0; i < orderedTreeNodeIds.length; i += 1) {
            const id = orderedTreeNodeIds[i];
            const node = treeNodes[id];
            if (!node) continue;

            const {
                isMounted,
                parentId,
                y,
            } = node;
            const parent = parentId ? treeNodes[parentId] : null;
            const isInViewport = isYInViewport(y, transformablePositions);
            const isLastChild = parent?.lastChildId === id;

            if (isMounted && (isInViewport || isLastChild)) {
                alreadyRendered.add(id);

                if (parentId && !alreadyRendered.has(parentId)) {
                    alreadyRendered.add(parentId);

                    visibleNodes.push([
                        parentId,
                        Boolean(prevIsMounted.current.has(parentId)),
                    ]);
                }

                visibleNodes.push([
                    id,
                    Boolean(justCreatedNodeId === id || prevIsMounted.current.has(id)),
                ]);
            }

            if (isMounted) {
                prevIsMounted.current.add(id);
            } else {
                prevIsMounted.current.delete(id);
            }
        }

        return visibleNodes;
    }, [justCreatedNodeId, orderedTreeNodeIds, transformablePositions, treeNodes]);
}
