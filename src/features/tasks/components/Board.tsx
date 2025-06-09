import TaskSection from './TaskSection';
import { useTaskSectionContextCreator } from '../hooks/useTaskSectionContext';
import { TaskSection as TaskSectionType } from '../tasks.types';
import {
    DragDropContext,
    Droppable, DroppableProvided,
} from '@hello-pangea/dnd';
import React, { useCallback } from 'react';

export default function Board() {
    const onDragStart = useCallback(() => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    }, []);

    const { TaskSectionContext, ctxValue } = useTaskSectionContextCreator();
    const { handleReorder, taskSections } = ctxValue;

    return (
        <TaskSectionContext.Provider value={ctxValue}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={handleReorder}>
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
                            {taskSections && taskSections.map(
                                (section: TaskSectionType, index: number) => (
                                    <TaskSection
                                        key={section.id}
                                        id={section.id}
                                        title={section.title}
                                        index={index}
                                    />
                                ),
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </TaskSectionContext.Provider>
    );
}
