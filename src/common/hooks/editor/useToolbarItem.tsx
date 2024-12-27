import { useEditorContext } from './useEditorContext';
import schema from '../../components/editor/schema';
import { setBlockType } from 'prosemirror-commands';
import { Attrs } from 'prosemirror-model';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';
import {
    useCallback, useEffect, useMemo, useState,
} from 'react';

type NodeName = keyof typeof schema.nodes;

// TODO: update all toolbar items to use this or similar hook. Note the differences when we have
//  block nodes (wrapIn and lift), list nodes (wrapInList), and inline nodes (custom logic).
export default function useToolbarItem(nodeName: NodeName, attrs?: Attrs | null): [boolean, () => void] {
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

    const isNodeActive = useMemo((): boolean => {
        const { from, to } = state?.selection || {
            from: 0,
            to: 0,
        };

        if (!state) return false;

        const { [nodeName]: nodeType } = state.schema.nodes;
        const { $from } = state.selection;

        let isActive = false;

        switch (nodeType) {
        case schema.nodes.heading:
            isActive = $from.parent.type === nodeType && $from.parent.attrs.level === attrs?.level;
            break;
        default:
            state.doc.nodesBetween(from, to, (node) => {
                if (node.type === nodeType) {
                    isActive = true;
                    return false; // stop iteration once found
                }
            });
            break;
        }

        return isActive;
    }, [attrs?.level, nodeName, state]);

    const toggleNode = useCallback(() => {
        const dispatch = editorView?.dispatch;
        const { from, to } = state?.selection || {
            from: 0,
            to: 0,
        };

        if (!state) return;

        const { [nodeName]: nodeType } = state.schema.nodes;
        const isActive = isNodeActive;

        const tr = state.tr;

        switch (nodeType) {
        case schema.nodes.bulletList:
        case schema.nodes.orderedList:
            if (isActive) {
                liftListItem(state.schema.nodes.listItem)(state, dispatch);
            } else {
                wrapInList(nodeType)(state, dispatch);
            }
            break;
        case schema.nodes.codeBlock:
            if (isActive) {
                return setBlockType(state.schema.nodes.paragraph)(state, dispatch);
            } else {
                return setBlockType(nodeType)(state, dispatch);
            }
        case schema.nodes.heading:
            if (isActive) {
                return setBlockType(state.schema.nodes.paragraph)(state, dispatch);
            } else {
                return setBlockType(nodeType, attrs)(state, dispatch);
            }

        default:
            // Unwrap the node by replacing it with its content
            if (isActive) {
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
            break;
        }

        if (dispatch) dispatch(tr);
    }, [attrs, editorView?.dispatch, isNodeActive, nodeName, state]);

    return [isNodeActive, toggleNode];
}
