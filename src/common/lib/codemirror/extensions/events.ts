// Create an extension to listen for mouseover events
import { setHoveredLine, setSelectedLine } from '../stateEffects';
import { hoveredLineField, selectedLineField } from '../stateFields';
import { EditorView } from '@uiw/react-codemirror';

export const onHover = EditorView.domEventHandlers({
    mouseover(event, view) {
        const pos = view.posAtCoords({
            x: event.clientX,
            y: event.clientY,
        });
        if (pos !== null) {
            const line = view.state.doc.lineAt(pos);

            if (
                view.state.field(hoveredLineField) !== line.number
                && line.number !== view.state.doc.lines
            ) {
                view.dispatch({ effects: setHoveredLine.of(line.number) });
            }
        }
    },
});

// setSelectedLine

export const onClick = EditorView.domEventHandlers({
    mousedown(event, view) {
        const pos = view.posAtCoords({
            x: event.clientX,
            y: event.clientY,
        });
        if (pos !== null) {
            const line = view.state.doc.lineAt(pos);

            // dispatch unless it's a click on the same line or last line
            if (
                view.state.field(selectedLineField) !== line.number
                && line.number !== view.state.doc.lines
            ) {
                view.dispatch({ effects: setSelectedLine.of(line.number) });
            }
        }
    },
});
