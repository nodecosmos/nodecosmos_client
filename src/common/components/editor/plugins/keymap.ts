import {
    wrapIn, setBlockType, chainCommands, toggleMark, exitCode,
    joinUp, joinDown, lift, selectParentNode,
} from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import {
    wrapInList, splitListItem, liftListItem, sinkListItem,
} from 'prosemirror-schema-list';
import { Command } from 'prosemirror-state';

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

    bind('Mod-b', wrapIn(schema.nodes.bold));
    bind('Mod-B', toggleMark(schema.marks.strong));
    bind('Mod-i', toggleMark(schema.marks.em));
    bind('Mod-I', toggleMark(schema.marks.em));
    bind('Mod-`', toggleMark(schema.marks.code));
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

    return keys;
}
