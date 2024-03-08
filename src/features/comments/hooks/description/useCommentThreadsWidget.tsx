import { COMMENT_THREAD_WIDGET_CLASS, CommentThreadWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { setThreadWidget } from '../../../../common/lib/codemirror/stateEffects';
import { UUID } from '../../../../types';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { useNodePaneContext } from '../../../nodes/hooks/pane/useNodePaneContext';
import { selectNodeThreadsByLine } from '../../comments.selectors';
import CommentThread from '../../components/CommentThread';
import { EMPTY_LINE_PLACEHOLDER } from '../../components/DescriptionComments';
import { Decoration } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import React, {
    ReactPortal, useCallback, useEffect, useMemo, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

export default function useCommentThreadsWidget(view: EditorView): ReactPortal[] {
    const { id } = useNodePaneContext();
    const { branchId } = useBranchParams();
    const nodeThreadsByLine = useSelector(selectNodeThreadsByLine(branchId, id));
    const [portalsById, setDescThreadPortals] = useState<Record<UUID, ReactPortal> | null>();

    /**
     * We use ReactPortal to render the CommentThread component within the CodeMirror editor.
     * However, as CodeMirror is virtualized the CommentThread component gets unmounted.
     * To prevent this, we use MutationObserver to detect when the Widget is added to the DOM
     * and create a `ReactPortal` for it. We handle addition of widgets in the `addCommentThreadWidgets` function.
     */
    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement && node.classList.contains(COMMENT_THREAD_WIDGET_CLASS)) {
                            const threadId = node.dataset.threadId as UUID;
                            if (!threadId) {
                                throw new Error('CommentThreadWidget is missing data-thread-id attribute');
                            }
                            const portal = createPortal(
                                <CommentThread id={threadId} />,
                                node,
                                threadId,
                            );

                            setDescThreadPortals((prevPortals) => ({
                                ...prevPortals,
                                [threadId]: portal,
                            }));
                        }
                    });

                    mutation.removedNodes.forEach((node) => {
                        if (node instanceof HTMLElement && node.classList.contains(COMMENT_THREAD_WIDGET_CLASS)) {
                            const threadId = node.dataset.threadId as UUID;

                            setDescThreadPortals((prevPortals) => {
                                const newPortals = { ...prevPortals };
                                delete newPortals[threadId];
                                return newPortals;
                            });
                        }
                    });
                }
            }
        });

        const editor = document.getElementsByClassName('cm-content')[0];

        if (editor) {
            observer.observe(editor, { childList: true });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    interface LineThread {
        lineNumber: number;
        threadId: UUID;
    }

    const linesThreads = useMemo(() => {
        if (nodeThreadsByLine) {
            const linesThreads: LineThread[] = [];

            // iterate lines of text in view
            for (let pos = 0; pos <= view.state.doc.length;) {
                const line = view.state.doc.lineAt(pos);
                pos = line.to + 1; // Move to the start of the next line
                const lineContent = line.text || EMPTY_LINE_PLACEHOLDER;
                const threadByLine = nodeThreadsByLine.get(lineContent);

                if (!threadByLine) {
                    continue;
                }

                const [threadId, lineNumber] = threadByLine;

                // check if line is in radius of 2 lines
                if ((lineNumber - line.number <= 1) && (lineNumber - line.number >= -1)) {
                    linesThreads.push({
                        lineNumber: line.number,
                        threadId,
                    });
                }
            }

            return linesThreads;
        }

        return [];
    }, [nodeThreadsByLine, view.state.doc]);

    const addCommentThreadWidgets = useCallback(() => {
        linesThreads.forEach(({ lineNumber, threadId }) => {
            const pos = view.state.doc.line(lineNumber).to;
            const decoration = Decoration.widget({
                widget: new CommentThreadWidget(threadId),
                block: true,
            });

            view.dispatch({
                effects: setThreadWidget.of({
                    deco: decoration,
                    from: pos + 1,
                }),
            });
        });
    }, [linesThreads, view]);

    useEffect(() => {
        if (nodeThreadsByLine) {
            addCommentThreadWidgets();
        }
    }, [addCommentThreadWidgets, nodeThreadsByLine]);

    return portalsById ? Object.values(portalsById) : [];
}
