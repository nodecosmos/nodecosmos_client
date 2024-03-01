import { CommentGutterMarker } from '../../../common/lib/codemirror/extensions/gutter';
import { CommentWidget } from '../../../common/lib/codemirror/extensions/widgets';
import { addCommentWidget } from '../../../common/lib/codemirror/stateEffects';
import { hoveredLineField, selectedLineField } from '../../../common/lib/codemirror/stateFields';
import { useNodePaneContext } from '../../nodes/hooks/pane/useNodePaneContext';
import AddDescriptionComment from '../components/AddDescriptionComment';
import { Decoration } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import React, {
    ReactPortal, useCallback, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

interface CommentProps {
    view?: EditorView;
    commentsEnabled: boolean;
}

export default function useDescriptionComments({ view, commentsEnabled }: CommentProps) {
    const dispatch = useDispatch();
    const {
        treeBranchId, branchId, id,
    } = useNodePaneContext();

    const [portal, setPortal] = useState<ReactPortal | null>();
    const closeInsertComment = useCallback(() => {
        setPortal(null);
    }, []);

    const insertComment = useCallback((lineNum: number | null) => {
        closeInsertComment();
        if (view && commentsEnabled) {
            const pos = view.state.doc.line(lineNum as number).to;
            const widgetId = `comment-widget-${treeBranchId}-${branchId}-${id}-${pos}`;

            // Create a widget decoration
            const widget = new CommentWidget(widgetId);

            const decoration = Decoration.widget({
                widget,
                block: true,
                side: -1,
            });

            view.dispatch({
                effects: addCommentWidget.of({
                    deco: decoration,
                    from: pos + 1,
                }),
            });

            const portal = createPortal(
                <AddDescriptionComment closeInsertComment={closeInsertComment} />,
                document.getElementById(widgetId) as HTMLElement,
            );

            setPortal(portal);
        }
    }, [view, commentsEnabled, treeBranchId, branchId, id, closeInsertComment]);

    useEffect(() => {
        if (view && commentsEnabled) {
            // Extend the CommentGutterMarker to dispatch Redux actions
            CommentGutterMarker.prototype.addComment = function() {
                const hoveredLineNumber = view.state.field(hoveredLineField);
                const selectedLineNumber = view.state.field(selectedLineField);
                const lineNumber = hoveredLineNumber !== null ? hoveredLineNumber : selectedLineNumber;
                insertComment(lineNumber);
            };
        }
    }, [dispatch, view, commentsEnabled, insertComment]);

    return portal;
}
