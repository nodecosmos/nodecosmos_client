import { CommentThreadWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { setThreadWidget, removeInsertCommentWidget } from '../../../../common/lib/codemirror/stateEffects';
import { UUID } from '../../../../types';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { useNodePaneContext } from '../../../nodes/hooks/pane/useNodePaneContext';
import { selectNodeThreadsByLine } from '../../comments.selectors';
import CommentThread from '../../components/CommentThread';
import { Decoration } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import React, {
    ReactPortal, useCallback, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

interface ThreadLine {
    lineNumber: number;
    id: UUID;
}

export default function useThreadsPortals(view: EditorView) {
    const { id } = useNodePaneContext();
    const { branchId } = useBranchParams();
    const nodeThreadsByLine = useSelector(selectNodeThreadsByLine(branchId, id));
    const [descriptionThreadPortals, setDescThreadPortals] = useState<ReactPortal[] | null>();

    const clearWidgets = useCallback(() => {
        view?.dispatch({
            effects: removeInsertCommentWidget.of({
                deco: Decoration.widget({
                    widget: CommentThreadWidget.prototype,
                    block: true,
                }),
            }),
        });

        setDescThreadPortals(null);
    }, [view]);

    useEffect(() => {
        if (nodeThreadsByLine) {
            setTimeout(() => {
                clearWidgets();
                const threadLines: ThreadLine[] = [];

                //iterate lines of text in view
                for (let pos = 0; pos <= view.state.doc.length;) {
                    const line = view.state.doc.lineAt(pos);
                    pos = line.to + 1; // Move to the start of the next line

                    const threadByLine = nodeThreadsByLine.get(line.text);

                    if (!threadByLine) {
                        continue;
                    }

                    const [threadId, lineNumber] = threadByLine;

                    // check if line is in radius of 2 lines
                    if ((lineNumber - line.number <= 1) && (lineNumber - line.number >= -1)) {
                        threadLines.push({
                            lineNumber: line.number,
                            id: threadId,
                        });
                    }
                }

                if (threadLines.length > 0) {
                    const descriptionThreadPortals: ReactPortal[] = [];
                    threadLines.forEach(({ lineNumber, id }) => {
                        const pos = view.state.doc.line(lineNumber).to;
                        const widgetId = `comment-widget-${lineNumber}-${id}`;

                        const decoration = Decoration.widget({
                            widget: new CommentThreadWidget(widgetId),
                            block: true,
                        });

                        view.dispatch({
                            effects: setThreadWidget.of({
                                deco: decoration,
                                from: pos + 1,
                            }),
                        });

                        const portal = createPortal(
                            <CommentThread id={id} />,
                            document.getElementById(widgetId) as HTMLElement,
                            widgetId,
                        );

                        descriptionThreadPortals.push(portal);
                    });

                    setDescThreadPortals(descriptionThreadPortals);
                }
            }, 0);
        }

        return () => {
            clearWidgets();
        };
    }, [clearWidgets, nodeThreadsByLine, view]);

    return descriptionThreadPortals;
}
