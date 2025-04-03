import {
    createTask,
    createTaskSection, getTask, indexNodeTasks, updateAssignees, updateTaskPosition, updateTaskSectionOrderIndex,
} from './tasks.thunks';
import { TaskState } from './tasks.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TaskState = {
    sectionsByNode: {},
    tasksBySection: {},
    taskById: {},
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTaskSection.fulfilled, (state, action) => {
                const taskSection = action.payload;

                if (!state.sectionsByNode[taskSection.nodeId]) {
                    state.sectionsByNode[taskSection.nodeId] = [];
                }

                state.sectionsByNode[taskSection.nodeId].push(taskSection);
            })
            .addCase(updateTaskSectionOrderIndex.fulfilled, (state, action) => {
                const { id, orderIndex } = action.payload;

                if (!state.sectionsByNode[action.payload.nodeId]) {
                    return;
                }

                const taskSection = state.sectionsByNode[action.payload.nodeId].find((section) => section.id === id);

                if (taskSection) {
                    taskSection.orderIndex = orderIndex;
                }
            })
            .addCase(indexNodeTasks.fulfilled, (state, action) => {
                const { sections, tasks } = action.payload;
                const nodeId = action.meta.arg.nodeId;

                state.sectionsByNode[nodeId] = sections;

                tasks.sort((a, b) => a.orderIndex - b.orderIndex).forEach((task) => {
                    state.tasksBySection[task.sectionId] ||= [];
                    state.tasksBySection[task.sectionId].push(task);
                });
            })
            .addCase(createTask.fulfilled, (state, action) => {
                const task = action.payload;

                if (!state.tasksBySection[task.sectionId]) {
                    state.tasksBySection[task.sectionId] = [];
                }

                // add task to section in respect to order index
                state.tasksBySection[task.sectionId] = state.tasksBySection[task.sectionId]
                    .concat(task)
                    .sort((a, b) => a.orderIndex - b.orderIndex);
            })
            .addCase(getTask.fulfilled, (state, action) => {
                const { task } = action.payload;

                state.taskById[task.id] = task;
            })
            .addCase(updateAssignees.fulfilled, (state, action) => {
                // update assignees on both task by id and section
                const task = action.payload;

                state.taskById[task.id].assigneeIds = task.assigneeIds;
                state.taskById[task.id].assignees = task.assignees;

                state.tasksBySection[task.sectionId] = state.tasksBySection[task.sectionId].map((t) => {
                    if (t.id === task.id) {
                        return {
                            ...t,
                            assigneeIds: task.assigneeIds,
                            assignees: task.assignees,
                        };
                    } else {
                        return t;
                    }
                });
            })
            .addCase(updateTaskPosition.fulfilled, (state, action) => {
                const task = action.payload;
                const currentSectionId = action.meta.arg.currentSectionId;

                state.taskById[task.id].sectionId = task.sectionId;

                state.tasksBySection[currentSectionId] = state.tasksBySection[currentSectionId].filter(
                    (t) => t.id !== task.id,
                );
                const newSectionTasks = state.tasksBySection[task.sectionId] || [];
                newSectionTasks.push(task);

                state.tasksBySection[task.sectionId] = newSectionTasks.sort((a, b) => a.orderIndex - b.orderIndex);
            })
        ;
    },
});

export default tasksSlice.reducer;
