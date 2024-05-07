import useTreeBuilder from './useTreeBuilder';
import { Position, UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import { TreeType } from '../../nodes.types';
import {
    createContext, useContext, useEffect, useMemo,
} from 'react';

interface TreeContextValue extends TreeProps {
    selectedNodeIds: Set<UUID>;
    treeNodes: TreeNodes;
    orderedTreeNodeIds: UUID[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
}

export type UpperSiblingId = UUID | null;
export type LowerSiblingId = UUID | null;
export type SiblingIndex = number;

export interface TreeNode extends Position {
    id: UUID;
    parentId?: UUID;
    childIds: UUID[];
    treeRootId: UUID;
    upperSiblingId: UpperSiblingId;
    lowerSiblingId: LowerSiblingId;
    lastChildId: UUID;
    isMounted: boolean;
    isExpanded: boolean;
    siblingIndex: SiblingIndex;
    treeIndex: number;
    isTreeRoot: boolean;
    descendantIds: UUID[];
    ancestorIds: UUID[];
    nestedLevel: number;
}

export interface TreeNodes {
    [key: UUID]: TreeNode;
}

const TreeContext = createContext<TreeContextValue>({ } as TreeContextValue);

export function useTreeContextCreator(props: TreeProps) {
    const {
        rootId,
        branchId,
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
        treeRootId: rootId,
        branchId,
        type,
    });

    useEffect(() => {
        buildTree();
    }, [buildTree]);

    const ctxValue = useMemo(
        () => ({
            branchId,
            rootId,
            type,
            selectedNodeIds,
            treeNodes,
            orderedTreeNodeIds,
            onChange,
            setTreeNodes,
        }),
        [
            orderedTreeNodeIds, rootId, selectedNodeIds, branchId, treeNodes, type,
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
