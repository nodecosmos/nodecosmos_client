import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectTaskSectionsByNode = (state: RootState) => state.tasks.sectionsByNode;
export const selectTasksBySection = (state: RootState) => state.tasks.tasksBySection;
export const selectTasksById = (state: RootState) => state.tasks.taskById;

export const selectNodeTaskSections = (nodeId: UUID) => createSelector(
    selectTaskSectionsByNode,
    (sectionsByNode) => sectionsByNode[nodeId],
);

export const selectSectionTasks = (sectionId: UUID) => createSelector(
    selectTasksBySection,
    (tasksBySection) => tasksBySection[sectionId] || [],
);

export const selectTaskById = (taskId: UUID) => createSelector(
    selectTasksById,
    (tasksById) => tasksById[taskId],
);
