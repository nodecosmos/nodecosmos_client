import { NodecosmosDispatch } from '../../../../../store';
import { UUID } from '../../../../../types';
import { setDragAndDrop, updateState } from '../../../nodes.actions';
import { selectDragAndDrop, selectSaveInProgress } from '../../../nodes.selectors';
import { TreeType } from '../../../nodes.types';
import useReorder from '../../tree/useReorder';
import useTreeContext from '../../tree/useTreeContext';
import useAuthorizeNodeAction from '../useAuthorizeNodeAction';
import useNodeContext from '../useNodeContext';
import React, {
    useCallback, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeDrag() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        rootId,
        branchId,
        parentId,
        siblingIndex,
        id,
        isRoot,
        isDragOver,
        ancestorIds,
    } = useNodeContext();
    const dragAndDrop = useSelector(selectDragAndDrop);
    const onNodeDropCapture = useReorder();
    const isNodeActionInProgress = useSelector(selectSaveInProgress);
    const dragAndDropNodeId = dragAndDrop?.id;
    const authorizeNodeAction = useAuthorizeNodeAction();
    const { type } = useTreeContext();
    const currentDragOverId = useRef<UUID | null>(null);

    //------------------------------------------------------------------------------------------------------------------
    const startDrag = useCallback((event: React.DragEvent<HTMLButtonElement>) => {
        if (isRoot || isNodeActionInProgress || type === TreeType.Checkbox) {
            event.preventDefault();
            return;
        }

        event.stopPropagation();

        const img = document.createElement('img');
        img.src = '/static/drag-image.svg';
        event.dataTransfer?.setDragImage(img, 5, -10);

        setTimeout(() => {
            dispatch(setDragAndDrop({
                rootId,
                branchId,
                id,
                parentId,
                siblingIndex,
            }));
        }, 10);
    },
    [
        isRoot, isNodeActionInProgress, type, dispatch, rootId, branchId, id, parentId,
        siblingIndex,
    ]);

    //------------------------------------------------------------------------------------------------------------------
    const dragOver = useCallback((event: React.DragEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!dragAndDropNodeId
            || isDragOver
            || id === dragAndDropNodeId
            || ancestorIds?.includes(dragAndDropNodeId as UUID)) return;

        currentDragOverId.current = id;
        dispatch(updateState({
            branchId,
            id,
            isDragOver: true,
        }));
    }, [ancestorIds, dispatch, dragAndDropNodeId, id, isDragOver, branchId]);

    //------------------------------------------------------------------------------------------------------------------
    const dragLeave = useCallback(() => {
        if (!isDragOver) return;

        currentDragOverId.current = null;
        dispatch(updateState({
            branchId,
            id,
            isDragOver: false,
        }));
    }, [isDragOver, dispatch, branchId, id]);

    //------------------------------------------------------------------------------------------------------------------
    const stopDrag = useCallback(() => {
        dispatch(setDragAndDrop(null));
    }, [dispatch]);

    //------------------------------------------------------------------------------------------------------------------
    const dropCapture = useCallback(
        async () => {
            if (currentDragOverId.current) {
                dispatch(updateState({
                    branchId,
                    id: currentDragOverId.current,
                    isDragOver: false,
                }));
            }

            if (id === dragAndDropNodeId || ancestorIds?.includes(id)) return;

            if (!authorizeNodeAction()) {
                return;
            }

            await onNodeDropCapture({
                newParentId: id,
                newSiblingIndex: 0,
                newSiblingIndexAfterMove: 0,
            });
        },

        [ancestorIds, authorizeNodeAction, branchId, dispatch, dragAndDropNodeId, id, onNodeDropCapture],
    );

    //------------------------------------------------------------------------------------------------------------------
    return useMemo(() => ([
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    ]), [startDrag, stopDrag, dragOver, dragLeave, dropCapture]);
}
