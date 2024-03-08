import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectCommentsState = (state: RootState) => state.comments;
export const selectComments = (state: RootState) => state.comments.byId;
export const selectCommentIdsByThreadId = (state: RootState) => state.comments.idsByThreadId;

export const selectThreadById = createSelector(
    selectCommentsState,
    (comments) => comments.threadsById,
);
export const selectThreadIdsByObjectId = (state: RootState) => state.comments.threadIdsByObjectId;
export const selectThreadByDescriptionLine = (state: RootState) => state.comments.threadByDescriptionLine;

export const selectComment = (id: UUID) => createSelector(
    selectComments,
    (commentsById) => commentsById[id],
);

export const selectThreadCommentIds = (threadId: UUID) => createSelector(
    selectCommentIdsByThreadId,
    (idsByThreadId) => idsByThreadId[threadId],
);

export const selectObjectThreadIds = (objectId: UUID) => createSelector(
    selectThreadIdsByObjectId,
    (threadIdsByObjectId) => threadIdsByObjectId[objectId],
);

export const selectThread = (threadId: UUID) => createSelector(
    selectThreadById,
    (threadsById) => threadsById[threadId],
);

export const selectNodeThreadsByLine = (objectId: UUID, nodeId: UUID) => createSelector(
    selectThreadByDescriptionLine,
    (threadByDescriptionLine) => threadByDescriptionLine[objectId]?.[nodeId],
);

export const mainCrThread = (objectId: UUID) => createSelector(
    selectThread(objectId),
    (thread) => thread,
);
