import useTreeContext from './useTreeContext';
import { useTransformableContext } from '../../../../common/hooks/useTransformableContext';
import { UUID } from '../../../../types';
import { isYInViewport } from '../../../../utils/position';
import { selectJustCreatedNodeId, selectScale } from '../../nodes.selectors';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

type isAlreadyMounted = boolean;
type VirtualizedNode = [UUID, isAlreadyMounted];

export default function useTreeVirtualizer(): VirtualizedNode[] {
    const { orderedTreeNodeIds, treeNodes } = useTreeContext();
    const justCreatedNodeId = useSelector(selectJustCreatedNodeId);
    const transformablePosition = useTransformableContext();
    const prevIsMounted = useRef<Set<UUID>>(new Set());
    const treeScale = useSelector(selectScale);

    return useMemo(() => {
        const visibleNodes: VirtualizedNode[] = [];
        const alreadyRendered = new Set<UUID>();

        if (!orderedTreeNodeIds) return [];

        for (let i = 0; i < orderedTreeNodeIds.length; i += 1) {
            const id = orderedTreeNodeIds[i];
            const node = treeNodes[id];
            if (!node) continue;

            const {
                isTreeRoot,
                isMounted,
                parentId,
                y,
            } = node;
            const parent = parentId ? treeNodes[parentId] : null;
            const isInViewport = isYInViewport(y, transformablePosition, treeScale);
            const isLastChild = parent?.lastChildId === id;

            if (isMounted && (isInViewport || isLastChild || isTreeRoot)) {
                alreadyRendered.add(id);

                if (isInViewport && parentId && !alreadyRendered.has(parentId)) {
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
    }, [justCreatedNodeId, orderedTreeNodeIds, transformablePosition, treeNodes, treeScale]);
}
