import { CommentGutterMarker } from '../../../../common/lib/codemirror/extensions/gutter';
import { CommentWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { removeInsertCommentWidget, setInsertCommentWidget } from '../../../../common/lib/codemirror/stateEffects';
import { hoveredLineField, selectedLineField } from '../../../../common/lib/codemirror/stateFields';
import { usePaneContext } from '../../../app/hooks/pane/usePaneContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import {
    ThreadLocation, ThreadInsertPayload, ThreadObjectType,
} from '../../comments.types';
import CommentEditor from '../../components/CommentEditor';
import { EMPTY_LINE_PLACEHOLDER } from '../../components/DescriptionComments';
import { Decoration } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import React, {
    ReactPortal, useCallback, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';

export default function useCommentInsertWidget(view: EditorView) {
    const { objectId } = usePaneContext();
    const { branchId } = useBranchContext();

    // we use `ReactPortal` to render components within the CodeMirror widgets e.g. CommentWidget
    const [createDescriptionPortals, setCreateDescriptionPortals] = useState<ReactPortal[] | null>();

    const closeInsertComment = useCallback(() => {
        setCreateDescriptionPortals(null);

        view.dispatch({
            effects: removeInsertCommentWidget.of({
                deco: Decoration.widget({
                    widget: CommentWidget.prototype,
                    block: true,
                }),
            }),
        });
    }, [view]);

    const insertCreateCommentWidget = useCallback((lineNumber: number | null) => {
        if (view && lineNumber !== null) {
            const pos = view.state.doc.line(lineNumber).to;
            const widgetId = `comment-widget-${lineNumber}`;
            const lineContent = view.state.doc.lineAt(pos).text;

            // Create a widget decoration
            const widget = new CommentWidget(widgetId);

            const decoration = Decoration.widget({
                widget,
                block: true,
            });

            view.dispatch({
                effects: setInsertCommentWidget.of({
                    deco: decoration,
                    from: pos + 1,
                }),
            });

            const threadPayload: ThreadInsertPayload = {
                branchId,
                objectId,
                objectType: ThreadObjectType.ContributionRequest,
                threadLocation: ThreadLocation.ContributionRequestObjectDescription,
                lineNumber,
                lineContent: lineContent || EMPTY_LINE_PLACEHOLDER,
                title: 'Description Review',
            };

            // Codemirror Widget element is created and appended to the DOM
            // Here we create a portal to render the CommentEditor component within the widget
            const portal = createPortal(
                <CommentEditor
                    onClose={closeInsertComment}
                    newThread={threadPayload}
                    withThreadBlock
                    info="Add description review comment" />,
                document.getElementById(widgetId) as HTMLElement,
                widgetId,
            );

            setCreateDescriptionPortals(portals => portals ? [...portals, portal] : [portal]);
        }
    }, [branchId, closeInsertComment, objectId, view]);

    useEffect(() => {
        CommentGutterMarker.prototype.addComment = function() {
            const hoveredLineNumber = view.state.field(hoveredLineField);
            const selectedLineNumber = view.state.field(selectedLineField);
            const lineNumber = hoveredLineNumber !== null ? hoveredLineNumber : selectedLineNumber;

            if (lineNumber !== null) {
                insertCreateCommentWidget(lineNumber);
            }
        };

        return closeInsertComment;
    }, [view, insertCreateCommentWidget, closeInsertComment]);

    return createDescriptionPortals;
}
