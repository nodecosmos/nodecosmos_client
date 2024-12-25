import { useEditorContext } from './useEditorContext';
import schema from '../../components/editor/schema';
import { Attrs } from 'prosemirror-model';
import { useCallback, useMemo } from 'react';

type NodeName = keyof typeof schema.nodes;

// TODO: update all toolbar items to use this or similar hook. Note the differences when we have
//  block nodes (wrapIn and lift), list nodes (wrapInList), and inline nodes (custom logic).
export default function useToolbarItem(nodeName: NodeName, attrs?: Attrs | null): [boolean, () => void] {
    const { editorView } = useEditorContext();
    const state = editorView?.state;
    const dispatch = editorView?.dispatch;
    const { from, to } = state?.selection || {
        from: 0,
        to: 0,
    };

    const isNodeActive = useMemo((): boolean => {
        if (!state) return false;
        const { [nodeName]: nodeType } = state.schema.nodes;

        let isActive = false;
        state.doc.nodesBetween(from, to, (node) => {
            if (node.type === nodeType) {
                isActive = true;
            }
        });

        return isActive;
    }, [from, nodeName, state, to]);

    const toggleNode = useCallback(() => {
        if (!state) return;

        const { [nodeName]: nodeType } = state.schema.nodes;
        const isActive = isNodeActive;

        const tr = state.tr;

        if (isActive) {
            // Unwrap the node by replacing it with its content
            state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.type === nodeType) {
                    tr.replaceWith(pos, pos + node.nodeSize, node.content);
                }
            });
        } else {
            if (from === to) {
                // Use zero-width space to avoid empty text node
                const placeholderText = state.schema.text('\u200b');
                const wrappedNode = nodeType.create(attrs, placeholderText);
                tr.insert(from, wrappedNode);
            } else {
                // Wrap existing selection
                const slice = state.doc.slice(from, to);
                const wrappedNode = nodeType.create(attrs, slice.content);
                tr.replaceWith(from, to, wrappedNode);
            }
        }

        if (dispatch) dispatch(tr);
    }, [attrs, dispatch, from, isNodeActive, nodeName, state, to]);

    return [isNodeActive, toggleNode];
}
