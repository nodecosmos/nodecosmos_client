import { CommentThreadWidget } from './widgets';
import { hoveredLineField, selectedLineField } from '../stateFields';
import { GutterMarker, gutter } from '@codemirror/view';
import {
    EditorView,
    RangeSetBuilder,
} from '@uiw/react-codemirror';

export class CommentGutterMarker extends GutterMarker {
    toDOM() {
        const marker = document.createElement('button');
        // eslint-disable-next-line max-len
        marker.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>';
        marker.className = 'cm-addCommentButton';
        marker.style.cursor = 'pointer';
        marker.onclick = () => this.addComment();
        return marker;
    }

    addComment() {}
}

export const commentGutter = gutter({
    class: 'cm-commentGutter',
    markers: (view: EditorView) => {
        const builder = new RangeSetBuilder<GutterMarker>();
        const hoveredLine = view.state.field(hoveredLineField);
        const selectedLine = view.state.field(selectedLineField);

        if (hoveredLine !== null || selectedLine !== null) {
            const lineNumber = hoveredLine ?? selectedLine as number;
            const linePos = view.state.doc.line(lineNumber);
            const { from } = linePos;
            const nextLinePos = view.state.doc.line(lineNumber + 1);
            const { from: nextLineFrom, to: nextLineTo } = nextLinePos;

            // get decorations
            let hasComments = false;
            const decorations = view.state.facet(EditorView.decorations);

            // check if there are any decorations on the next line
            for (const deco of decorations) {
                if (hasComments) break;

                if (typeof deco !== 'function') {
                    deco.between(nextLineFrom, nextLineTo, (_from, _to, value) => {
                        if (value.spec.widget instanceof CommentThreadWidget) {
                            hasComments = true;
                        }
                    });
                }
            }

            if (!hasComments) {
                builder.add(from, from, new CommentGutterMarker());
            }
        }

        return builder.finish();
    },
    initialSpacer: () => new CommentGutterMarker(),
    domEventHandlers: {
        click: (/*view,line*/) => {
            return true; // Return true if the event is handled
        },
    },
});
