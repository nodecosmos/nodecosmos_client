import { hoveredLineField } from '../stateFields';
import { Decoration, EditorView } from '@codemirror/view';

export default EditorView.decorations.compute([hoveredLineField], state => {
    const hoveredLineNum = state.field(hoveredLineField);
    if (hoveredLineNum !== null) {
        const line = state.doc.line(hoveredLineNum);
        return Decoration.set(
            [Decoration.line({ attributes: { class: 'cm-activeLine' } }).range(line.from)],
        );
    } else {
        return Decoration.none;
    }
});
