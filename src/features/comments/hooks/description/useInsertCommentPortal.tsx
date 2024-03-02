import { CommentGutterMarker } from '../../../../common/lib/codemirror/extensions/gutter';
import { CommentWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { addCommentWidget } from '../../../../common/lib/codemirror/stateEffects';
import { hoveredLineField, selectedLineField } from '../../../../common/lib/codemirror/stateFields';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { useNodePaneContext } from '../../../nodes/hooks/pane/useNodePaneContext';
import {
    CommentThreadInsertPayload, ObjectType, ThreadType,
} from '../../comments.types';
import CreateComment from '../../components/CreateComment';
import { CommentProps } from '../useDescriptionComments';
import { Decoration } from '@codemirror/view';
import React, {
    ReactPortal, useCallback, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

export default function useInsertCommentPortal({ view, commentsEnabled }: CommentProps) {
    const dispatch = useDispatch();
    const { treeBranchId, id } = useNodePaneContext();
    const { currentRootNodeId, branchId } = useBranchParams();

    // we use `ReactPortal` to render components within the CodeMirror widgets e.g. CommentWidget
    const [createDescriptionPortal, setCreateDescriptionPortal] = useState<ReactPortal | null>();
    const closeInsertComment = useCallback(() => {
        setCreateDescriptionPortal(null);
    }, []);

    const initCreateDescriptionPortal = useCallback((lineNum: number | null, lineContent: string) => {
        closeInsertComment();
        if (view && commentsEnabled && lineNum !== null) {
            const pos = view.state.doc.line(lineNum).to;
            const widgetId = `comment-widget-${treeBranchId}-${id}-${pos}`;

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

            const threadPayload: CommentThreadInsertPayload = {
                objectId: branchId,
                objectType: ObjectType.ContributionRequest,
                objectNodeId: currentRootNodeId,
                threadType: ThreadType.ContributionRequestNodeDescription,
                threadNodeId: id,
                lineNumber: lineNum,
                lineContent,
            };

            const portal = createPortal(
                <CreateComment onClose={closeInsertComment} thread={threadPayload} />,
                document.getElementById(widgetId) as HTMLElement,
            );

            setCreateDescriptionPortal(portal);
        }
    }, [branchId, closeInsertComment, commentsEnabled, currentRootNodeId, id, treeBranchId, view]);

    useEffect(() => {
        if (view && commentsEnabled) {
            // Extend the CommentGutterMarker to dispatch Redux actions
            CommentGutterMarker.prototype.addComment = function() {
                const hoveredLineNumber = view.state.field(hoveredLineField);
                const selectedLineNumber = view.state.field(selectedLineField);
                const lineNumber = hoveredLineNumber !== null ? hoveredLineNumber : selectedLineNumber;

                if (lineNumber !== null) {
                    const lineContent = view.state.doc.line(lineNumber).text;
                    initCreateDescriptionPortal(lineNumber, lineContent);
                }
            };
        }
    }, [dispatch, view, commentsEnabled, initCreateDescriptionPortal]);

    return createDescriptionPortal;
}
