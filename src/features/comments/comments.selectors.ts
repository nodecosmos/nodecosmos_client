import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectComments = (state: RootState) => state.comments.byId;
export const selectCommentIdsByThreadId = (state: RootState) => state.comments.idsByThreadId;
export const selectThreadById = (state: RootState) => state.comments.threadsById;
export const selectThreadIdsByObjectId = (state: RootState) => state.comments.threadIdsByObjectId;
export const selectObjectDescriptionThreadsByLine = (state: RootState) => state.comments.objectDescriptionThreadsByLine;
export const selectMainObjectThread = (state: RootState) => state.comments.mainObjectThread;

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

export const selectObjectThreadsByLine = (objectId: UUID, threadObjectId: UUID) => createSelector(
    selectObjectDescriptionThreadsByLine,
    (objectDescriptionThreadsByLine) => objectDescriptionThreadsByLine[objectId]?.[threadObjectId],
);

export const selectMainObjectThreadByObjectId = (objectId: UUID, threadObjectId: UUID) => createSelector(
    selectMainObjectThread,
    (mainObjectThread) => mainObjectThread[objectId]?.[threadObjectId],
);
