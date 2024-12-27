import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faRedo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { redo, redoDepth } from 'prosemirror-history';
import React, { useCallback, useMemo } from 'react';

export default function Redo() {
    const { editorView } = useEditorContext();

    const disabled = useMemo(() => {
        if (!editorView?.state) return true;

        return redoDepth(editorView.state) <= 0;
    }, [editorView?.state]);

    const onRedo = useCallback(() => {
        if (!editorView?.state) return;

        redo(editorView.state, editorView.dispatch);
    }, [editorView?.state, editorView?.dispatch]);

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
