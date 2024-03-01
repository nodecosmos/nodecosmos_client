import {
    createComment, deleteComment, indexComments, updateCommentContent,
} from './comments.thunks';
import { CommentState } from './comments.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CommentState = {
    byObjectId: {},
    idsByThreadId: {},
    threadIdsByLine: new Map(),
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(indexComments.fulfilled, (state, action) => {
                const { comments, threads } = action.payload;

                comments.forEach((comment) => {
                    if (!state.byObjectId[comment.objectId]) {
                        state.byObjectId[comment.objectId] = [];
                    }

                    state.byObjectId[comment.objectId].push(comment);
                    if (!state.idsByThreadId[comment.threadId]) {
                        state.idsByThreadId[comment.threadId] = [];
                    }

                    state.idsByThreadId[comment.threadId].push(comment.id);
                });

                threads.forEach((thread) => {
                    if (thread.lineContent) {
                        const threadIdsByLine = state.threadIdsByLine.get(thread.lineContent);
                        if (threadIdsByLine) {
                            threadIdsByLine.push(thread.id);
                        } else {
                            state.threadIdsByLine.set(thread.lineContent, [thread.id]);
                        }
                    }
                });
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const { comment, thread } = action.payload;

                if (!state.byObjectId[comment.objectId]) {
                    state.byObjectId[comment.objectId] = [];
                }

                state.byObjectId[comment.objectId].push(comment);
                if (!state.idsByThreadId[comment.threadId]) {
                    state.idsByThreadId[comment.threadId] = [];
                }

                state.idsByThreadId[comment.threadId].push(comment.id);

                if (thread && thread.lineContent) {
                    state.threadIdsByLine.set(thread.lineContent, [thread.id]);
                }
            })
            .addCase(updateCommentContent.fulfilled, (state, action) => {
                const { objectId, content } = action.payload;
                const comment = state.byObjectId[objectId].find((c) => c.content === content);
                if (comment) {
                    comment.content = content;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const { objectId, id } = action.meta.arg;
                state.byObjectId[objectId] = state.byObjectId[objectId].filter((c) => c.id !== id);
                state.idsByThreadId = Object.fromEntries(
                    Object.entries(state.idsByThreadId).map(([key, value]) => {
                        return [key, value.filter((id) => id !== id)];
                    }),
                );
            });
    },
});

const { reducer } = commentsSlice;

export default reducer;
