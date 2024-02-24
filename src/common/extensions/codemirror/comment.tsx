import { StateField, StateEffect } from '@codemirror/state';
import { GutterMarker, gutter } from '@codemirror/view';
import {
    EditorView,
    RangeSetBuilder,
} from '@uiw/react-codemirror';

// Define a state effect to update the hovered line
const setHoveredLine = StateEffect.define<number | null>();

// Define a state field to track the hovered line
export const hoveredLineField = StateField.define<number | null>({
    create() {
        return null;
    },
    update(value, tr) {
        for (const effect of tr.effects) {
            if (effect.is(setHoveredLine)) {
                return effect.value;
            }
        }
        return value;
    },
});

export class CommentGutterMarker extends GutterMarker {
    toDOM() {
        const marker = document.createElement('button');
        marker.textContent = '+';
        marker.style.cursor = 'pointer';
        marker.onclick = () => this.addComment();
        return marker;
    }

    addComment() {
        // Placeholder for method to display comment input UI
        console.log('Add comment functionality goes here.');
    }
}

export const commentGutter = gutter({
    class: 'cm-commentGutter',
    markers: (view: EditorView) => {
        const builder = new RangeSetBuilder<GutterMarker>();
        const hoveredLine = view.state.field(hoveredLineField);

        if (hoveredLine !== null) {
            // Assuming line numbers start at 1 and converting to a zero-based index for positions
            const linePos = view.state.doc.line(hoveredLine).from;
            builder.add(linePos, linePos, new CommentGutterMarker());
        }

        return builder.finish();
    },
    initialSpacer: () => new CommentGutterMarker(),
    domEventHandlers: {
        click: (_view, line) => {
            // Handle the click event on the gutter marker if needed
            console.log('Gutter marker clicked at line', line);
            return false; // Return true if the event is handled
        },
    },
});

// Create an extension to listen for mouseover events
export const mouseoverExtension = EditorView.domEventHandlers({
    mouseover(event, view) {
        const pos = view.posAtCoords({
            x: event.clientX,
            y: event.clientY,
        });
        if (pos !== null) {
            const line = view.state.doc.lineAt(pos);
            view.dispatch({ effects: setHoveredLine.of(line.number) });
        }
    },
});
