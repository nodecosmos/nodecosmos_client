import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectComment } from '../comments.selectors';
import { deleteComment as deleteCommentThunk, updateCommentContent } from '../comments.thunks';
import {
    createContext, useCallback, useContext, useMemo,
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
        branchId,
        content,
        authorId,
        author,
        createdAt,
        updatedAt,
    } = useSelector(selectComment(id));

    return useMemo(() => ({
        objectId,
        threadId,
        branchId,
        id,
        content,
        authorId,
        author,
        createdAt,
        updatedAt,
        editorOpen,
        isEdited: createdAt !== updatedAt,
    }), [author, authorId, branchId, content, createdAt, editorOpen, id, objectId, threadId, updatedAt]);
}

export function useCommentCommands() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        objectId, threadId, id, branchId,
    } = useCommentContext();
    const { openEditor, closeEditor } = useContext(CommentContext);

    const updateComment = useCallback((content: string) => {
        dispatch(updateCommentContent({
            objectId,
            branchId,
            threadId,
            id,
            content,
        }));
    }, [branchId, dispatch, id, objectId, threadId]);

    const deleteComment = useCallback(() => {
        dispatch(deleteCommentThunk({
            branchId,
            objectId,
            threadId,
            id,
        }));
    }, [branchId, dispatch, id, objectId, threadId]);

    return useMemo(() => ({
        updateComment,
        deleteComment,
        openEditor,
        closeEditor,
    }), [closeEditor, deleteComment, openEditor, updateComment]);
}
