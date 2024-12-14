import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faItalic } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isItalicActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const {
        from, $from, to, empty,
    } = editorView.state.selection;
    const { italic } = editorView.state.schema.marks;
    if (!italic) return false;

    if (empty) {
        return !!italic.isInSet(editorView.state.storedMarks || $from.marks());
    } else {
        return editorView.state.doc.rangeHasMark(from, to, italic);
    }
}

export default function Italic() {
    const { editorView } = useEditorContext();

    const active = isItalicActive(editorView);

    const onToggleItalic = useCallback(() => {
        if (!editorView) return;

        const toggleItalicMark = toggleMark(editorView.state.schema.marks.italic);
        toggleItalicMark(editorView.state, editorView.dispatch, editorView);
    }, [editorView]);

    return (
        <Tooltip title="Italic">
            <ToggleButton
                value="check"
                onClick={onToggleItalic}
                selected={active}
            >
                <FontAwesomeIcon icon={faItalic} />
            </ToggleButton>
        </Tooltip>
    );
}
