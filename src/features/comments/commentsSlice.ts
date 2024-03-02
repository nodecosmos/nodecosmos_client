import {
    createComment, deleteComment, indexComments, updateCommentContent,
} from './comments.thunks';
import {
    CommentState, CommentThread, Comment,
} from './comments.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CommentState = {
    byId: {},
    idsByObjectId: {},
    idsByThreadId: {},
    threadsById: {},
    threadIdsByObjectId: {},
    threadIdByLine: {},
};

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
        state.threadIdByLine[thread.objectId] ||= {};
        state.threadIdByLine[thread.objectId][thread.threadNodeId] ||= new Map<string, UUID>();
        state.threadIdByLine[thread.objectId][thread.threadNodeId].set(thread.lineContent, thread.id);
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(indexComments.fulfilled, (state, action) => {
                const { comments, threads } = action.payload;

                comments.forEach((comment) => {
                    populateComment(state, comment);
                });

                threads.forEach((thread) => {
                    populateThread(state, thread);
                });
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const { comment, thread } = action.payload;

                populateComment(state, comment);

                if (thread && thread.lineContent) {
                    populateThread(state, thread);
                }
            })
            .addCase(updateCommentContent.fulfilled, (state, action) => {
                const { id, content } = action.payload;

                state.byId[id].content = content;
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

                        state.threadIdByLine[thread.objectId]?.[thread.threadNodeId]?.delete(thread.lineContent);
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

const { reducer } = commentsSlice;

export default reducer;
