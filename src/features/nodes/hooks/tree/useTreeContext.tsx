import useTreeBuilder from './useTreeBuilder';
import { Position, UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import { NodeId, TreeType } from '../../nodes.types';
import {
    createContext, useContext, useEffect, useMemo,
} from 'react';

interface TreeContextValue extends TreeProps {
    selectedNodeIds: Set<UUID>;
    treeNodes: TreeNodes;
    orderedTreeNodeIds: NodeId[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
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
        buildTree,
    } = useTreeBuilder({
        treeRootId: rootNodeId,
        treeBranchId,
        type,
    });

    useEffect(() => {
        buildTree();
    }, [buildTree]);

    const ctxValue = useMemo(
        () => ({
            treeBranchId,
            rootNodeId,
            type,
            selectedNodeIds,
            treeNodes,
            orderedTreeNodeIds,
            onChange,
            setTreeNodes,
        }),
        [
            orderedTreeNodeIds, rootNodeId, selectedNodeIds, treeBranchId, treeNodes, type,
            onChange, setTreeNodes,
        ],
    );

    return {
        TreeContext,
        ctxValue,
    };
}

// TODO: separate state and commands
// TODO: consider renaming commands to actions
export default function useTreeContext() {
    return useContext(TreeContext);
}
