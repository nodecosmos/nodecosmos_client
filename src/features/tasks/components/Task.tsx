import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
    content: string;
    id: string;
    index: number;
}

export default function Task(props: Props) {
    const {
        id, index, content,
    } = props;
    return (
        <Draggable draggableId={id} index={index}>
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
                        Task {content}
                    </Box>
                </div>
            )}
        </Draggable>
    );
}
