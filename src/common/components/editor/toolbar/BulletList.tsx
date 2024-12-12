import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { wrapInList, liftListItem } from 'prosemirror-schema-list';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isBulletListActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const { state } = editorView;
    const { bulletList } = state.schema.nodes;
    if (!bulletList) return false;

    const { from, to } = state.selection;
    let foundList = false;
    state.doc.nodesBetween(from, to, node => {
        if (node.type === bulletList) {
            foundList = true;
            return false; // stop iteration once found
        }
        return true;
    });

    return foundList;
}

function toggleBulletList(editorView: EditorView | null) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { bulletList, listItem } = state.schema.nodes;
    if (!bulletList || !listItem) return false;

    // If already active, lift the selection out of the list
    if (isBulletListActive(editorView)) {
        return liftListItem(listItem)(state, dispatch);
    }

    // Otherwise, wrap the selection in a bullet list
    return wrapInList(bulletList)(state, dispatch);
}

export default function BulletList() {
    const { editorView } = useEditorContext();

    const isActive = isBulletListActive(editorView);

    const onToggleBulletList = useCallback(() => {
        toggleBulletList(editorView);
        editorView?.focus();
    }, [editorView]);

    return (
        <Tooltip title="Insert bullet list">
            <ToggleButton
                value="check"
                onClick={onToggleBulletList}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faList} />
            </ToggleButton>
        </Tooltip>
    );
}
