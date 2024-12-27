import { useEditorContext } from './useEditorContext';
import { EditorState } from 'prosemirror-state';
import {
    useCallback, useEffect, useState,
} from 'react';

export default function useEditorState(): EditorState | null {
    const { editorView } = useEditorContext();
    const [state, setState] = useState(editorView?.state);

    const reset = useCallback(() => {
        setState(editorView!.state);
    }, [editorView]);

    useEffect(() => {
        if (!editorView) return;

        editorView.dom.addEventListener('pm-state-change', reset);

        return () => {
            editorView?.dom?.removeEventListener('pm-state-change', reset);
        };
    }, [editorView, reset]);

    return state || null;
}
