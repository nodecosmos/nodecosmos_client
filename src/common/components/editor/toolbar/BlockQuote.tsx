import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faSquareQuote } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { wrapIn, lift } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isBlockquoteActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const { state } = editorView;
    const { from, to } = state.selection;
    const { blockquote } = state.schema.nodes;
    if (!blockquote) return false;

    let isActive = false;
    state.doc.nodesBetween(from, to, node => {
        if (node.type === blockquote) {
            isActive = true;
            return false; // stop iteration early
        }
        return true;
    });
    return isActive;
}

function toggleBlockquote(editorView: EditorView | null) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { blockquote } = state.schema.nodes;
    if (!blockquote) return false;

    // If already inside a blockquote, lift it out.
    if (isBlockquoteActive(editorView)) {
        return lift(state, dispatch);
    }

    // Otherwise, wrap the selection in a blockquote.
    return wrapIn(blockquote)(state, dispatch);
}

export default function BlockQuote() {
    const { editorView } = useEditorContext();

    const isActive = isBlockquoteActive(editorView);

    const onToggleBlockquote = useCallback(() => {
        toggleBlockquote(editorView);
        editorView?.focus();
    }, [editorView]);

    return (
        <Tooltip title="Insert blockquote">
            <ToggleButton
                value="check"
                onClick={onToggleBlockquote}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faSquareQuote} />
            </ToggleButton>
        </Tooltip>
    );
}
