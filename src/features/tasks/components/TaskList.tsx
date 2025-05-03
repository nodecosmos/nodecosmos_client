import Task from './Task';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useTaskSectionContext from '../hooks/useTaskSectionContext';
import { createTask } from '../tasks.thunks';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Droppable, DroppableProvided, DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    sectionId: string;
}

export default function TaskList(props: Props) {
    const { sectionId } = props;
    const { tasksBySection } = useTaskSectionContext();
    const tasks = useMemo(() => tasksBySection[sectionId] || [], [tasksBySection, sectionId]);
    const { branchId, nodeId } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const handleTaskCreation = useCallback(async () => {
        const response = await dispatch(createTask(
            {
                title: '',
                branchId,
                nodeId,
                sectionId,
                orderIndex: tasks ? tasks.length : 0,
            },
        ));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }
    }, [branchId, dispatch, handleServerError, nodeId, sectionId, tasks]);

    return (
        <Droppable
            droppableId={sectionId}
            type="TASK"
            direction="vertical"
        >
            {(
                provided: DroppableProvided,
                dropSnapshot: DroppableStateSnapshot,
            ) => (
                <div
                    className={`display-flex flex-column user-select-none h-100
                                bg-transition-1 background-${dropSnapshot.isDraggingOver ? '6' : 'none'}`}>
                    <div ref={provided.innerRef}>
                        {
                            tasks.map((task, index) => (
                                <Task key={task.id} index={index} id={task.id} />
                            ))
                        }
                    </div>
                    {provided.placeholder}
                    <Button
                        onClick={handleTaskCreation}
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        className="text-center m-1"
                        color="buttonContrast"
                        size="small">
                        Add Task
                    </Button>
                </div>
            )}
        </Droppable>
    );
}
