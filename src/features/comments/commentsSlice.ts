import {
    createComment, deleteComment, indexComments, updateCommentContent,
} from './comments.thunks';
import {
    CommentState, CommentThread, Comment,
} from './comments.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

export const MAX_COMMENT_WIDTH = 780;

const initialState: CommentState = {
    byId: {},
    idsByObjectId: {},
    idsByThreadId: {},
    threadsById: {},
    threadIdsByObjectId: {},
    threadByDescriptionLine: {},
};

function resetObjectState(state: RootState['comments'], objectId: UUID) {
    state.idsByObjectId[objectId] = [];

    const currentThreadCommentIds = state.threadIdsByObjectId[objectId];

    if (currentThreadCommentIds) {
        currentThreadCommentIds.forEach((commentId) => {
            state.idsByThreadId[commentId] = [];
        });
    }

    state.threadIdsByObjectId[objectId] = [];
    state.threadByDescriptionLine[objectId] = {};
}

function populateComment(state: RootState['comments'], comment: Comment) {
    if (!state.idsByObjectId[comment.objectId]) {
        state.idsByObjectId[comment.objectId] = [];
    }

    state.idsByObjectId[comment.objectId].push(comment.id);

    if (!state.idsByThreadId[comment.threadId]) {
        state.idsByThreadId[comment.threadId] = [];
    }

    state.idsByThreadId[comment.threadId].push(comment.id);

    state.byId[comment.id] = comment;
}

function populateThread(state: RootState['comments'], thread: CommentThread) {
    state.threadsById[thread.id] = thread;
    state.threadIdsByObjectId[thread.objectId] ||= [];
    state.threadIdsByObjectId[thread.objectId].push(thread.id);

    if (thread.lineContent) {
        if (!thread.threadNodeId) throw new Error('Thread node id is required for line content');
        state.threadByDescriptionLine[thread.objectId] ||= {};
        state.threadByDescriptionLine[thread.objectId][thread.threadNodeId] ||= new Map<string, [UUID, number]>();
        state.threadByDescriptionLine[thread.objectId][thread.threadNodeId]
            .set(thread.lineContent, [thread.id, thread.lineNumber as number]);
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
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
            .addCase(indexComments.fulfilled, (state, action) => {
                const { comments, threads } = action.payload;
                const objectId = action.meta.arg;

                resetObjectState(state, objectId);

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

                if (isThreadCreation && thread && thread.lineContent) {
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
            .addCase(deleteComment.fulfilled, (state, action) => {
                const {
                    objectId, threadId, id,
                } = action.meta.arg;

                delete state.byId[id];

                state.idsByObjectId[objectId] = state.idsByObjectId[objectId].filter((commentId) => commentId !== id);
                state.idsByThreadId[threadId] = state.idsByThreadId[threadId].filter((commentId) => commentId !== id);

                const thread = state.threadsById[threadId];

                if (state.idsByThreadId[threadId].length === 0 && thread.lineContent) {
                    delete state.threadsById[threadId];

                    if (thread.lineContent) {
                        if (!thread.threadNodeId) throw new Error('Thread node id is required for line content');

                        state.threadByDescriptionLine[thread.objectId]
                            ?.[thread.threadNodeId]
                            ?.delete(thread.lineContent);
                    }

                    const threadIdsByObjectId = state.threadIdsByObjectId[thread.objectId];
                    if (threadIdsByObjectId) {
                        state.threadIdsByObjectId[thread.objectId]
                            = threadIdsByObjectId.filter((threadId) => threadId !== thread.id);
                    }
                }
            });
    },
});

const { actions, reducer } = commentsSlice;

export const { SSECreateComment } = actions;

export default reducer;
