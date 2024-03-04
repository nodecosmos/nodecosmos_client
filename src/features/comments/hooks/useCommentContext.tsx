import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import { selectComment } from '../comments.selectors';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

interface CtxValue {
    id: UUID;
    editorOpen: boolean;
    openEditor: () => void;
    closeEditor: () => void;
}

export const CommentContext = createContext<CtxValue>({} as CtxValue);

export function useCommentContextCreator(id: UUID) {
    const [editorOpen, openEditor, closeEditor] = useBooleanStateValue();

    return {
        CommentContext,
        ctxValue: {
            id,
            editorOpen,
            openEditor,
            closeEditor,
        },
    };
}

export function useCommentContext() {
    const { id, editorOpen } = useContext(CommentContext);
    const {
        objectId,
        threadId,
        content,
        authorId,
        author,
        createdAt,
        updatedAt,
    } = useSelector(selectComment(id));

    return {
        objectId,
        threadId,
        id,
        content,
        authorId,
        author,
        createdAt,
        updatedAt,
        editorOpen,
        isEdited: createdAt !== updatedAt,
    };
}
