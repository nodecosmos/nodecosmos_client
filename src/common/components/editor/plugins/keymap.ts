import {
    wrapIn, setBlockType, chainCommands, exitCode,
    joinUp, joinDown, lift, selectParentNode,
} from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import {
    Attrs, NodeType, Schema,
} from 'prosemirror-model';
import {
    wrapInList, splitListItem, liftListItem, sinkListItem,
} from 'prosemirror-schema-list';
import {
    Command, EditorState, Transaction,
} from 'prosemirror-state';

let mac: boolean;

// @ts-ignore
if (navigator.userAgentData) {
    // If userAgentData is available (primarily in Chromium-based browsers)
    // @ts-ignore
    navigator.userAgentData
        .getHighEntropyValues(['platform'])
        .then((ua: { platform: string; }) => {
            if (ua.platform.toLowerCase() === 'macos') {
                mac = true;
            }
        });
} else {
    // Fallback method for browsers that don't support userAgentData
    mac = navigator.userAgent.includes('Macintosh');
}

/// Inspect the given schema looking for marks and nodes from the
/// basic schema, and if found, add key bindings related to them.
/// This will add:
///
/// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
/// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
/// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
/// * **Ctrl-Shift-0** for making the current textblock a paragraph
/// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
///   textblock a heading of the corresponding level
/// * **Ctrl-Shift-Backslash** to make the current textblock a code block
/// * **Ctrl-Shift-8** to wrap the selection in an ordered list
/// * **Ctrl-Shift-9** to wrap the selection in a bullet list
/// * **Ctrl->** to wrap the selection in a block quote
/// * **Enter** to split a non-empty textblock in a list item while at
///   the same time splitting the list item
/// * **Mod-Enter** to insert a hard break
/// * **Mod-_** to insert a horizontal rule
/// * **Backspace** to undo an input rule
/// * **Alt-ArrowUp** to `joinUp`
/// * **Alt-ArrowDown** to `joinDown`
/// * **Mod-BracketLeft** to `lift`
/// * **Escape** to `selectParentNode`
///
/// You can suppress or map these bindings by passing a `mapKeys`
/// argument, which maps key names (say `"Mod-B"` to either `false`, to
/// remove the binding, or a new key name string.
export function buildKeymap(schema: Schema, mapKeys?: {[key: string]: false | string}) {
    let keys: {[key: string]: Command} = {};

    function bind(key: string, cmd: Command) {
        if (mapKeys) {
            let mapped = mapKeys[key];
            if (mapped === false) return;
            // eslint-disable-next-line no-param-reassign
            if (mapped) key = mapped;
        }
        keys[key] = cmd;
    }

    bind('Mod-z', undo);
    bind('Shift-Mod-z', redo);
    bind('Backspace', undoInputRule);
    if (!mac) bind('Mod-y', redo);

    bind('Alt-ArrowUp', joinUp);
    bind('Alt-ArrowDown', joinDown);
    bind('Mod-BracketLeft', lift);
    bind('Escape', selectParentNode);

    bind('Mod-b', toggleInlineNode(schema.nodes.bold));
    bind('Mod-B', toggleInlineNode(schema.nodes.bold));
    bind('Mod-i', toggleInlineNode(schema.nodes.italic));
    bind('Mod-I', toggleInlineNode(schema.nodes.italic));
    bind('Mod-`', toggleInlineNode(schema.nodes.code));
    bind('Shift-Ctrl-8', wrapInList(schema.nodes.bulletList));
    bind('Shift-Ctrl-9', wrapInList(schema.nodes.orderedList));
    bind('Ctrl->', wrapIn(schema.nodes.blockquote));
    let br = schema.nodes.hardBreak, cmd = chainCommands(exitCode, (state, dispatch) => {
        if (dispatch) dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
        return true;
    });
    bind('Mod-Enter', cmd);
    bind('Shift-Enter', cmd);
    if (mac) bind('Ctrl-Enter', cmd);
    bind('Enter', splitListItem(schema.nodes.listItem));
    bind('Mod-[', liftListItem(schema.nodes.listItem));
    bind('Mod-]', sinkListItem(schema.nodes.listItem));
    bind('Shift-Ctrl-0', setBlockType(schema.nodes.paragraph));
    bind('Shift-Ctrl-\\', setBlockType(schema.nodes.codeBlock));
    for (let i = 1; i <= 6; i += 1) bind('Shift-Ctrl-' + i, setBlockType(schema.nodes.heading, { level: i }));
    let hr = schema.nodes.horizontalRule;
    bind('Mod-_', (state, dispatch) => {
        if (dispatch) dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
        return true;
    });
    bind('Tab', handleTabKey());
    bind('Shift-Tab', undoTabKey());

    return keys;
}

function isNodeActive(state: EditorState, nodeType: NodeType): boolean {
    const { from, to } = state.selection;

    let isActive = false;
    state.doc.nodesBetween(from, to, (node) => {
        if (node.type === nodeType) {
            isActive = true;
        }
    });

    return isActive;
}

function toggleInlineNode(nodeType: NodeType): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void, attrs?: Attrs | null): boolean => {
        const { from, to } = state.selection;
        const isActive = isNodeActive(state, nodeType);
        const tr = state.tr;

        if (isActive) {
            const { from, to } = state.selection;

            state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.type === nodeType) {
                    tr.replaceWith(pos, pos + node.nodeSize, node.content);
                }
            });

            if (dispatch) dispatch(tr);
            return true;
        }

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

        if (dispatch) dispatch(tr);
        return true;
    };
}

function handleTabKey(): Command {
    // handle tab key, if it's code block or paragraph indent it by 2 spaces
    // if it's list item, create nested list and move list item to nested list
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
        const { $from } = state.selection;
        const { parent } = $from;

        if (!parent) {
            return false;
        }

        const { type } = parent;
        const { schema } = state;

        if (type === schema.nodes.codeBlock || type === schema.nodes.paragraph) {
            const { tr } = state;
            const { from, to } = state.selection;
            const text = state.doc.textBetween(from, to, '\n');
            const newText = text.replace(/^/gm, '\t');
            tr.replaceWith(from, to, schema.text(newText));
            if (dispatch) dispatch(tr);
            return true;
        }

        return false;

        // TODO: if it's list item, check if upper sibling is present and move the list item to nested list
        // of the upper sibling.
        // if (type === schema.nodes.paragraph && ancestorType === schema.nodes.listItem) {
        //     const { tr } = state;
        //     const { from, to } = state.selection;
        //     const listItem = schema.nodes.listItem.createChecked(null, ancestorNode.content);
        //     const nestedList = schema.nodes.bulletList.createChecked(null, [listItem]);
        //     tr.delete(from, to);
        //     tr.replaceWith(from, to, nestedList);
        //     if (dispatch) dispatch(tr);
        //     return true;
        // }
    };
}

/**
 * @todo Implement undoTabKey function
 */
function undoTabKey(): Command {
    // handle shift-tab key, if it's code block or paragraph unindent it by 2 spaces
    // if it's list item, move the list item to parent list
    return (_state: EditorState, _dispatch?: (tr: Transaction) => void): boolean => {
        return true;
    };
}
