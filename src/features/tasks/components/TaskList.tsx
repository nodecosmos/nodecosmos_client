import Task from './Task';
import { selectSectionTasks } from '../tasks.selectors';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Droppable, DroppableProvided, DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    sectionId: string;
}

export default function TaskList(props: Props) {
    const { sectionId } = props;
    const tasks = useSelector(selectSectionTasks(sectionId));

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
                    ref={provided.innerRef}
                    className={`display-flex flex-column user-select-none h-100
                                bg-transition-1 background-${dropSnapshot.isDraggingOver ? '6' : 'none'}`}>
                    <div>
                        {
                            tasks.map((task, index) => (
                                <Task key={task.id} index={index} id={task.id} />
                            ))
                        }
                    </div>
                    {provided.placeholder}
                    <Button
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
