import schema from './schema';
import { Attrs, NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

export const isActive = (
    state: EditorState,
    nodeType: NodeType,
    attrs?: Record<string, any> | null,
): boolean => {
    const { selection } = state;
    const {
        $from, from, to,
    } = selection;

    let allWrapped = false;

    switch (nodeType) {
    case schema.nodes.bold:
    case schema.nodes.italic:
    case schema.nodes.strike:
    case schema.nodes.code:
        // Check if all text nodes are wrapped
        state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isText) {
                allWrapped = true;

                const $pos = state.doc.resolve(pos);
                let isWrapped = false;

                // Traverse up the node hierarchy for each text node
                for (let depth = $pos.depth; depth > 0; depth -= 1) {
                    const parent = $pos.node(depth);
                    if (parent.type === nodeType) {
                        isWrapped = true;
                        break;
                    }
                }

                if (!isWrapped) {
                    allWrapped = false;
                    return false; // Exit early if any text node isn't wrapped
                }
            }
        });
        return allWrapped;
    default:
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
    }

    return false;
};

export const toggleInlineNode = (
    state: EditorState,
    nodeType: NodeType,
    dispatch?: (tr: Transaction) => void,
    attrs?: Attrs | null,
) => {
    const { from, to } = state.selection;
    const { tr } = state;
    const isNodeActive = isActive(state, nodeType);
    const isEmpty = from === to;

    // 1. If the node is currently active, we UNWRAP
    if (isNodeActive) {
        if (isEmpty) {
            state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.type === nodeType) {
                    tr.replaceWith(pos, pos + node.nodeSize, node.content);
                }
            });
        } else {
            // **Unwrap Formatting Nodes**
            const positionsToUnwrap: { from: number; to: number }[] = [];
            state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.type === nodeType) {
                    positionsToUnwrap.push({
                        from: pos,
                        to: pos + node.nodeSize,
                    });
                }
            });

            // Wrap from the end to prevent shifting positions
            positionsToUnwrap.sort((a, b) => b.from - a.from).forEach(({ from: wrapFrom, to: wrapTo }) => {
                tr.replaceWith(wrapFrom, wrapTo,
                    nodeType.schema.text(state.doc.textBetween(wrapFrom, wrapTo, '')),
                );
            });
        } }
    else {
        if (isEmpty) {
            // =============== INSERT INLINE NODE WITH PLACEHOLDER ===============
            const placeholderText = nodeType.schema.text('\u200b'); // Zero-width space
            tr.insert(from, nodeType.create(attrs, placeholderText));
        } else {
            // =============== WRAP PARTIALLY SELECTED RANGES ===============
            const positionsToWrap: { from: number; to: number }[] = [];

            state.doc.nodesBetween(from, to, (node, pos) => {
                // We only want to wrap text (or inline) nodes
                if (node.isText) {
                    const nodeStart = pos;
                    const nodeEnd = pos + node.nodeSize;

                    // Intersect with selection
                    const wrapFrom = Math.max(nodeStart, from);
                    const wrapTo = Math.min(nodeEnd, to);

                    if (wrapTo > wrapFrom) {
                        positionsToWrap.push({
                            from: wrapFrom,
                            to: wrapTo,
                        });
                    }
                }
            });

            // Process in reverse order
            positionsToWrap
                .sort((a, b) => b.from - a.from)
                .forEach(({ from: wrapFrom, to: wrapTo }) => {
                    // Get the slice of content
                    const slice = tr.doc.slice(wrapFrom, wrapTo);
                    // Create the inline node with that slice as child
                    const newInlineNode = nodeType.create(attrs, slice.content);
                    // Replace text with new inline node
                    tr.replaceRangeWith(wrapFrom, wrapTo, newInlineNode);
                });
        }
    }

    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
