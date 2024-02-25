import { CommentGutterMarker } from '../../lib/codemirror/extensions/comment';
import { addCommentWidget } from '../../lib/codemirror/stateEffects';
import { hoveredLineField } from '../../lib/codemirror/stateFields';
import { Decoration } from '@codemirror/view';
import { EditorView, WidgetType } from '@uiw/react-codemirror';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface CommentProps {
    view?: EditorView;
    commentsEnabled: boolean;
}

export class CommentWidget extends WidgetType {
    constructor() {
        super();
    }

    toDOM() {
        const div = document.createElement('div');
        div.style.width = '100%';
        div.textContent = 'This is a full-width element below a line';
        div.style.background = '#eee';
        div.style.padding = '8px';
        div.style.boxSizing = 'border-box';
        return div;
    }

    ignoreEvent() {
        return false;
    }
}

export default function useComments({ view, commentsEnabled }: CommentProps) {
    const dispatch = useDispatch();

    const insertComment = useCallback((lineNum: number | null) => {
        if (view && commentsEnabled) {
            const pos = view.state.doc.line(lineNum as number).to;

            // Create a widget decoration
            const widget = new CommentWidget();
            const decoration = Decoration.widget({
                widget,
                side: 1,
            });

            view.dispatch({
                effects: addCommentWidget.of({
                    deco: decoration,
                    from: pos + 1,
                }),
            });
        }
    }, [view, commentsEnabled]);

    useEffect(() => {
        if (view && commentsEnabled) {
            // Extend the CommentGutterMarker to dispatch Redux actions
            CommentGutterMarker.prototype.addComment = function() {
                const lineNumber = view.state.field(hoveredLineField);
                insertComment(lineNumber);
            };
        }
    }, [dispatch, view, commentsEnabled, insertComment]);
}
