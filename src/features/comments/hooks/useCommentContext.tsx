import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectComment } from '../comments.selectors';
import { deleteComment as deleteCommentThunk, updateCommentContent } from '../comments.thunks';
import {
    createContext, useCallback, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

export function useCommentCommands() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        objectId, threadId, id,
    } = useCommentContext();
    const { openEditor, closeEditor } = useContext(CommentContext);

    const updateComment = useCallback((content: string) => {
        dispatch(updateCommentContent({
            objectId,
            threadId,
            id,
            content,
        }));
    }, [dispatch, id, objectId, threadId]);

    const deleteComment = useCallback(() => {
        dispatch(deleteCommentThunk({
            objectId,
            threadId,
            id,
        }));
    }, [dispatch, id, objectId, threadId]);

    return {
        updateComment,
        deleteComment,
        openEditor,
        closeEditor,
    };
}
