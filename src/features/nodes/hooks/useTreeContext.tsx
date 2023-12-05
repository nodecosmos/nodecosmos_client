import { Position, UUID } from '../../../types';
import { TreeProps } from '../components/tree/Tree';
import { NodeId, TreeType } from '../nodes.types';
import {
    createContext, useContext, useMemo,
} from 'react';

interface TreeContextValue extends TreeProps{
    selectedNodeIds: Set<UUID>;
}

export type UpperSiblingId = UUID | null;
export type LowerSiblingId = UUID | null;
export type SiblingIndex = number;

export interface TreeNode extends Position {
    childIds: NodeId[];
    upperSiblingId: UpperSiblingId;
    lowerSiblingId: LowerSiblingId;
    lastChildId: NodeId;
    isMounted: boolean;
    isExpanded: boolean;
    siblingIndex: SiblingIndex;
    treeIndex: number;
    isTreeRoot: boolean;
    descendantIds: NodeId[];
    ancestorIds: NodeId[];
    nestedLevel: number;
}

export interface TreeNodes {
    [key: UUID]: TreeNode;
}

const TreeContext = createContext<TreeContextValue>({ } as TreeContextValue);

export function useTreeContextCreator(props: TreeProps) {
    const {
        treeBranchId, rootNodeId, type = TreeType.Default, onChange, value = null,
    } = props;

    const ctxProviderValue = useMemo(
        () => ({
            treeBranchId,
            rootNodeId,
            type,
            onChange,
            selectedNodeIds: new Set(value),
        }),
        [treeBranchId, rootNodeId, type, onChange, value],
    );

    return {
        TreeContext,
        ctxProviderValue,
    };
}

export default function useTreeContext() {
    return useContext(TreeContext);
}
