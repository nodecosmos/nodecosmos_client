import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectComments = (state: RootState) => state.comments.byId;
export const selectCommentIdsByThreadId = (state: RootState) => state.comments.idsByThreadId;
export const selectThreadById = (state: RootState) => state.comments.threadsById;
export const selectThreadIdsByBranchId = (state: RootState) => state.comments.threadIdsByBranchId;
export const selectObjectDescriptionThreadsByLine = (state: RootState) => state.comments.objectDescriptionThreadsByLine;
export const selectMainObjectThread = (state: RootState) => state.comments.mainObjectThread;
export const selectThreadIdsByBranchIdAndObjectId = (state: RootState) => state.comments.threadIdsByBranchIdAndObjectId;

export const selectComment = (id: UUID) => createSelector(
    selectComments,
    (commentsById) => commentsById[id],
);

export const selectThreadCommentIds = (threadId: UUID) => createSelector(
    selectCommentIdsByThreadId,
    (idsByThreadId) => idsByThreadId[threadId],
);

export const selectThreadCommentsLength = (threadId: UUID) => createSelector(
    selectThreadCommentIds(threadId),
    (commentIds) => commentIds?.length,
);

export const selectBranchThreadIds = (branchId: UUID) => createSelector(
    selectThreadIdsByBranchId,
    (threadIdsByBranchId) => threadIdsByBranchId[branchId],
);

export const selectThread = (threadId: UUID) => createSelector(
    selectThreadById,
    (threadsById) => threadsById[threadId],
);

export const selectObjectThreadsByLine = (branchId: UUID, objectId: UUID) => createSelector(
    selectObjectDescriptionThreadsByLine,
    (objectDescriptionThreadsByLine) => objectDescriptionThreadsByLine[branchId]?.[objectId],
);

export const selectThreadIds = (branchId: UUID, objectId: UUID) => createSelector(
    selectThreadIdsByBranchIdAndObjectId,
    (threadIdsByBranchIdAndObjectId) => threadIdsByBranchIdAndObjectId[branchId]?.[objectId],
);

export const selectThreads = (branchId: UUID, objectId: UUID) => createSelector(
    selectThreadIds(branchId, objectId),
    selectThreadById,
    (threadIds, threadsById) => threadIds?.map((threadId) => threadsById[threadId]),
);

export const selectMainObjectThreadByObjectId = (branchId: UUID, objectId: UUID) => createSelector(
    selectMainObjectThread,
    (mainObjectThread) => mainObjectThread[branchId]?.[objectId],
);
