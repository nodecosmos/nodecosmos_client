import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { undo, undoDepth } from 'prosemirror-history';
import React, { useCallback, useMemo } from 'react';

export default function Undo() {
    const { editorView } = useEditorContext();

    const disabled = useMemo(() => {
        if (!editorView?.state) return true;

        return undoDepth(editorView.state) <= 0;
    }, [editorView?.state]);

    const onUndo = useCallback(() => {
        if (!editorView?.state) return;

        undo(editorView.state, editorView.dispatch);
    }, [editorView?.state, editorView?.dispatch]);

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
