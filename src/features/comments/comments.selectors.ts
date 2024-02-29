import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectComments = (state: RootState) => state.comments.byObjectId;
export const selectCommentIdsByThreadId = (state: RootState) => state.comments.idsByThreadId;

export const selectComment = (objectId: UUID) => createSelector(
    selectComments,
    (comments) => comments[objectId],
);

export const selectCommentsByThreadId = (threadId: UUID) => createSelector(
    selectCommentIdsByThreadId,
    selectComments,
    (idsByThreadId, comments) => idsByThreadId[threadId]?.map((id) => comments[id]),
);
