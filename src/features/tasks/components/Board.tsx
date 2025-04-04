
import { authorQuoteMap } from './data';
import Section from './Section';
import {
    DragDropContext,
    Droppable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import React, { useCallback, useState } from 'react';

const qmap = authorQuoteMap;

function reorder<TItem>(
    list: TItem[],
    startIndex: number,
    endIndex: number,
): TItem[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const columns = qmap;
const ordered = Object.keys(qmap);

export default function Board() {
    const [quotesOrd, setQuotes] = useState(ordered);
    const [sections, setSections] = useState(columns);

    const onDragStart = useCallback(() => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    }, []);

    const onDragEnd = useCallback((result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        if (result.type === 'SECTION') {
            const newQuotes = reorder(
                quotesOrd,
                result.source.index,
                result.destination.index,
            );
            setQuotes(newQuotes);
            return;
        } else {
            // change sections by title as key
            const sourceKey = result.source.droppableId;
            const destKey = result.destination.droppableId;
            const sourceIndex = result.source.index;
            const destIndex = result.destination.index;
            const sourceList = sections[sourceKey];
            const destList = sections[destKey];
            const sourceItem = sourceList[sourceIndex];
            const newSourceList = [...sourceList];
            const newDestList = [...destList];
            newSourceList.splice(sourceIndex, 1);
            newDestList.splice(destIndex, 0, sourceItem);

            const newSections = {
                ...sections,
                [sourceKey]: newSourceList,
                [destKey]: newDestList,
            };

            setSections(newSections);
        }
    }, [quotesOrd, sections]);

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable
                droppableId="board"
                type="SECTION"
                direction="horizontal"
            >
                {(provided: DroppableProvided) => (
                    <div
                        className="display-flex h-100 overflow-hidden p-1"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {quotesOrd.map((key: string, index: number) => (
                            <Section
                                key={key}
                                index={index}
                                title={key}
                                tasks={sections[key]}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
