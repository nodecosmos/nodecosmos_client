import { useEditorContext } from './useEditorContext';
import useEditorState from './useEditorState';
import schema from '../../components/editor/schema';
import { setBlockType } from 'prosemirror-commands';
import { Attrs, NodeType } from 'prosemirror-model';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { useCallback, useMemo } from 'react';

export const isActive = (
    state: EditorState,
    nodeType: NodeType,
    attrs?: Record<string, any> | null,
): boolean => {
    const { selection } = state;
    const { $from, $to } = selection;

    // If the selection spans multiple nodes, it's not entirely within a single nodeType
    if (!$from.sameParent($to)) return false;

    // Traverse up the node hierarchy from the selection start position
    for (let depth = $from.depth; depth > 0; depth -= 1) {
        const node = $from.node(depth);

        if (node.type === nodeType) {
            if (attrs) {
                // Check if all provided attributes match
                const hasAllAttrs = Object.entries(attrs).every(
                    ([key, value]) => node.attrs[key] === value,
                );
                if (hasAllAttrs) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    return false;
};

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

        const tr = state.tr;

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
            if (isActive) {
                // **Unwrap Formatting Nodes**
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (node.type === nodeType) {
                        tr.replaceWith(pos, pos + node.nodeSize, node.content);
                    }
                });
            } else {
                if (from === to) {
                    // **Insert Formatting Node with Placeholder**
                    const placeholderText = state.schema.text('\u200b'); // Zero-width space
                    tr.insert(from, nodeType.create(attrs, placeholderText));
                } else {
                    const positionsToWrap: { from: number; to: number }[] = [];
                    state.doc.nodesBetween(from, to, (node, pos) => {
                        if (node.isText) {
                            positionsToWrap.push({
                                from: pos,
                                to: pos + node.nodeSize,
                            });
                        }
                    });

                    // Wrap from the end to prevent shifting positions
                    positionsToWrap.sort((a, b) => b.from - a.from).forEach(({ from: wrapFrom, to: wrapTo }) => {
                        tr.replaceWith(wrapFrom, wrapTo,
                            nodeType.create(attrs, nodeType.schema.text(state.doc.textBetween(wrapFrom, wrapTo, ''))),
                        );
                    });
                }
            }
            break;
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

        editorView?.focus();
    }, [attrs, editorView, isNodeActive, nodeName, state]);

    return [isNodeActive, toggleNode];
}
