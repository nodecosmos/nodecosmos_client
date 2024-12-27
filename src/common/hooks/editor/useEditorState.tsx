import { useEditorContext } from './useEditorContext';
import { EditorState } from 'prosemirror-state';
import { useEffect, useState } from 'react';

export default function useEditorState(): EditorState | null {
    const { editorView } = useEditorContext();
    const [state, setState] = useState(editorView?.state);

    useEffect(() => {
        if (!editorView) return;

        const reset = () => setState(editorView.state);
        editorView.dom.addEventListener('pm-state-change', reset);

        return () => {
            editorView?.dom?.removeEventListener('pm-state-change', reset);
        };
    }, [editorView]);

    return state || null;
}
