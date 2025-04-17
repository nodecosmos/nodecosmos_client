import TaskSection from './TaskSection';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNodeTaskSections } from '../tasks.selectors';
import { TaskSection as TaskSectionType } from '../tasks.types';
import {
    DragDropContext,
    Droppable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function Board() {
    const { nodeId } = useBranchContext();
    const sections = useSelector(selectNodeTaskSections(nodeId));

    const onDragStart = useCallback(() => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    }, []);

    const onDragEnd = useCallback((_result: DropResult) => {
        console.log(sections);
    }, [sections]);

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable
                droppableId="board"
                type="SECTION"
                direction="horizontal"
            >
                {(provided: DroppableProvided) => (
                    <div
                        className="display-flex h-without-header overflow-auto p-1"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {sections && sections.map((section: TaskSectionType, index: number) => (
                            <TaskSection
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
