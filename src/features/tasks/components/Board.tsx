import TaskSection from './TaskSection';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNodeTaskSections } from '../tasks.selectors';
import { updateTaskSectionOrderIndex } from '../tasks.thunks';
import { TaskSection as TaskSectionType } from '../tasks.types';
import {
    DragDropContext,
    Droppable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Board() {
    const { branchId, nodeId } = useBranchContext();
    const sections = useSelector(selectNodeTaskSections(nodeId));
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();

    const onDragStart = useCallback(() => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    }, []);

    const onDragEnd = useCallback(async (res: DropResult) => {
        const sourceIdx = res.source.index;
        const destinationIdx = res?.destination?.index;

        if (destinationIdx === undefined) {
            return;
        }

        if (sourceIdx === destinationIdx) {
            return;
        }

        const prevSection = sections[destinationIdx - 1];
        const nextSection = sections[destinationIdx + 1];
        const currentIdx = sections[destinationIdx].orderIndex;

        const prevIdx = prevSection?.orderIndex || 0;
        const nextIdx = nextSection?.orderIndex || 0;
        let orderIndex;

        if (!prevSection) {
            orderIndex = currentIdx - 1.0;
        } else if (!nextSection) {
            orderIndex = currentIdx + 1.0;
        } else {
            const sumWith = sourceIdx > destinationIdx ? prevIdx : nextIdx;
            orderIndex = (currentIdx + sumWith) / 2.0;
        }

        try {
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

                return;
            }
        } catch (error) {
            const nodecosmosError = error as NodecosmosError;
            handleServerError(nodecosmosError);
            console.error(nodecosmosError);

            return;
        }
    }, [branchId, dispatch, handleServerError, nodeId, sections]);

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
