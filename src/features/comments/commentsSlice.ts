import {
    createComment, deleteComment, deleteThread, showThread, indexThreads, updateCommentContent,
} from './comments.thunks';
import {
    CommentState, CommentThread, Comment,
} from './comments.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { showContributionRequest } from '../contribution-requests/contributionRequests.thunks';
import { createSlice } from '@reduxjs/toolkit';

export const MAX_COMMENT_WIDTH = 780;

const initialState: CommentState = {
    byId: {},
    idsByThreadId: {},
    threadsById: {},
    threadIdsByBranchId: {},
    objectDescriptionThreadsByLine: {},
    mainObjectThread: {},
    threadIdsByBranchIdAndObjectId: {},
    currentThread: undefined,
};
// FIXME: fix state reset for comments and threads
function resetBranchState(state: RootState['comments'], branchId: UUID) {
    const threadIds = state.threadIdsByBranchId[branchId];

    if (threadIds) {
        threadIds.forEach((threadId) => {
            state.idsByThreadId[threadId] = [];
        });
    }

    state.threadIdsByBranchId[branchId] = [];
    state.objectDescriptionThreadsByLine[branchId] = {};
    state.threadIdsByBranchIdAndObjectId[branchId] = {};
}

function resetThreadCommentsState(state: RootState['comments'], threadId: UUID) {
    state.idsByThreadId[threadId] = [];
}

function populateComment(state: RootState['comments'], comment: Comment) {
    if (!state.idsByThreadId[comment.threadId]) {
        state.idsByThreadId[comment.threadId] = [];
    }

    state.idsByThreadId[comment.threadId].push(comment.id);
    
    state.byId[comment.id] = comment;
}

function populateThread(state: RootState['comments'], thread: CommentThread) {
    state.threadsById[thread.id] = thread;
    state.threadIdsByBranchId[thread.branchId] ||= [];
    state.threadIdsByBranchId[thread.branchId].push(thread.id);

    if (thread.lineContent) {
        state.objectDescriptionThreadsByLine[thread.branchId] ||= {};
        state.objectDescriptionThreadsByLine[thread.branchId][thread.objectId]
            ||= new Map<string, [UUID, number]>();
        state.objectDescriptionThreadsByLine[thread.branchId][thread.objectId]
            .set(thread.lineContent, [thread.id, thread.lineNumber as number]);
    } else {
        state.mainObjectThread[thread.branchId] ||= {};
        state.mainObjectThread[thread.branchId][thread.objectId] = thread.id;
        state.threadIdsByBranchIdAndObjectId[thread.branchId] ||= {};
        state.threadIdsByBranchIdAndObjectId[thread.branchId][thread.objectId] ||= [];
        state.threadIdsByBranchIdAndObjectId[thread.branchId][thread.objectId].push(thread.id);
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCurrentThread: (state, action) => {
            state.currentThread = action.payload;
        },
        SSECreateComment: (state, action) => {
            const comment = action.payload;

            if (state.byId[comment.id]) {
                state.byId[comment.id] = {
                    ...state.byId[comment.id],
                    ...comment,
                };
            } else {
                populateComment(state, comment);
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexThreads.fulfilled, (state, action) => {
                const { branchId, objectId } = action.meta.arg;
                const threads = action.payload;

                state.threadIdsByBranchIdAndObjectId[branchId] ||= {};
                state.threadIdsByBranchIdAndObjectId[branchId][objectId] = [];

                threads.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).forEach((thread) => {
                    populateThread(state, thread);
                });
            })
            .addCase(showThread.fulfilled, (state, action) => {
                const { comments, thread } = action.payload;

                resetThreadCommentsState(state, thread.id);
                comments.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                    .forEach((comment) => {
                        populateComment(state, comment);
                    });
                state.threadsById[thread.id] = thread;
                state.currentThread = thread;
            })
            .addCase(showContributionRequest.fulfilled, (state, action) => {
                const { comments, threads } = action.payload;
                const { id } = action.meta.arg;

                resetBranchState(state, id);

                threads.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).forEach((thread) => {
                    populateThread(state, thread);
                });

                comments.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                    .forEach((comment) => {
                        populateComment(state, comment);
                    });
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const isThreadCreation = Boolean(action.meta.arg.newThread);
                const { comment, thread } = action.payload;

                if (state.byId[comment.id]) {
                    state.byId[comment.id] = {
                        ...state.byId[comment.id],
                        ...comment,
                    };
                } else {
                    populateComment(state, comment);
                }

                if (isThreadCreation && thread) {
                    populateThread(state, thread);
                }
            })
            .addCase(updateCommentContent.fulfilled, (state, action) => {
                const {
                    id, content, updatedAt,
                } = action.payload;

                state.byId[id].content = content;
                state.byId[id].updatedAt = updatedAt;
            })
            .addCase(deleteThread.fulfilled, (state, action) => {
                const { id } = action.meta.arg;

                const thread = state.threadsById[id];

                state.threadIdsByBranchId[thread.branchId]
                    = state.threadIdsByBranchId[thread.branchId].filter((threadId) => threadId !== id);

                if (state.threadIdsByBranchIdAndObjectId[thread.branchId]) {
                    state.threadIdsByBranchIdAndObjectId[thread.branchId][thread.objectId]
                        = state.threadIdsByBranchIdAndObjectId[thread.branchId][thread.objectId]
                            .filter((threadId) => threadId !== id);
                }
                delete state.threadsById[id];

                if (state.idsByThreadId[id]) {
                    state.idsByThreadId[id].forEach((commentId) => {
                        delete state.byId[commentId];
                    });
                }

                delete state.idsByThreadId[id];
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const { threadId, id } = action.meta.arg;

                delete state.byId[id];

                state.idsByThreadId[threadId] = state.idsByThreadId[threadId].filter((commentId) => commentId !== id);

                const thread = state.threadsById[threadId];

                if (state.idsByThreadId[threadId].length === 0) {
                    if (thread.lineContent) {
                        if (!thread.objectId) throw new Error('Thread node id is required for line content');

                        state.objectDescriptionThreadsByLine[thread.branchId]
                            ?.[thread.objectId]
                            ?.delete(thread.lineContent);
                    }

                    const threadIdsByBranchId = state.threadIdsByBranchId[thread.branchId];
                    if (threadIdsByBranchId) {
                        state.threadIdsByBranchId[thread.branchId]
                            = threadIdsByBranchId.filter((threadId) => threadId !== thread.id);
                    }

                    state.threadIdsByBranchIdAndObjectId;

                    delete state.threadIdsByBranchIdAndObjectId[thread.branchId]?.[thread.objectId];
                    delete state.threadsById[threadId];
                }
            });
    },
});

const { actions, reducer } = commentsSlice;

export const { setCurrentThread, SSECreateComment } = actions;

export default reducer;
