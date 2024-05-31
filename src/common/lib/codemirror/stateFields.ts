import {
    setInsertCommentWidget,
    setThreadWidget,
    removeInsertCommentWidget,
    setHoveredLine,
    setSelectedLine,
    removeThreadWidget,
} from './stateEffects';
import { StateField } from '@codemirror/state';
import { Decoration } from '@codemirror/view';
import { DecorationSet, EditorView } from '@uiw/react-codemirror';

/**
 * StateField: Represents a piece of state that is tracked through the lifecycle of the editor.
 * A StateField can hold any type of data you want to keep in the editor's state, such as the
 * current set of decorations (e.g., highlights, widgets), the content of the document, or even
 * something like the current theme. Fields are how you store and update state in a structured
 * and reactive way in CM6. When the state changes (due to user actions, programmatic updates, etc.),
 * fields can be updated accordingly, and you can respond to these changes.
 */
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

export const selectedLineField = StateField.define<number | null>({
    create() {
        return null;
    },
    update(value, tr) {
        for (const effect of tr.effects) {
            if (effect.is(setSelectedLine)) {
                return effect.value;
            }
        }
        return value;
    },
});

export const commentWidgetsField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(widgetsVal, tr) {
        let widgets = widgetsVal.map(tr.changes);

        for (const e of tr.effects) {
            if (e.is(setInsertCommentWidget)) {
                const { deco, from } = e.value;

                widgets = widgets.update({ add: [deco.range(from)] });
            } else if (e.is(removeInsertCommentWidget)) {
                const { deco } = e.value;

                widgets = widgets.update({ filter: (_from, _to, value) => value === deco });
            }
        }

        return widgets;
    },
    provide: f => EditorView.decorations.from(f),
});

export const commentThreadWidgetField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(widgetsVal, tr) {
        let widgets = widgetsVal.map(tr.changes);

        for (const e of tr.effects) {
            if (e.is(setThreadWidget)) {
                const { deco, from } = e.value;

                widgets = widgets.update({ add: [deco.range(from)] });
            } else if (e.is(removeThreadWidget)) {
                const { deco } = e.value;

                widgets = widgets.update({ filter: (_from, _to, value) => value === deco });
            }
        }

        return widgets;
    },
    provide: f => EditorView.decorations.from(f),
});
