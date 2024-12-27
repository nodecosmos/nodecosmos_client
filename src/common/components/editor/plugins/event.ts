import {
    Plugin, PluginKey, Transaction,
} from 'prosemirror-state';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const stateChangePlugin = new Plugin({
    key: new PluginKey('stateChangePlugin'),

    // The "apply" method is called whenever a transaction is applied
    // (doc changes, selection changes, etc.)
    apply(tr: Transaction, _oldState: EditorState, _newState: EditorState) {
        // Check if doc changed or selection changed
        if (tr.docChanged || tr.selectionSet) {
            // We need access to the EditorView's root DOM node
            // We'll get that in 'view' property, see "view" callback below
            // We'll store the view in the plugin's spec, or do it in the "view" property
        }
        return null;
    },

    // The "view" property is a function that is passed the EditorView.
    view(_editorView: EditorView) {
        return {
            update: (view: EditorView, _prevState: EditorState) => {
                // This "update" method is also called on every transaction
                // So we can dispatch an event here if needed
                const tr = view.state.tr;
                if (tr.docChanged || tr.selectionSet) {
                    // Dispatch a custom DOM event on the editor's root element
                    const dom = view.dom; // The actual <div> or container
                    dom.dispatchEvent(
                        new CustomEvent('pm-state-change', { detail: { state: view.state } }),
                    );
                }
            },
        };
    },
});
