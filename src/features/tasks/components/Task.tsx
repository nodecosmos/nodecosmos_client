import { UUID } from '../../../types';
import { selectTaskById } from '../tasks.selectors';
import TaskCard from './TaskCard';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: UUID
    index: number;
}

function Task(props: Props) {
    const { index, id } = props;
    const task = useSelector(selectTaskById(id));

    if (!task) {
        return null;
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(
                provided: DraggableProvided,
            ) => (
                <div
                    className="background-3 mt-1 p-2 min-h-100"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TaskCard id={id} />
                </div>
            )}
        </Draggable>
    );
}

export default React.memo(Task);
