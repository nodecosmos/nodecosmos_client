export default function searchNode(state, action) {
    const { rootId, value } = action.payload;

    if (value) {
        searchNodesByTitle(state, rootId, value);
    } else {
        rebuildChildIdsByParentId(state, rootId);
    }
}

function searchNodesByTitle(state, rootId, value) {
    const newChildIdsByParentId = {};

    for (const nodeId in state.byId) {
        if (state.byId[nodeId].title && state.byId[nodeId].rootId === rootId
      && state.byId[nodeId].title.toLowerCase()
          .includes(value.toLowerCase())) {
            newChildIdsByParentId[nodeId] ||= [];
            let currentNodeId = nodeId;
            let { parentId } = state.byId[nodeId];

            while (parentId) {
                if (state.byId[parentId]) {
                    newChildIdsByParentId[parentId] ||= [];

                    if (!newChildIdsByParentId[parentId].includes(currentNodeId)) {
                        newChildIdsByParentId[parentId].push(currentNodeId);
                    }

                    currentNodeId = parentId;
                    parentId = state.byId[parentId].parentId;
                } else {
                    break;
                }
            }
        }
    }

    state.childIdsByParentId = newChildIdsByParentId;
}

function rebuildChildIdsByParentId(state, rootId) {
    for (const nodeId in state.byId) {
        if (state.byId[nodeId] && state.byId[nodeId].rootId === rootId) {
            state.childIdsByParentId[nodeId] = state.byId[nodeId].childIds;
        }
    }
}
