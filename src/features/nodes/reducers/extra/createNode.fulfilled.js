/**
 *
 * @param state
 * @param action
 * @description
 */
export default function createNodeFulfilledReducer(state, action) {
  const { id, rootId } = action.payload;

  const { tmpNodeId } = action.meta.arg;

  const newNode = action.payload;
  newNode.nestedLevel = newNode.ancestorIds.length;

  state.byId[id] = action.payload;
  state.byId[id].descendantIds = [];
  state.byId[id].rootId = rootId;
  state.byId[id].nestedLevel = state.byId[tmpNodeId].nestedLevel;
  state.byId[id].persistentId = id;

  state.byId[tmpNodeId].rootId = rootId;
  state.byId[tmpNodeId].persistentId = id;

  state.nodeTitlesById[id] = action.payload.title;
  state.childIdsByParentId[id] = [];
}
