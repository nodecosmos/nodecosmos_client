import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faStrikethrough } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isStrikeActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const {
        from, $from, to, empty,
    } = editorView.state.selection;
    const { strike } = editorView.state.schema.marks;

    if (!strike) return false;

    if (empty) {
        return !!strike.isInSet(editorView.state.storedMarks || $from.marks());
    } else {
        return editorView.state.doc.rangeHasMark(from, to, strike);
    }
}

export default function Strikethrough() {
    const { editorView } = useEditorContext();

    const isActive = isStrikeActive(editorView);

    const toggleStrike = useCallback(() => {
        if (!editorView) return;

        const toggleStrikeMark = toggleMark(editorView.state.schema.marks.strike);
        toggleStrikeMark(editorView.state, editorView.dispatch, editorView);
    }, [editorView]);

    return (
        <Tooltip title="Strikethrough">
            <ToggleButton
                value="check"
                onClick={toggleStrike}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </ToggleButton>
        </Tooltip>
    );
}
