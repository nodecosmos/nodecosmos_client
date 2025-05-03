import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNodeTaskSections, selectTasksBySection } from '../tasks.selectors';
import { updateTaskSectionOrderIndex, updateTaskPosition } from '../tasks.thunks';
import { Task, TaskSection } from '../tasks.types';
import { DropResult } from '@hello-pangea/dnd';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TaskSectionContextVal {
    tasksBySection: Record<UUID, Task[]>;
    taskSections: TaskSection[];
    handleReorder: (res: DropResult) => void;
}

const TaskSectionContext = React.createContext<TaskSectionContextVal>({} as TaskSectionContextVal);

export function useTaskSectionContextCreator() {
    const { branchId, nodeId } = useBranchContext();
    const sections = useSelector(selectNodeTaskSections(nodeId));
    const tasksBySection = useSelector(selectTasksBySection);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const [localSections, setLocalSections] = React.useState(sections);
    const [localTasksBySection, setLocalTasksBySection] = React.useState(tasksBySection);

    useEffect(() => {
        setLocalSections(sections);
    }, [sections]);

    useEffect(() => {
        setLocalTasksBySection(tasksBySection);
    }, [tasksBySection]);

    const handleTaskSectionReorder = useCallback(async (res: DropResult) => {
        const sourceIdx = res.source.index;
        const destinationIdx = res?.destination?.index;

        if (destinationIdx === undefined) {
            return;
        }

        if (sourceIdx === destinationIdx) {
            return;
        }

        const currentSections = [...sections];
        const newSections = [...sections];
        const [removed] = newSections.splice(sourceIdx, 1);
        newSections.splice(destinationIdx, 0, removed);

        setLocalSections(newSections);

        const undoSections = () => {
            setLocalSections(currentSections);
        };

        try {
            const prevSection = newSections[destinationIdx - 1];
            const nextSection = newSections[destinationIdx + 1];

            const prevIdx = prevSection?.orderIndex || 0;
            const nextIdx = nextSection?.orderIndex || 0;
            let orderIndex;

            if (!prevSection) {
                orderIndex = nextIdx - 1.0;
            } else if (!nextSection) {
                orderIndex = prevIdx + 1.0;
            } else {
                orderIndex = (prevIdx + nextIdx) / 2.0;
            }

            const response = await dispatch((updateTaskSectionOrderIndex({
                branchId,
                nodeId,
                id: res.draggableId,
                orderIndex,
            })));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);

                undoSections();

                return;
            }
        } catch (error) {
            undoSections();
            const nodecosmosError = error as NodecosmosError;
            handleServerError(nodecosmosError);
            console.error(nodecosmosError);

            return;
        }
    }, [branchId, dispatch, handleServerError, nodeId, sections]);

    const handleTaskReorder = useCallback(async (res: DropResult) => {
        const {
            source, destination, draggableId,
        } = res;

        if (!destination) {
            return;
        }

        const sourceSectionId = source.droppableId;
        const destinationSectionId = destination.droppableId;

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        if (sourceSectionId === destinationSectionId && sourceIndex === destinationIndex) {
            return;
        }

        const updatedTasks = { ...tasksBySection };

        // Remove task from source section
        const sourceTasks = [...updatedTasks[sourceSectionId]];
        const [movedTask] = sourceTasks.splice(sourceIndex, 1);
        updatedTasks[sourceSectionId] = sourceTasks;

        // Add task to destination section
        const destinationTasks = (
            updatedTasks[destinationSectionId] && [...updatedTasks[destinationSectionId]]
        ) || [];
        destinationTasks.splice(destinationIndex, 0, movedTask);
        updatedTasks[destinationSectionId] = destinationTasks;
        // Update local tasks
        setLocalTasksBySection(updatedTasks);

        const currentTasks = { ...tasksBySection };
        const undoTasks = () => {
            setLocalTasksBySection(currentTasks);
        };

        try {
            const destTasks = updatedTasks[destinationSectionId] || [];
            const prevTask = destTasks[destinationIndex - 1];
            const nextTask = destTasks[destinationIndex + 1];
            const prevIdx = prevTask?.orderIndex || 0;
            const nextIdx = nextTask?.orderIndex || 0;

            let orderIndex;

            if (!prevTask) {
                orderIndex = nextIdx - 1.0;
            } else if (!nextTask) {
                orderIndex = prevIdx + 1.0;
            } else {
                orderIndex = (prevIdx + nextIdx) / 2.0;
            }

            const response = await dispatch(updateTaskPosition({
                task: {
                    branchId,
                    nodeId,
                    id: draggableId,
                    orderIndex,
                    sectionId: destinationSectionId,
                },
                currentSectionId: sourceSectionId,
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);

                undoTasks();
            }
        } catch (error) {
            undoTasks();
            const nodecosmosError = error as NodecosmosError;
            handleServerError(nodecosmosError);
            console.error(nodecosmosError);
        }
    }, [branchId, dispatch, handleServerError, nodeId, tasksBySection]);

    const handleReorder = useCallback(async (res: DropResult) => {
        if (res.destination?.droppableId === 'board') {
            await handleTaskSectionReorder(res);
        } else {
            await handleTaskReorder(res);
        }
    }, [handleTaskSectionReorder, handleTaskReorder]);

    return useMemo(() => (
        {
            TaskSectionContext,
            ctxValue: {
                taskSections: localSections,
                tasksBySection: localTasksBySection,
                handleReorder,
            },
        }
    ), [localSections, localTasksBySection, handleReorder]);
}

export default function useTaskSectionContext() {
    const context = React.useContext(TaskSectionContext);

    if (!context) {
        throw new Error('useTaskSectionContext must be used within a TaskSectionProvider');
    }

    return context;
}
