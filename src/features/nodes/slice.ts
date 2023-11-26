import {
    createNode,
    deleteNode,
    getNodeDescription,
    getNodeDescriptionBase64,
    indexNodes,
    showNode,
} from './thunks';
import {
    AppNode, NodePaneContents, NodeState,
} from './types';
import { UUID } from '../../types';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../likes/likes.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NodeState = {
    byBranchId: {},
    childIds: {},
    titles: {},
    selectedNodePrimaryKey: null,
    nodePaneContent: NodePaneContents.Markdown,
    indexNodesById: {},
    isNodeActionInProgress: false,
};

const slice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        buildTmpNode(state, action) {
            const {
                tmpNodeId, branchId, nodeId,
            } = action.payload;

            const node = state.byBranchId[branchId][nodeId];

            state.byBranchId[node.branchId][tmpNodeId] = {
                id: tmpNodeId,
                branchId: node.branchId,
                rootId: node.rootId,
                parentId: nodeId,
                order: state.childIds[branchId][nodeId].length + 1,
                isPublic: node.isPublic,
                isRoot: false,
                title: '',
                ancestorIds: [nodeId, ...node.ancestorIds],
                description: null,
                shortDescription: null,
                descriptionMarkdown: null,
                descriptionBase64: null,
                ownerId: node.ownerId,
                ownerType: node.ownerType,
                creatorId: node.creatorId,
                likesCount: 0,
                coverImageURL: null,
                coverImageKey: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                editorIds: [],
                owner: node.owner,
                persistentId: null,
                isTemp: true,
                isSelected: false,
                nestedLevel: node.nestedLevel + 1,
                descendantIds: [],
                childIds: [],
                treeRootNodeId: node.treeRootNodeId,
                likedByCurrentUser: null,
            };

            state.childIds[branchId][nodeId].push(tmpNodeId);
            state.childIds[branchId][tmpNodeId] = [];
        },

        updateNodeState(state, action) {
            const { branchId, id } = action.payload;
            const current = state.byBranchId[branchId][id];

            if (current) {
                state.byBranchId[branchId][id] = { ...current, ...action.payload };
                state.titles[branchId][id] = state.byBranchId[branchId][id].title;
            }
        },

        deleteNodeFromState(state, action) {
            const { branchId, id } = action.payload;

            const node = state.byBranchId[branchId][id];
            const parent = state.byBranchId[branchId][node.parentId];

            delete state.childIds[branchId][id];

            // filter from childIds[branchId]
            if (parent) {
                if (state.childIds[branchId][node.parentId]) {
                    state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId].filter(
                        (id) => id !== id,
                    );
                }
            }

            delete state.indexNodesById[id];

            delete state.byBranchId[branchId][id];
        },

        setSelectedNode(state, action) {
            const { branchId, id } = action.payload;
            const current = state.selectedNodePrimaryKey;

            if (current) {
                const currentSelectedNode = state.byBranchId[current.branchId][current.id];
                currentSelectedNode.isSelected = false;
            }

            state.selectedNodePrimaryKey = action.payload;

            if (state.selectedNodePrimaryKey) {
                const selectedNode = state.byBranchId[branchId][id];
                selectedNode.isSelected = true;
            }
        },

        setNodePaneContent(state, action) {
            state.nodePaneContent = action.payload;
        },

        searchNode(state, action) {
            const {
                rootId, branchId, value,
            } = action.payload;

            if (value) {
                // search by title
                const newChildIds: NodeState['childIds'] = {};

                for (const nodeId in state.byBranchId[branchId]) {
                    if (state.byBranchId[branchId][nodeId].title && state.byBranchId[branchId][nodeId].rootId === rootId
                        && state.byBranchId[branchId][nodeId].title.toLowerCase()
                            .includes(value.toLowerCase())) {
                        newChildIds[branchId][nodeId] ||= [];
                        let currentNodeId = nodeId;
                        let { parentId } = state.byBranchId[branchId][nodeId];

                        while (parentId) {
                            if (state.byBranchId[branchId][parentId]) {
                                newChildIds[branchId][parentId] ||= [];

                                if (!newChildIds[branchId][parentId].includes(currentNodeId)) {
                                    newChildIds[branchId][parentId].push(currentNodeId);
                                }

                                currentNodeId = parentId;
                                parentId = state.byBranchId[branchId][parentId].parentId;
                            } else {
                                break;
                            }
                        }
                    }
                }

                state.childIds = newChildIds;
            } else {
                // reset childIds[branchId]
                for (const nodeId in state.byBranchId[branchId]) {
                    if (state.byBranchId[branchId][nodeId] && state.byBranchId[branchId][nodeId].rootId === rootId) {
                        state.childIds[branchId][nodeId] = state.byBranchId[branchId][nodeId].childIds;
                    }
                }
            }
        },

        reorderNodes(state, action) {
            const {
                branchId,
                nodeId,
                newParentId,
                newSiblingIndexAfterMove,
            } = action.payload;
            const node = state.byBranchId[branchId][nodeId];
            const oldParentId = node.parentId;
            const oldIndex = state.childIds[branchId][oldParentId].indexOf(nodeId);

            if (oldParentId === newParentId && newSiblingIndexAfterMove === oldIndex) return;

            state.byBranchId[branchId][nodeId].parentId = newParentId;

            state.childIds[branchId][oldParentId].splice(oldIndex, 1);
            state.childIds[branchId][newParentId].splice(newSiblingIndexAfterMove, 0, nodeId);

            populateAncestors(state, branchId, node.rootId);
        },

        replaceTmpNodeWithPersistedNode(state, action) {
            const {
                branchId, tmpNodeId, persistentId,
            } = action.payload;
            const { parentId } = state.byBranchId[branchId][tmpNodeId];

            if (persistentId) {
                const tmpNodeSelected = state.byBranchId[branchId][tmpNodeId].isSelected;

                if (tmpNodeSelected) {
                    state.byBranchId[branchId][persistentId].isSelected = true;
                    state.selectedNodePrimaryKey = { id: persistentId, branchId };
                }

                const currentChildIds = state.childIds[branchId][parentId];

                const newChildIds = currentChildIds
                    .map((childId) => {
                        if (childId === tmpNodeId) {
                            return persistentId;
                        }
                        return childId;
                    });

                state.childIds[branchId][parentId] = newChildIds;
                state.byBranchId[branchId][parentId].childIds = newChildIds;

                state.childIds[branchId][persistentId] = [];
                state.byBranchId[branchId][persistentId].childIds = [];

                state.byBranchId[branchId][persistentId].treeRootNodeId
                    = state.byBranchId[branchId][tmpNodeId].treeRootNodeId;
            }

            state.childIds[branchId][parentId] = state.childIds[branchId][parentId].filter(
                (childId) => childId !== tmpNodeId,
            );
            state.byBranchId[branchId][parentId].childIds = state.childIds[branchId][parentId];

            delete state.byBranchId[branchId][tmpNodeId];
            delete state.childIds[branchId][tmpNodeId];
        },

        clearTmpNode(state, action) {
            const { branchId, id } = action.payload;
            const node = state.byBranchId[branchId][id];

            if (node && node.isTemp) {
                delete state.byBranchId[branchId][id];
                delete state.childIds[branchId][node.id];

                const parent = state.byBranchId[branchId][node.parentId];
                state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId]
                    .filter((childId) => childId !== id);
                state.byBranchId[branchId][parent.id].childIds = state.childIds[branchId][parent.id];
            }
        },

        setIsNodeActionInProgress: (state, action) => {
            state.isNodeActionInProgress = action.payload;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, (state, action) => {
                const nodes = action.payload;
                state.indexNodesById = {};

                nodes.forEach((node) => {
                    state.indexNodesById[node.id] = node;
                });
            })
            .addCase(showNode.fulfilled, (state, action) => {
                const { node, descendants } = action.payload;
                const { branchId, id } = node;

                const stateNode = state.byBranchId[branchId][id] || {};
                node.description = stateNode.description;
                node.descriptionMarkdown = stateNode.descriptionMarkdown;
                node.shortDescription = stateNode.shortDescription;

                const appNode: AppNode = {
                    ...node,
                    isTemp: false,
                    persistentId: id,
                    nestedLevel: node.isRoot ? 0 : node.ancestorIds.length,
                    isSelected: true,
                    treeRootNodeId: id,
                    descendantIds: [],
                    childIds: [],
                    likedByCurrentUser: null,
                };

                state.byBranchId[branchId][id] = appNode;
                state.selectedNodePrimaryKey = { branchId, id };

                // tree data
                node.ancestorIds ||= [];
                state.childIds[branchId][id] = [];

                const childIds: NodeState['childIds'] = {};

                descendants.forEach((descendant) => {
                    const stateNode = state.byBranchId[branchId][id] || {};

                    state.byBranchId[branchId][descendant.id] = {
                        ...descendant,
                        description: stateNode.description,
                        descriptionMarkdown: stateNode.descriptionMarkdown,
                        shortDescription: stateNode.shortDescription,
                        descriptionBase64: stateNode.descriptionBase64,
                        isTemp: false,
                        isPublic: appNode.isPublic,
                        isRoot: false,
                        persistentId: descendant.id,
                        nestedLevel: 0,
                        isSelected: false,
                        ancestorIds: [],
                        treeRootNodeId: id,
                        descendantIds: [],
                        childIds: [],
                        likesCount: 0,
                        ownerId: null,
                        ownerType: null,
                        editorIds: [],
                        createdAt: null,
                        updatedAt: null,
                        creatorId: null,
                        coverImageURL: null,
                        coverImageKey: null,
                        owner: appNode.owner,
                        likedByCurrentUser: null,
                    };

                    childIds[branchId][descendant.parentId] ||= [];
                    childIds[branchId][descendant.parentId].push(descendant.id);

                    childIds[branchId][descendant.id] ||= [];
                });

                state.childIds[branchId] = {
                    ...state.childIds[branchId],
                    ...childIds[branchId],
                };

                populateAncestors(state, branchId, id);
            })
            .addCase(createNode.fulfilled, (state, action) => {
                const {
                    branchId, id, rootId,
                } = action.payload;
                const { tmpNodeId } = action.meta.arg;

                if (tmpNodeId) {
                    const tmpNode = state.byBranchId[branchId][tmpNodeId];

                    const newNode = action.payload;
                    state.byBranchId[branchId][id] = {
                        ...newNode,
                        persistentId: id,
                        isTemp: false,
                        isSelected: true,
                        treeRootNodeId: id,
                        descendantIds: [],
                        childIds: [],
                        nestedLevel: tmpNode.nestedLevel || 0,
                        likedByCurrentUser: null,
                    };

                    state.titles[branchId][id] = action.payload.title;
                    state.childIds[branchId][id] = [];

                    if (tmpNode) {
                        state.byBranchId[branchId][tmpNodeId].rootId = rootId;
                        state.byBranchId[branchId][tmpNodeId].persistentId = id;
                    }
                }
            })
            .addCase(deleteNode.fulfilled, (state, action) => {
                const { branchId, id } = action.payload;

                const node = state.byBranchId[branchId][id];
                const parent = state.byBranchId[branchId][node.parentId];

                delete state.childIds[branchId][id];

                // filter from childIds[branchId]
                if (parent) {
                    if (state.childIds[branchId][node.parentId]) {
                        state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId].filter(
                            (childId) => childId !== id,
                        );
                    }
                }

                delete state.indexNodesById[id];

                delete state.byBranchId[branchId][id];
            })
            .addCase(getNodeDescription.fulfilled, (state, action) => {
                const {
                    branchId, id, description, descriptionMarkdown, coverImageURL,
                } = action.payload;
                state.byBranchId[branchId][id].description = description as string | null;
                state.byBranchId[branchId][id].descriptionMarkdown = descriptionMarkdown as string | null;
                state.byBranchId[branchId][id].coverImageURL = coverImageURL as string | null;
            })
            .addCase(getNodeDescriptionBase64.fulfilled, (state, action) => {
                const {
                    branchId, id, descriptionBase64,
                } = action.payload;

                if (descriptionBase64) {
                    state.byBranchId[branchId][id].descriptionBase64 = descriptionBase64;
                }
            })
            .addCase(getLikesCount.fulfilled, (state, action) => {
                const { id, likesCount } = action.payload;
                // currently only for main branch
                if (state.byBranchId[id] && state.byBranchId[id][id]) {
                    state.byBranchId[id][id].likesCount = likesCount;
                }
            })
            .addCase(likeObject.fulfilled, (state, action) => {
                const {
                    id, likesCount, likedByCurrentUser,
                } = action.payload;
                handleLike(state, id, likesCount, likedByCurrentUser);
            })
            .addCase(unlikeObject.fulfilled, (state, action) => {
                const {
                    id, likesCount, likedByCurrentUser,
                } = action.payload;
                handleLike(state, id, likesCount, likedByCurrentUser);
            });
    },
});

