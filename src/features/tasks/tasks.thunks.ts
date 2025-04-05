import { Task, TaskSection } from './tasks.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { Description } from '../descriptions/descriptions.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTaskSection = createAsyncThunk<
    TaskSection,
    Pick<TaskSection, 'branchId' | 'nodeId' | 'orderIndex' | 'title'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/createTaskSection',
    async (payload) => {
        const response = await nodecosmos.post('/tasks/sections', payload);

        return response.data;
    },
);

export const updateTaskSectionTitle = createAsyncThunk<
    Pick<TaskSection, 'branchId' | 'nodeId' | 'id' | 'title'>,
    Pick<TaskSection, 'branchId' | 'nodeId' | 'id' | 'title'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/updateTaskSectionTitle',
    async (payload) => {
        const response = await nodecosmos.put('/tasks/section_title', payload);

        return response.data;
    },
);

export const updateTaskSectionOrderIndex = createAsyncThunk<
    Pick<TaskSection, 'branchId' | 'nodeId' | 'id' | 'orderIndex' | 'updatedAt'>,
    Pick<TaskSection, 'branchId' | 'nodeId' | 'id' | 'orderIndex'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/updateTaskSectionOrderIndex',
    async (payload) => {
        const response = await nodecosmos.put('/tasks/section_order_index', payload);

        return response.data;
    },
);

export const indexNodeTasks = createAsyncThunk <
    {
        sections: TaskSection[];
        tasks: Task[];
    },
    Pick<TaskSection, 'branchId' | 'nodeId'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/indexNodeTasks',
    async (payload) => {
        const response = await nodecosmos.get(`/tasks/${payload.branchId}/${payload.nodeId}`);

        return response.data;
    },
);

export const createTask = createAsyncThunk<
    Task,
    Pick<Task, 'branchId' | 'nodeId' | 'sectionId' | 'orderIndex' | 'assigneeIds'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/createTask',
    async (payload) => {
        const response = await nodecosmos.post('/tasks/task', payload);

        return response.data;
    },
);

export const getTask = createAsyncThunk<
    {
        task: Task;
        description: Description;
    },
    Pick<Task, 'branchId' | 'nodeId' | 'id'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/getTask',
    async (payload) => {
        const response = await nodecosmos.get(`/tasks/${payload.branchId}/${payload.nodeId}/${payload.id}`);

        return response.data;
    },
);

export const updateTaskTitle = createAsyncThunk<
    Pick<Task, 'branchId' | 'nodeId' | 'id' | 'title'>,
    Pick<Task, 'branchId' | 'nodeId' | 'id' | 'title'>,
    { rejectValue: NodecosmosError }
>(
    'tasks/updateTaskTitle',
    async (payload) => {
        const response = await nodecosmos.put('/tasks/task_title', payload);

        return response.data;
    },
);

export const updateAssignees = createAsyncThunk<
    Pick<Task, 'branchId' | 'nodeId' | 'id' | 'sectionId' | 'assignees' | 'assigneeIds'>,
    Pick<Task, 'branchId' | 'nodeId' | 'id' | 'assigneeIds'>,
    { rejectValue: NodecosmosError }
> (
    'tasks/updateAssignees',

    async (payload) => {
        const response = await nodecosmos.put('/tasks/assignees', payload);

        return response.data;
    },
);

export const updateTaskPosition = createAsyncThunk<
    Task,
    {
        task: Pick<Task, 'branchId' | 'nodeId' | 'id' | 'sectionId' | 'orderIndex'>,
        currentSectionId: UUID,
    },
    { rejectValue: NodecosmosError }
>(
    'tasks/updateTaskSectionId',
    async (payload) => {
        const response = await nodecosmos.put('/tasks/task_position', payload.task);

        return response.data;
    },
);
