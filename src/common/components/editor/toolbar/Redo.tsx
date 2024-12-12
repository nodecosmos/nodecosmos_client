import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faRedo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { redo, redoDepth } from 'prosemirror-history';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function canRedo(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    return redoDepth(editorView.state) > 0;
}

export default function Redo() {
    const { editorView } = useEditorContext();

    const disabled = !canRedo(editorView);

    const onRedo = useCallback(() => {
        if (!editorView) return;

        if (redo(editorView.state, editorView.dispatch)) {
            editorView.focus();
        }
    }, [editorView]);

    return (
        <Tooltip title="Redo">
            <span>
                <ToggleButton
                    value="check"
                    onClick={onRedo}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faRedo} />
                </ToggleButton>
            </span>
        </Tooltip>
    );
}
