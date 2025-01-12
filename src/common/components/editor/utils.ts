import schema from './schema';
import {
    Attrs, Fragment, Node, NodeType, ResolvedPos, Slice,
} from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

function defaultIsActive($from: ResolvedPos, nodeType: NodeType, attrs?: Record<string, any> | null): boolean {
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
}

function isCursorNearInlineNode(
    state: EditorState,
    nodeType: NodeType,
): boolean {
    const { $from } = state.selection;
    const { nodeBefore, nodeAfter } = $from;
    return (
        (!!nodeBefore && nodeBefore.type === nodeType)
        || (!!nodeAfter && nodeAfter.type === nodeType)
    );
}

export function isActive (
    state: EditorState,
    nodeType: NodeType,
    attrs?: Record<string, any> | null,
): boolean {
    const { selection } = state;
    const {
        $from,
        from,
        to,
        empty,
    } = selection;

    let allWrapped = false;

    switch (nodeType) {
    case schema.nodes.bold:
    case schema.nodes.italic:
    case schema.nodes.strike:
    case schema.nodes.code:
        if (empty) {
            if (defaultIsActive($from, nodeType, attrs)) return true;
            return isCursorNearInlineNode(state, nodeType);
        }

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
        return defaultIsActive($from, nodeType, attrs);
    }
}

function unwrapSelectedTextFromInlineNode(
    state: EditorState,
    nodeType: NodeType,
    from: number,
    to: number,
): Transaction {
    const { tr } = state;
    const changes: {
        pos: number;
        node: Node;
        nodeStart: number;
        nodeEnd: number;
        unwrapFrom: number;
        unwrapTo: number;
    }[] = [];

    // 1. Find all ranges of nodeType that overlap with our selection
    state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === nodeType) {
            const nodeStart = pos;
            const nodeEnd = pos + node.nodeSize;

            // Intersection with the selection
            const unwrapFrom = Math.max(nodeStart, from);
            const unwrapTo = Math.min(nodeEnd, to);

            if (unwrapTo > unwrapFrom) {
                changes.push({
                    pos,
                    node,
                    nodeStart,
                    nodeEnd,
                    unwrapFrom,
                    unwrapTo,
                });
            }
        }
    });

    // 2. Process in reverse order (highest positions first)
    changes.sort((a, b) => b.unwrapFrom - a.unwrapFrom);

    changes.forEach(({
        pos, node, nodeStart, unwrapFrom, unwrapTo,
    }) => {
        // The content inside the inline node is offset by +1 from the node’s start
        // because nodeStart points to the inline node itself (including open/close).
        const offsetFrom = unwrapFrom - (nodeStart + 1);
        const offsetTo = unwrapTo - (nodeStart + 1);

        // 3. Split node’s content into [left, middle, right]
        const left = node.content.cut(0, offsetFrom);
        const middle = node.content.cut(offsetFrom, offsetTo);
        const right = node.content.cut(offsetTo);

        // 4. Rebuild: [nodeType(left), middle (unwrapped), nodeType(right)]
        const newNodes = [];

        if (left.size) {
            newNodes.push(node.type.create(node.attrs, left));
        }

        if (middle.size) {
            // Middle is unwrapped => push *its children* as siblings
            newNodes.push(...middle.content);
        }

        if (right.size) {
            newNodes.push(node.type.create(node.attrs, right));
        }

        // 5. Replace the old inline node with our newly formed nodes
        tr.replaceRange(
            pos, // start
            pos + node.nodeSize, // end
            new Slice(Fragment.fromArray(newNodes), 0, 0),
        );
    });

    return tr;
}

export function toggleInlineNode(
    state: EditorState,
    nodeType: NodeType,
    dispatch?: (tr: Transaction) => void,
    attrs?: Attrs | null,
) {
    const {
        from,
        to,
        empty,
    } = state.selection;
    let { tr } = state;
    const isNodeActive = isActive(state, nodeType);

    // 1. If the node is currently active, we UNWRAP
    if (isNodeActive) {
        if (empty || from === to) {
            tr = tr.replaceWith(from, to, nodeType.schema.text('\u200b'));
        } else {
            tr = unwrapSelectedTextFromInlineNode(state, nodeType, from, to);
        }
    } else {
        if (empty || from === to) {
            const placeholderText = nodeType.schema.text('\u200b'); // Zero-width space
            tr = tr.insert(from, nodeType.create(attrs, placeholderText));
        } else {
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
                .forEach(({
                    from: wrapFrom,
                    to: wrapTo,
                }) => {
                    // Get the slice of content
                    const slice = tr.doc.slice(wrapFrom, wrapTo);
                    // Create the inline node with that slice as child
                    const newInlineNode = nodeType.create(attrs, slice.content);
                    // Replace text with new inline node
                    tr = tr.replaceRangeWith(wrapFrom, wrapTo, newInlineNode);
                });
        }
    }

    if (dispatch) {
        dispatch(tr.scrollIntoView());
    }
    return true;
}
