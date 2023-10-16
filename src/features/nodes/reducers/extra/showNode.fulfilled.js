export default function showNodeFulfilledReducer(state, action) {
  const { node, descendants } = action.payload;

  const stateNode = state.byId[node.id] || {};
  node.description = stateNode.description;
  node.descriptionMarkdown = stateNode.descriptionMarkdown;
  node.shortDescription = stateNode.shortDescription;

  node.isTemp = false;
  node.persistentId = node.id;
  node.nestedLevel = node.isRoot ? 0 : node.ancestorIds.length;

  state.byId[node.id] = node;
  state.selectedNodeId = node.id;

  // tree data
  node.treeRootNodeId = node.id;
  node.ancestorIds ||= [];
  state.childIdsByParentId[node.id] = [];

  const childIdsByParentId = {};

  descendants.forEach((descendant) => {
    // default values
    descendant.isTemp = false;
    descendant.persistentId = descendant.id;
    descendant.ancestorIds ||= [];
    // IMPORTANT. RootId refers to the root of whole tree, not the root of the current node's subtree
    descendant.rootId = node.rootId;
    descendant.treeRootNodeId = node.id;

    state.byId[descendant.id] = descendant;

    childIdsByParentId[descendant.parentId] ||= [];
    childIdsByParentId[descendant.parentId].push(descendant.id);

    childIdsByParentId[descendant.id] ||= [];
  });

  state.childIdsByParentId = {
    ...state.childIdsByParentId,
    ...childIdsByParentId,
  };

  // Use a queue to set ancestorIds iteratively
  const queue = [node.id];

  while (queue.length) {
    const currentId = queue.shift();
    const currentNode = state.byId[currentId];

    const childIds = state.childIdsByParentId[currentId] || [];
    state.byId[currentId].childIds = childIds;

    childIds.forEach((childId) => {
      state.byId[childId].ancestorIds = [...currentNode.ancestorIds, currentId];
      state.byId[childId].nestedLevel = currentNode.ancestorIds.length + 1;

      queue.push(childId);
    });
  }
}
