import { UUID } from '../../../types';
import { selectTaskById } from '../tasks.selectors';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: UUID
    index: number;
}

function TaskCard(props: Props) {
    const { index, id } = props;
    const task = useSelector(selectTaskById(id));

    return (
        <Draggable draggableId={task.id} index={index}>
            {(
                provided: DraggableProvided,
            ) => (
                <div
                    className="background-3 mt-1 p-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Box>
                        {task.title}
                    </Box>
                </div>
            )}
        </Draggable>
    );
}

export default React.memo(TaskCard);
