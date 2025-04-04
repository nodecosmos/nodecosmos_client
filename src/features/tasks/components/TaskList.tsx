import Task from './Task';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Droppable, DroppableProvided, DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { Button } from '@mui/material';
import React from 'react';

interface Props {
    listId?: string;
    title?: string;
    // may not be provided - and might be null
    tasks: any[];
}

export default function TaskList(props: Props) {
    const {
        listId = 'LIST',
        title: _,
        tasks,
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type="TASK"
            direction="vertical"
        >
            {(
                provided: DroppableProvided,
                dropSnapshot: DroppableStateSnapshot,
            ) => (
                <div
                    ref={provided.innerRef}
                    className={`p-2 display-flex flex-column user-select-none h-100
                                bg-transition-1 background-${dropSnapshot.isDraggingOver ? '6' : '0'}`}>
                    <div>
                        {
                            tasks.map((task, index) => (
                                <Task content={task.content} key={task.id} index={index} id={task.id} />
                            ))
                        }
                    </div>
                    {provided.placeholder}
                    <Button
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        className="text-center mt-1"
                        color="buttonContrast"
                        size="small">
                        Add Task
                    </Button>
                </div>
            )}
        </Droppable>
    );
}
