/**
 *
 * @param state
 * @param action
 * @description
 */
export default function createNodeFulfilledReducer(state, action) {
  const { id, rootId } = action.payload;

  const { tmpNodeId } = action.meta.arg;
  const tmpNode = state.byId[tmpNodeId];

  const newNode = action.payload;
  newNode.nestedLevel = newNode.ancestorIds?.length;

  state.byId[id] = action.payload;
  state.byId[id].descendantIds = [];
  state.byId[id].rootId = rootId;
  state.byId[id].nestedLevel = tmpNode?.nestedLevel || 0;
  state.byId[id].persistentId = id;

  state.nodeTitlesById[id] = action.payload.title;
  state.childIdsByParentId[id] = [];

  if (tmpNode) {
    state.byId[tmpNodeId].rootId = rootId;
    state.byId[tmpNodeId].persistentId = id;
  }
}
