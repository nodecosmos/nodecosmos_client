
/* reducers */
import buildTmpTreeNode from './reducers/tmpTreeNodeAdder';
import replaceTmpTreeNodeWithPersistedNode from './reducers/tmpTreeNodeReplacer';
import buildTreeFromRootNode from './reducers/treeBuilder';
import deleteTreeNodeFromState from './reducers/treeNodeDeleter';
import { expandTreeNode, collapseTreeNode } from './reducers/treeNodeMounter';
import setTreeNodesPositions from './reducers/treeNodePositionSetter';
import updateTreeNode from './reducers/treeNodeUpdater';
import { createNode, deleteNode } from '../nodes/nodes.thunks';
import { createSlice } from '@reduxjs/toolkit';

const treesSlice = createSlice({
    name: 'trees',
    initialState: {
    /**
     * @type {{
     *  [rootId: string]: {
     *    treeNodeId: string,
     *    treeParentId: string,
     *    treeUpperSiblingId: string,
     *    treeAncestorIds: string[],
     *    treeChildIds: string[],
     *    treeDescendantIds: string[],
     *    treeLastChildId: string,
     *    nodeId: string,
     *    rootId: string,
     *    isRoot: boolean,
     *    isMounted: boolean,
     *    isExpanded: boolean,
     *    isEditing: boolean,
     *    nestedLevel: number,
     *   },
     * }}
     */
        byRootNodeId: {},

        /**
     * @type {{
     *   [treeNodeId: string]: treeNodeId[],
     * }}
     * @description
     * We need to keep track of the order of the tree nodes, so we make sure
     * to calculate the positions of the nodes in the correct order e.g.
     * Parent before child, or upperSibling before lowerSibling.
     * It should have better performance than using Object.values().sort().
     */
        orderedTreeNodeIdsByRootNodeId: {},

        /**
     * @type {{
     *   [rootId: string]: {
     *     [treeNodeId: string]: {
     *       x: number,
     *       y: number,
     *       xEnd: number,
     *       yEnd: number,
     *     },
     *   }
     * }}
     */
        positionsByRootIdAndTreeNodeId: {},

        /**
     * @type {treeNodeId}
     * @description
     * Used to mount newly created nodes.
     */
        currentTempNodeId: null,

        /**
     * @type {treeNodeId}
     */
        selectedTreeNodeId: null,

        /**
     * @type {{
     *   isDragging: boolean,
     *   treeNodeId: treeNodeId,
     * }}
     */
        dragAndDrop: {
            isDragging: false,
            treeNodeId: null,
            nodeId: null,
            rootId: null,
        },

        /**
     * @type {boolean}
     */
        isTreeLoading: false,
    },
    reducers: {
        setDragAndDrop(state, action) { state.dragAndDrop = action.payload; },
        clearDragAndDrop(state) { state.dragAndDrop = { isDragging: false, treeNodeId: null, nodeId: null }; },
        setTreeLoading(state, action) { state.isTreeLoading = action.payload; },
        setSelectedTreeNode(state, action) { state.selectedTreeNodeId = action.payload; },

        buildTreeFromRootNode,
        setTreeNodesPositions,

        expandTreeNode,
        collapseTreeNode,

        updateTreeNode,

        buildTmpTreeNode,
        deleteTreeNodeFromState,
        replaceTmpTreeNodeWithPersistedNode,
    },
    extraReducers(builder) {
        builder.addCase(createNode.fulfilled, (state) => { state.currentTempNodeId = null; });
        builder.addCase(deleteNode.fulfilled, (state, action) => deleteTreeNodeFromState(state, action));
    },
});

export const { actions } = treesSlice;

export default treesSlice.reducer;
