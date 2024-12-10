import usePrevious from '../../../../common/hooks/usePrevious';
import { COMMENT_THREAD_WIDGET_CLASS, CommentThreadWidget } from '../../../../common/lib/codemirror/extensions/widgets';
import { removeThreadWidget, setThreadWidget } from '../../../../common/lib/codemirror/stateEffects';
import { UUID } from '../../../../types';
import { usePaneContext } from '../../../app/hooks/pane/usePaneContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectObjectThreadsByLine } from '../../comments.selectors';
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
    const { objectId } = usePaneContext();
    const { branchId } = useBranchContext();
    const objectThreadsByLine = useSelector(selectObjectThreadsByLine(branchId, objectId));
    const [portalsById, setPortalsById] = useState<Record<UUID, ReactPortal> | null>();
    const previous = usePrevious(portalsById);
    console.log(previous === portalsById);

    const clearWidgets = useCallback(() => {
        view.dispatch({
            effects: removeThreadWidget.of({
                deco: Decoration.widget({
                    widget: CommentThreadWidget.prototype,
                    block: true,
                }),
            }),
        });
    }, [view]);

    /**
     * We use ReactPortal to render the CommentThread component within the CodeMirror editor.
     * However, as CodeMirror is virtualized the CommentThread component gets unmounted, and it's not restored.
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

                            console.log('new portal', threadId);
                            setPortalsById((prevPortals) => ({
                                ...prevPortals,
                                [threadId]: portal,
                            }));
                        }
                    });

                    mutation.removedNodes.forEach((node) => {
                        if (node instanceof HTMLElement && node.classList.contains(COMMENT_THREAD_WIDGET_CLASS)) {
                            const threadId = node.dataset.threadId as UUID;

                            console.log('removed portal', threadId);

                            setPortalsById((prevPortals) => {
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

            clearWidgets();
        };
    }, [clearWidgets]);

    interface LineThread {
        lineNumber: number;
        threadId: UUID;
    }

    const linesThreads = useMemo(() => {
        if (objectThreadsByLine) {
            const linesThreads: LineThread[] = [];

            // iterate lines of text in view
            for (let pos = 0; pos <= view.state.doc.length;) {
                // cleanup existing widgets
                view.dispatch({
                    effects: removeThreadWidget.of({
                        deco: Decoration.widget({
                            widget: CommentThreadWidget.prototype,
                            block: true,
                        }),
                    }),
                });

                const line = view.state.doc.lineAt(pos);
                pos = line.to + 1; // Move to the start of the next line
                const lineContent = line.text || EMPTY_LINE_PLACEHOLDER;
                const threadByLine = objectThreadsByLine.get(lineContent);

                if (!threadByLine) {
                    continue;
                }

                const [threadId, lineNumber] = threadByLine;
                const emptyOnSameLine = lineContent === EMPTY_LINE_PLACEHOLDER && lineNumber === line.number;

                // check if line is in radius of 2 lines
                const withContentInRadius = lineContent !== EMPTY_LINE_PLACEHOLDER
                    && (lineNumber - line.number <= 1) && (lineNumber - line.number >= -1);

                if (emptyOnSameLine || withContentInRadius) {
                    linesThreads.push({
                        lineNumber: line.number,
                        threadId,
                    });
                }
            }

            return linesThreads;
        }

        return [];
    }, [objectThreadsByLine, view]);

    const addCommentThreadWidgets = useCallback(() => {
        linesThreads.forEach(({ lineNumber, threadId }) => {
            if (portalsById && portalsById[threadId]) {
                return;
            }

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
    }, [linesThreads, portalsById, view]);

    useEffect(() => {
        if (objectThreadsByLine) {
            addCommentThreadWidgets();
        }
    }, [addCommentThreadWidgets, objectThreadsByLine]);

    return useMemo(() => (portalsById ? Object.values(portalsById) : []), [portalsById]);
}
