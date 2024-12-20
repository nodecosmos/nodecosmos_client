import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export function placeholderPlugin(text: string) {
    return new Plugin({
        props: {
            decorations(state) {
                let doc = state.doc;
                if (doc.childCount === 0 || (
                    doc.childCount === 1
                    && doc?.firstChild?.isTextblock
                    && doc?.firstChild?.content.size === 0
                )) {
                    const el = document.createElement('span');
                    el.classList.add('placeholder');
                    el.innerText = text;

                    return DecorationSet.create(doc, [Decoration.widget(doc.childCount, el)]);
                }
            },
        },
    });
}
