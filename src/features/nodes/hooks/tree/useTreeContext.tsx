import useTreeActions from './useTreeActions';
import useTreeBuilder from './useTreeBuilder';
import { Position, UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import {
    ANCESTOR_RADIUS, COMPACT_ANCESTOR_RADIUS, COMPACT_DROP_INDICATOR_Y_OFFSET,
    COMPACT_EDGE_LENGTH, COMPACT_FONT_SIZE,
    COMPACT_MARGIN_TOP,
    COMPACT_NODE_HEIGHT, COMPACT_NODE_MARGIN_LEFT, COMPACT_STROKE_WIDTH, DROP_INDICATOR_Y_OFFSET,
    EDGE_LENGTH,
    FONT_SIZE,
    MARGIN_TOP,
    NODE_HEIGHT, NODE_MARGIN_LEFT, STROKE_WIDTH,
} from '../../nodes.constants';
import {
    selectDensity, selectShowAncestorChain, selectShowTreeColors,
} from '../../nodes.selectors';
import { TreeDensity, TreeType } from '../../nodes.types';
import {
    createContext, useContext, useMemo,
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
    dropIndicatorYOffset: number;
    nodeMarginLeft: number;
}

export interface TreeContextValue extends TreeProps {
    selectedNodeIds: Set<UUID>;
    treeNodes: TreeNodes;
    orderedTreeNodeIds: UUID[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
    size: NodeSize;
    showAncestorChain: boolean;
    showTreeColors: boolean;
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

const NODE_SIZE = {
    [TreeDensity.Default]: {
        height: NODE_HEIGHT,
        marginTop: MARGIN_TOP,
        edgeLength: EDGE_LENGTH,
        fontSize: FONT_SIZE,
        yLength: EDGE_LENGTH + MARGIN_TOP,
        pathWidth: STROKE_WIDTH,
        circleRadius: ANCESTOR_RADIUS,
        dropIndicatorYOffset: DROP_INDICATOR_Y_OFFSET,
        nodeMarginLeft: NODE_MARGIN_LEFT,
    },
    [TreeDensity.Compact]: {
        height: COMPACT_NODE_HEIGHT,
        marginTop: COMPACT_MARGIN_TOP,
        edgeLength: COMPACT_EDGE_LENGTH,
        fontSize: COMPACT_FONT_SIZE,
        yLength: COMPACT_EDGE_LENGTH + COMPACT_MARGIN_TOP,
        pathWidth: COMPACT_STROKE_WIDTH,
        circleRadius: COMPACT_ANCESTOR_RADIUS,
        dropIndicatorYOffset: COMPACT_DROP_INDICATOR_Y_OFFSET,
        nodeMarginLeft: COMPACT_NODE_MARGIN_LEFT,
    },
};

export const TreeContext = createContext<TreeContextValue>({ } as TreeContextValue);

export function useTreeContextValue(props: TreeProps) {
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
    const showTreeColors = useSelector(selectShowTreeColors);
    const size = useMemo(() => {
        return NODE_SIZE[treeDensity];
    }, [treeDensity]);

    const {
        treeNodes,
        orderedTreeNodeIds,
        setTreeNodes,
    } = useTreeBuilder({
        treeRootId: rootId,
        branchId,
        type,
        size,
    });

    return useMemo(() => ({
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
        showTreeColors,
    }),
    [
        orderedTreeNodeIds, rootId, selectedNodeIds, branchId, treeNodes, type,
        onChange, setTreeNodes, size, showAncestorChain, showTreeColors,
    ]);
}

export default function useTreeContext() {
    const ctx = useContext(TreeContext);
    const actions = useTreeActions(ctx);

    return useMemo(() => ({
        ...ctx,
        ...actions,
    }), [actions, ctx]);
}
