import { CommentContext, useCommentContext } from './useCommentContext';
import { NodecosmosDispatch } from '../../../store';
import { deleteComment as deleteCommentThunk, updateCommentContent } from '../comments.thunks';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export default function useCommentCommands() {
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
