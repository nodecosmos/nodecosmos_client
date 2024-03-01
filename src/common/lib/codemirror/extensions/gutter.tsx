import { hoveredLineField, selectedLineField } from '../stateFields';
import { GutterMarker, gutter } from '@codemirror/view';
import {
    EditorView,
    RangeSetBuilder,
} from '@uiw/react-codemirror';

export class CommentGutterMarker extends GutterMarker {
    toDOM() {
        const marker = document.createElement('button');
        marker.className = 'cm-addCommentButton';
        marker.textContent = '+';
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
            // Assuming line numbers start at 1 and converting to a zero-based index for positions
            const linePos = view.state.doc.line((hoveredLine ?? selectedLine) as number).from;
            builder.add(linePos, linePos, new CommentGutterMarker());
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
