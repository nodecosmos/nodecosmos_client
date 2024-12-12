import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faListOl } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { wrapInList, liftListItem } from 'prosemirror-schema-list';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isOrderedListActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const { state } = editorView;
    const { orderedList } = state.schema.nodes;
    if (!orderedList) return false;

    const { from, to } = state.selection;
    let foundList = false;
    state.doc.nodesBetween(from, to, node => {
        if (node.type === orderedList) {
            foundList = true;
            return false; // stop iteration once found
        }
        return true;
    });

    return foundList;
}

export default function OrderedList() {
    const { editorView } = useEditorContext();

    const isActive = isOrderedListActive(editorView);

    const onToggleOrderedList = useCallback(() => {
        if (!editorView) return;

        const { state, dispatch } = editorView;
        const { orderedList, listItem } = state.schema.nodes;
        if (!orderedList || !listItem) return false;

        // If already active, lift the selection out of the list
        if (isOrderedListActive(editorView)) {
            liftListItem(listItem)(state, dispatch);
        } else {
            wrapInList(orderedList)(state, dispatch);
        }

        editorView.focus();
    }, [editorView]);

    return (
        <Tooltip title="Insert numbered list">
            <ToggleButton
                value="check"
                onClick={onToggleOrderedList}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faListOl} />
            </ToggleButton>
        </Tooltip>
    );
}
