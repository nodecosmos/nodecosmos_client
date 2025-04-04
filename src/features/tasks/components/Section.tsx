import TaskList from './TaskList';
import {
    Draggable, DraggableProvided, DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { Typography } from '@mui/material';
import React from 'react';

interface Props {
    title: string;
    tasks: [];
    index: number;
}

export default function Section(props: Props) {
    const {
        title, tasks, index,
    } = props;

    return (
        <Draggable draggableId={title} index={index}>
            {(provided: DraggableProvided, _snapshot: DraggableStateSnapshot) => (
                <div
                    ref={provided.innerRef}
                    className="w-320 p-1 h-100 display-flex flex-column"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Typography
                        className="max-w-200 text-ellipsis"
                        px={2}
                        py={1}
                        variant="body2"
                        color="texts.tertiary"
                        fontWeight={600}>
                        {title}
                    </Typography>

                    <div className="background-5 flex-1 overflow-auto">
                        <TaskList tasks={tasks} listId={title} />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
