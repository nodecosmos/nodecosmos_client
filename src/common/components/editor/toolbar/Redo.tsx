import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useEditorState from '../../../hooks/editor/useEditorState';
import { faRedo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { redo, redoDepth } from 'prosemirror-history';
import React, { useCallback, useMemo } from 'react';

export default function Redo() {
    const { editorView } = useEditorContext();
    const state = useEditorState();

    const disabled = useMemo(() => {
        if (!state) return true;

        return redoDepth(state) <= 0;
    }, [state]);

    const onRedo = useCallback(() => {
        if (!state || !editorView?.dispatch) return;

        redo(state, editorView.dispatch);

        editorView.focus();
    }, [state, editorView]);

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
