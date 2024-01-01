import useTreeBuilder from './context/useTreeBuilder';
import { Position, UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import { NodeId, TreeType } from '../../nodes.types';
import {
    createContext, useContext, useMemo,
} from 'react';

interface TreeContextValue extends TreeProps {
    selectedNodeIds: Set<UUID>;
    treeNodes: TreeNodes;
    setTreeNodes: (treeNodes: TreeNodes) => void;
    orderedTreeNodeIds: NodeId[];
}

export type UpperSiblingId = UUID | null;
export type LowerSiblingId = UUID | null;
export type SiblingIndex = number;

export interface TreeNode extends Position {
    id: NodeId;
    parentId?: NodeId;
    childIds: NodeId[];
    treeRootId: NodeId;
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
        rootNodeId,
        treeBranchId,
        type = TreeType.Default,
        onChange,
        value,
    } = props;
    const selectedNodeIds = useMemo(() => new Set<UUID>(value), [value]);
    // build tree
    const {
        treeNodes,
        orderedTreeNodeIds,
        setTreeNodes,
    } = useTreeBuilder({
        treeRootId: rootNodeId,
        treeBranchId,
        type,
    });
    const ctxProviderValue = useMemo(
        () => ({
            treeBranchId,
            rootNodeId,
            type,
            onChange,
            selectedNodeIds,
            treeNodes,
            orderedTreeNodeIds,
            setTreeNodes,
        }),
        [
            onChange, orderedTreeNodeIds, rootNodeId, selectedNodeIds,
            setTreeNodes, treeBranchId, treeNodes, type,
        ],
    );

    return {
        TreeContext,
        ctxProviderValue,
    };
}

export default function useTreeContext() {
    return useContext(TreeContext);
}
