import { RangeSet } from '@codemirror/state';
import { Decoration, ViewPlugin } from '@codemirror/view';
import {
    RangeSetBuilder, ViewUpdate, WidgetType,
} from '@uiw/react-codemirror';
import { Diff, diff_match_patch } from 'diff-match-patch';

type DiffExtension = ViewPlugin<{
    decorations: RangeSet<Decoration>;
    update(update: ViewUpdate): void
}>;

export default function Extension(originalText: string, newText: string): DiffExtension {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(originalText, newText);

    dmp.diff_cleanupSemantic(diffs);

    const createDiffDecorations = (diffs: Diff[]): RangeSet<Decoration> => {
        const builder = new RangeSetBuilder<Decoration>();
        let index = 0;

        diffs.forEach(([op, text]) => {
            if (op === 0) { // No change
                index += text.length;
            } else if (op === 1) { // Addition
                const deco = Decoration.mark({ class: 'cm-diffAdd' });
                builder.add(index, index + text.length, deco);
                index += text.length;
            } else if (op === -1) {
                const deco = Decoration.widget({
                    widget: new class extends WidgetType {
                        toDOM() {
                            // if node.textContent trimmed is empty we create a paragraph
                            let node;
                            if (text.trim() === '') {
                                node = document.createElement('p');
                            } else {
                                node = document.createElement('span');
                            }
                            node.textContent = text;
                            node.className = 'cm-diffRemoved'; // Apply custom styling
                            return node;
                        }
                    },
                    side: -1, // Display the widget to the left of the position index
                });
                builder.add(index, index, deco);
            }
        });

        return builder.finish();
    };

    return ViewPlugin.fromClass(class {
        decorations;

        constructor() {
            const dmp = new diff_match_patch();

            const diffs = dmp.diff_main(originalText, newText);
            dmp.diff_cleanupSemantic(diffs);
            this.decorations = createDiffDecorations(diffs);
        }

        update(update: ViewUpdate) {
            if (update.docChanged) {
                const dmp = new diff_match_patch();
                const diffs = dmp.diff_main(update.state.doc.toString(), newText);
                dmp.diff_cleanupSemantic(diffs);
                this.decorations = createDiffDecorations(diffs);
            }
        }
    }, { decorations: v => v.decorations });
}
