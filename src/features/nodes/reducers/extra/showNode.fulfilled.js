export default function showNodeFulfilledReducer(state, action) {
  const { node, descendants } = action.payload;

  const stateNode = state.byId[node.id] || {};
  node.description = stateNode.description;
  node.descriptionMarkdown = stateNode.descriptionMarkdown;
  node.shortDescription = stateNode.shortDescription;

  node.isTemp = false;
  node.persistentId = node.id;
  node.ancestorIds ||= [];
  node.nestedLevel = node.ancestorIds.length;
  state.byId[node.id] = node;
  state.selectedNodeId = node.id;

  state.childIdsByParentId[node.id] = [];

  const childIdsByParentId = {};

  descendants.forEach((descendant) => {
    // default values
    descendant.isTemp = false;
    descendant.persistentId = descendant.id;
    descendant.ancestorIds ||= [];
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

    const children = state.childIdsByParentId[currentId] || [];
    children.forEach((childId) => {
      const childNode = state.byId[childId];
      childNode.ancestorIds = [...currentNode.ancestorIds, currentId];
      childNode.nestedLevel = childNode.ancestorIds.length;
      queue.push(childId);
    });
  }
}
