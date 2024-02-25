// Create an extension to listen for mouseover events
import { setHoveredLine } from '../stateEffects';
import { EditorView } from '@uiw/react-codemirror';

export default EditorView.domEventHandlers({
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