function handleLike(state: NodeState, id: UUID, likesCount: number, likedByCurrentUser: boolean) {
    if (state.byBranchId[id] && state.byBranchId[id][id]) {
        state.byBranchId[id][id].likesCount = likesCount as number;
        state.byBranchId[id][id].likedByCurrentUser = likedByCurrentUser;
    }

    if (state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount = likesCount;
    }
}

function populateAncestors(state: NodeState, branchId: UUID, rootId: UUID) {
    const queue = [rootId];

    while (queue.length > 0) {
        const currentId = queue.shift() as UUID;
        const currentNode = state.byBranchId[branchId][currentId];

        const childIds = state.childIds[branchId][currentId] || [];
        state.byBranchId[branchId][currentId].childIds = childIds;

        childIds.forEach((childId: UUID) => {
            state.byBranchId[branchId][childId].ancestorIds = [...currentNode.ancestorIds, currentId];
            state.byBranchId[branchId][childId].nestedLevel = currentNode.ancestorIds.length + 1;

            queue.push(childId);
        });
    }
}

export const { actions } = slice;

export const {
    buildTmpNode,
    updateNodeState,
    deleteNodeFromState,
    setSelectedNode,
    setNodePaneContent,
    searchNode,
    reorderNodes,
    replaceTmpNodeWithPersistedNode,
    clearTmpNode,
    setIsNodeActionInProgress,
} = actions;

export default slice.reducer;
