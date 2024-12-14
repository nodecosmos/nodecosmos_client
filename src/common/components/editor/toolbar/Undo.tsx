import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { undo, undoDepth } from 'prosemirror-history';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function canUndo(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    return undoDepth(editorView.state) > 0;
}

export default function Undo() {
    const { editorView } = useEditorContext();

    const disabled = !canUndo(editorView);

    const onUndo = useCallback(() => {
        if (!editorView) return;

        if (undo(editorView.state, editorView.dispatch)) {
            editorView.focus();
        }
    }, [editorView]);

    return (
        <Tooltip title="Undo">
            <span>
                <ToggleButton
                    value="check"
                    onClick={onUndo}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faUndo} />
                </ToggleButton>
            </span>
        </Tooltip>
    );
}
