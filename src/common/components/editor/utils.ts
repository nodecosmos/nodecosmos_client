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
    const isNodeActive = isActive(state, nodeType);
    const tr = state.tr;
    const isEmpty = from === to;

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
        }
    } else {
        if (isEmpty) {
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

    if (dispatch) dispatch(tr);
    return true;
};
