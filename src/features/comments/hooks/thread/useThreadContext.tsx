import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { selectThread, selectThreadCommentIds } from '../../comments.selectors';
import { CommentThreadProps } from '../../components/CommentThread';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

interface ThreadContextValue extends CommentThreadProps {
    collapsed: boolean;
    collapse: () => void;
    expand: () => void;
}

const ThreadContext = createContext<ThreadContextValue>({} as ThreadContextValue);

export function useThreadContextCreator(props: CommentThreadProps) {
    const [collapsed, collapse, expand] = useBooleanStateValue(false);

    return {
        ThreadContext,
        ctxValue: {
            ...props,
            collapsed,
            collapse,
            expand,
        },
    };
}

export function useThreadContext() {
    const {
        id, showLine, collapsed,
    } = useContext(ThreadContext);

    const {
        objectId, author, lineNumber, lineContent, threadLocation, createdAt,
    } = useSelector(selectThread(id));

    const commentIds = useSelector(selectThreadCommentIds(id));

    return {
        objectId,
        id,
        author,
        lineNumber,
        lineContent,
        threadLocation,
        createdAt,
        commentIds,
        commentCount: commentIds.length,
        showLine: showLine && !!lineNumber,
        collapsed,
    };
}

export function useThreadCommands() {
    const { collapse, expand } = useContext(ThreadContext);

    return {
        collapse,
        expand,
    };
}
