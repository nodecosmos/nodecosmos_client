import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faCode } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isCodeActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const {
        from, $from, to, empty,
    } = editorView.state.selection;
    const { code } = editorView.state.schema.marks;

    if (!code) return false;

    if (empty) {
        return !!code.isInSet(editorView.state.storedMarks || $from.marks());
    } else {
        return editorView.state.doc.rangeHasMark(from, to, code);
    }
}

export default function Code() {
    const { editorView } = useEditorContext();

    const isActive = isCodeActive(editorView);

    const toggleCode = useCallback(() => {
        if (!editorView) return;

        const toggleCodeMark = toggleMark(editorView.state.schema.marks.code);
        toggleCodeMark(editorView.state, editorView.dispatch, editorView);
    }, [editorView]);

    return (
        <Tooltip title="Code">
            <ToggleButton
                value="check"
                onClick={toggleCode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faCode} />
            </ToggleButton>
        </Tooltip>
    );
}
