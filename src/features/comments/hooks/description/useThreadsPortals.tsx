import { CommentWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { addCommentWidget } from '../../../../common/lib/codemirror/stateEffects';
import { UUID } from '../../../../types';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { useNodePaneContext } from '../../../nodes/hooks/pane/useNodePaneContext';
import { selectNodeThreadsByLine } from '../../comments.selectors';
import CommentThread from '../../components/CommentThread';
import { CommentProps } from '../useDescriptionComments';
import { Decoration } from '@codemirror/view';
import React, {
    ReactPortal, useEffect, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

interface ThreadLine {
    lineNumber: number;
    id: UUID;
}

export default function useThreadsPortals({ view, commentsEnabled }: CommentProps) {
    const { id } = useNodePaneContext();
    const { branchId } = useBranchParams();

    const nodeThreadsByLine = useSelector(selectNodeThreadsByLine(branchId, id));

    const [descriptionThreadPortals, setDescThreadPortals] = useState<ReactPortal[] | null>();

    useEffect(() => {
        if (view && commentsEnabled && nodeThreadsByLine) {
            const threadLines: ThreadLine[] = [];

            //iterate lines of text in view
            for (let pos = 0; pos <= view.state.doc.length;) {
                const line = view.state.doc.lineAt(pos);

                const threadId = nodeThreadsByLine.get(line.text);

                if (threadId) {
                    threadLines.push({
                        lineNumber: line.number,
                        id: threadId,
                    });
                }
                pos = line.to + 1; // Move to the start of the next line
            }

            if (threadLines.length > 0) {
                const descriptionThreadPortals: ReactPortal[] = [];
                threadLines.forEach(({ lineNumber, id }) => {
                    const pos = view.state.doc.line(lineNumber).to;
                    const widgetId = `comment-widget-${lineNumber}-${id}`;

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
                        <CommentThread id={id} />,
                        document.getElementById(widgetId) as HTMLElement,
                    );

                    descriptionThreadPortals.push(portal);
                });

                setDescThreadPortals(descriptionThreadPortals);
            }
        }
    }, [commentsEnabled, nodeThreadsByLine, view]);

    return descriptionThreadPortals;
}
