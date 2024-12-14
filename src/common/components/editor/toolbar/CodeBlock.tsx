import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { faBracketsCurly } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { setBlockType } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

function isCodeBlockActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const { state } = editorView;
    const { $from } = state.selection;
    const { codeBlock } = state.schema.nodes;
    if (!codeBlock) return false;
    return $from.parent.type === codeBlock;
}

function toggleCodeBlock(editorView: EditorView | null) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { codeBlock, paragraph } = state.schema.nodes;
    if (!codeBlock || !paragraph) return false;

    const currentlyCodeBlock = isCodeBlockActive(editorView);

    // If already a code block, turn it into a paragraph.
    if (currentlyCodeBlock) {
        return setBlockType(paragraph)(state, dispatch);
    }

    // Otherwise, transform current block(s) into a code block.
    return setBlockType(codeBlock)(state, dispatch);
}

export function CodeBlock() {
    const { editorView } = useEditorContext();

    const isActive = isCodeBlockActive(editorView);

    const onToggleCodeBlock = useCallback(() => {
        toggleCodeBlock(editorView);
        editorView?.focus();
    }, [editorView]);

    return (
        <Tooltip title="Code block">
            <ToggleButton
                value="check"
                onClick={onToggleCodeBlock}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faBracketsCurly} />
            </ToggleButton>
        </Tooltip>
    );
}
