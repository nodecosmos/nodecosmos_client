import { createSlice } from '@reduxjs/toolkit';
import { createNode } from '../nodes/nodes.thunks';

/* reducers */
import treeBuilder from './reducers/treeBuilder';
import treeNodePositionSetter from './reducers/treeNodePositionSetter';
import treeNodeMounter from './reducers/treeNodeMounter';
import treeNodeUpdater from './reducers/treeNodeUpdater';
import createNodeFulfilledReducer from './reducers/extra/createNode.fulfilled';

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
     *    isSelected: boolean,
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

    expandedNodeIds: [],
  },
  reducers: {
    setDragAndDrop(state, action) { state.dragAndDrop = action.payload; },
    clearDragAndDrop(state) { state.dragAndDrop = { isDragging: false, treeNodeId: null, nodeId: null }; },
    setTreeLoading(state, action) { state.isTreeLoading = action.payload; },

    buildTreeFromRootNode: treeBuilder.buildTreeFromRootNode,
    setTreeNodesPositions: treeNodePositionSetter.setTreeNodesPositions,

    expandTreeNode: treeNodeMounter.expandTreeNode,
    collapseTreeNode: treeNodeMounter.collapseTreeNode,

    updateTreeNode: treeNodeUpdater.updateTreeNode,

    setCurrentTempNodeId(state, action) { state.currentTempNodeId = action.payload; },
    setSelectedTreeNode(state, action) { state.selectedTreeNodeId = action.payload; },
  },
  extraReducers(builder) {
    builder.addCase(createNode.fulfilled, createNodeFulfilledReducer);
  },
});

const {
  actions,
  reducer,
} = treesSlice;

export const {
  setDragAndDrop,
  clearDragAndDrop,
  buildTreeFromRootNode,
  setTreeNodesPositions,
  expandTreeNode,
  collapseTreeNode,
  updateTreeNode,
  setCurrentTempNodeId,
  setSelectedTreeNode,
  setTreeLoading,
} = actions;

export default reducer;
