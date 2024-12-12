import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faBold } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isBoldActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const {
        from, $from, to, empty,
    } = editorView.state.selection;
    const { bold } = editorView.state.schema.marks;

    if (!bold) return false;

    if (empty) {
        return !!bold.isInSet(editorView.state.storedMarks || $from.marks());
    } else {
        return editorView.state.doc.rangeHasMark(from, to, bold);
    }
}

export default function Bold() {
    const { editorView } = useEditorContext();

    const isActive = isBoldActive(editorView);

    const toggleBold = useCallback(() => {
        if (!editorView) return;

        const toggleBoldMark = toggleMark(editorView.state.schema.marks.bold);
        toggleBoldMark(editorView.state, editorView.dispatch, editorView);
    }, [editorView]);

    return (
        <Tooltip title="Bold">
            <ToggleButton
                value="check"
                onClick={toggleBold}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faBold} />
            </ToggleButton>
        </Tooltip>
    );
}
