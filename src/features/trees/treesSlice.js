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
     *    persistentNodeId: string,
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
     *   [treeNodeId: string]: {
     *     x: number,
     *     y: number,
     *     xEnd: number,
     *     yEnd: number,
     *   },
     * }}
     */
    positionsByNodeId: {},

    /**
     * @type {treeNodeId}
     * @description
     * Used to mount newly created nodes.
     */
    currentTempNodeId: null,
  },
  reducers: {
    buildTreeFromRootNode: treeBuilder.buildTreeFromRootNode,
    setTreeNodesPositions: treeNodePositionSetter.setTreeNodesPositions,

    expandTreeNode: treeNodeMounter.expandTreeNode,
    collapseTreeNode: treeNodeMounter.collapseTreeNode,

    updateTreeNode: treeNodeUpdater.updateTreeNode,

    setCurrentTempNodeId(state, action) { state.currentTempNodeId = action.payload; },
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
  buildTreeFromRootNode,
  setTreeNodesPositions,
  expandTreeNode,
  collapseTreeNode,
  updateTreeNode,
  setCurrentTempNodeId,
} = actions;

export default reducer;
