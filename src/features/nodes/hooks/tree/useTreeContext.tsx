import useTreeActions from './useTreeActions';
import useTreeBuilder from './useTreeBuilder';
import { Position, UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import {
    ANCESTOR_RADIUS, COMPACT_ANCESTOR_RADIUS,
    COMPACT_EDGE_LENGTH, COMPACT_FONT_SIZE,
    COMPACT_MARGIN_TOP,
    COMPACT_NODE_HEIGHT, COMPACT_STROKE_WIDTH,
    EDGE_LENGTH,
    FONT_SIZE,
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT, STROKE_WIDTH,
} from '../../nodes.constants';
import { selectDensity, selectShowAncestorChain } from '../../nodes.selectors';
import { TreeDensity, TreeType } from '../../nodes.types';
import {
    createContext, useContext, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

export interface NodeSize {
    height: number;
    marginTop: number;
    edgeLength: number;
    fontSize: number;
    yLength: number;
    pathWidth: number;
    circleRadius: number;
}

export interface TreeContextValue extends TreeProps {
    selectedNodeIds: Set<UUID>;
    treeNodes: TreeNodes;
    orderedTreeNodeIds: UUID[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
    size: NodeSize;
    showAncestorChain: boolean;
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

const NODE_SIZE = {
    [TreeDensity.Default]: {
        height: NODE_BUTTON_HEIGHT,
        marginTop: MARGIN_TOP,
        edgeLength: EDGE_LENGTH,
        fontSize: FONT_SIZE,
        yLength: EDGE_LENGTH + MARGIN_TOP,
        pathWidth: STROKE_WIDTH,
        circleRadius: ANCESTOR_RADIUS,
    },
    [TreeDensity.Compact]: {
        height: COMPACT_NODE_HEIGHT,
        marginTop: COMPACT_MARGIN_TOP,
        edgeLength: COMPACT_EDGE_LENGTH,
        fontSize: COMPACT_FONT_SIZE,
        yLength: COMPACT_EDGE_LENGTH + COMPACT_MARGIN_TOP,
        pathWidth: COMPACT_STROKE_WIDTH,
        circleRadius: COMPACT_ANCESTOR_RADIUS,
    },
};

export function useTreeContextCreator(props: TreeProps) {
    const {
        rootId,
        branchId,
        type = TreeType.Default,
        onChange,
        value,
    } = props;
    const selectedNodeIds = useMemo(() => new Set<UUID>(value), [value]);
    const treeDensity = useSelector(selectDensity);
    const showAncestorChain = useSelector(selectShowAncestorChain);
    const size = useMemo(() => {
        return NODE_SIZE[treeDensity];
    }, [treeDensity]);

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
        size,
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
            size,
            showAncestorChain,
        }),
        [
            orderedTreeNodeIds, rootId, selectedNodeIds, branchId, treeNodes, type,
            onChange, setTreeNodes, size, showAncestorChain,
        ],
    );

    return {
        TreeContext,
        ctxValue,
    };
}

export default function useTreeContext() {
    const ctx = useContext(TreeContext);
    const actions = useTreeActions(ctx);

    return useMemo(() => ({
        ...ctx,
        ...actions,
    }), [actions, ctx]);
}
