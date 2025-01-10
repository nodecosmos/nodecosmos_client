import { useEditorContext } from './useEditorContext';
import useEditorState from './useEditorState';
import schema from '../../components/editor/schema';
import { isActive, toggleInlineNode } from '../../components/editor/utils';
import { setBlockType } from 'prosemirror-commands';
import { Attrs } from 'prosemirror-model';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';
import { useCallback, useMemo } from 'react';

type NodeName = keyof typeof schema.nodes;

export default function useToolbarItem(nodeName: NodeName, attrs?: Attrs | null): [boolean, () => void] {
    const { editorView } = useEditorContext();
    const state = useEditorState();

    const isNodeActive = useMemo((): boolean => {
        if (!editorView || !state) return false;
        const { [nodeName]: nodeType } = editorView.state.schema.nodes;

        return isActive(state, nodeType, attrs);
    }, [attrs, editorView, nodeName, state]);

    const toggleNode = useCallback(() => {
        const dispatch = editorView?.dispatch;
        const { from, to } = state?.selection || {
            from: 0,
            to: 0,
        };

        if (!state) return;

        const { [nodeName]: nodeType } = state.schema.nodes;
        const isActive = isNodeActive;

        switch (nodeType) {
        case schema.nodes.bulletList:
        case schema.nodes.orderedList:
            if (isActive) {
                return liftListItem(state.schema.nodes.listItem)(state, dispatch);
            } else {
                return wrapInList(nodeType)(state, dispatch);
            }
        case schema.nodes.codeBlock:
        case schema.nodes.heading:
            if (isActive) {
                return setBlockType(state.schema.nodes.paragraph)(state, dispatch);
            } else {
                return setBlockType(nodeType, attrs)(state, dispatch);
            }
        case schema.nodes.bold:
        case schema.nodes.italic:
        case schema.nodes.strike:
        case schema.nodes.code:
            return toggleInlineNode(state, nodeType, dispatch, attrs);
        default:
        {
            const tr = state.tr;
            const isEmpty = from === to;

            const unwrap = () => state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.type === nodeType) {
                    tr.replaceWith(pos, pos + node.nodeSize, node.content);
                }
            });
            // Unwrap the node by replacing it with its content
            if (isActive) {
                unwrap();
            } else {
                if (isEmpty) {
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
        }
        }

        editorView?.focus();
    }, [attrs, editorView, isNodeActive, nodeName, state]);

    return [isNodeActive, toggleNode];
}
