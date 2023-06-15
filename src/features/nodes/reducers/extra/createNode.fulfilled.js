/**
 *
 * @param state
 * @param action
 * @description
 *  Currently, we add new node to state,
 *  but we keep the tmpNodeId for tree structure, so we allow smooth flow when working with tree.
 *  However, that makes it bit hard to manage request to backend, as we need to use persistentId for request,
 *  but tmpNodeId for tree structure.
 */
export default function createNodeFulfilledReducer(state, action) {
  const { id, rootId, parentId } = action.payload;

  const { tmpNodeId } = action.meta.arg;

  const newNode = action.payload;
  newNode.nestedLevel = newNode.ancestorIds.length;

  state.byId[id] = action.payload; // add new node to state

  state.byId[tmpNodeId].isTemp = false; // tmpNodeId will still be used for tree structure

  state.byId[tmpNodeId].persistentRootId = rootId;
  state.byId[tmpNodeId].persistentParentId = parentId;
  state.byId[tmpNodeId].persistentId = id;

  state.persistedIdByNodeId[tmpNodeId] = id;
  state.persistedIdByNodeId[id] = id;

  state.nodeTitlesById[id] = action.payload.title;
}
