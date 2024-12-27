import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useEditorState from '../../../hooks/editor/useEditorState';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { undo, undoDepth } from 'prosemirror-history';
import React, { useCallback, useMemo } from 'react';

export default function Undo() {
    const { editorView } = useEditorContext();
    const state = useEditorState();

    const disabled = useMemo(() => {
        if (!state) return true;

        return undoDepth(state) <= 0;
    }, [state]);

    const onUndo = useCallback(() => {
        if (!state || !editorView) return;

        undo(state, editorView.dispatch);

        editorView.focus();
    }, [state, editorView]);

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
