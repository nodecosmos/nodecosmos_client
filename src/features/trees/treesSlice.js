import { createSlice } from '@reduxjs/toolkit';
import { createNode, deleteNode } from '../nodes/nodes.thunks';
import treeBuilder from './reducers/treeBuilder';
import treeNodePositionSetter from './reducers/treeNodePositionSetter';
import treeNodeMounter from './reducers/treeNodeMounter';
import treeNodeBuilder from './reducers/treeNodeBuilder';
import treeNodeRemover from './reducers/treeNodeRemover';
import treeNodeSelector from './reducers/treeNodeSelectionSetter';
import treeNodeUpdater from './reducers/treeNodeUpdater';
import { extractRootIdFromTreeNodeId } from './trees.memoize';

const treesSlice = createSlice({
  name: 'trees',
  initialState: {
    /**
     * @type {{
     *  [rootId: string]: {
     *    treeNodeId: string,
     *    treeParentId: string,
     *    treeUpperSiblingId: string,
     *    treeLastChildId: string,
     *    nodeId: string,
     *    parentId: string,
     *    rootId: string,
     *    isRoot: boolean,
     *    isMounted: boolean,
     *    isExpanded: boolean,
     *    isSelected: boolean,
     *    isEditing: boolean,
     *    isTemp: boolean,
     *    treeChildIds: string[],
     *    treeAncestorIds: string[],
     *    treeDescendantIds: string[],
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
     * However, difference may be negligible.
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
  },
  reducers: {
    // manual mapping so it's easier to navigate
    buildTreeFromRootNode: treeBuilder.buildTreeFromRootNode,
    setTreeNodesPositions: treeNodePositionSetter.setTreeNodesPositions,
    expandTreeNode: treeNodeMounter.expandTreeNode,
    collapseTreeNode: treeNodeMounter.collapseTreeNode,
    buildChildNode: treeNodeBuilder.buildChildNode,
    handleNewNodeCreation: treeNodeBuilder.handleNewNodeCreation,
    setSelectedTreeNode: treeNodeSelector.setSelectedTreeNode,
    updateTreeNode: treeNodeUpdater.updateTreeNode,
    removeTreeNodeFromState: treeNodeRemover.removeTreeNodeFromState,
  },
  extraReducers(builder) {
    builder
      .addCase(createNode.fulfilled, (state, action) => {
        treesSlice.caseReducers.handleNewNodeCreation(state, action);
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        treesSlice.caseReducers.removeTreeNodeFromState(state, action);
      });
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
  buildChildNode,
  setSelectedTreeNode,
  updateTreeNode,
  removeTreeNodeFromState,
} = actions;

export default reducer;
