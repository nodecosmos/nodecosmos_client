import { NodecosmosDispatch } from '../../../../../store';
import { UUID } from '../../../../../types';
import { setDragAndDrop, updateState } from '../../../nodes.actions';
import { selectDragAndDrop, selectSaveInProgress } from '../../../nodes.selectors';
import useReorder from '../../tree/useReorder';
import useAuthorizeNodeAction from '../useAuthorizeNodeAction';
import useNodeContext from '../useNodeContext';
import React, { useCallback, useMemo } from 'react';
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

    //------------------------------------------------------------------------------------------------------------------
    const startDrag = useCallback((event: React.DragEvent<HTMLButtonElement>) => {
        if (isRoot || isNodeActionInProgress) {
            event.preventDefault();
            return;
        }

        event.stopPropagation();

        const img = document.createElement('img');
        img.src = '/drag-image.svg';
        event.dataTransfer?.setDragImage(img, 5, -10);

        dispatch(setDragAndDrop({
            rootId,
            branchId,
            id,
            parentId,
            siblingIndex,
        }));
    }, [rootId, branchId, dispatch, id, isNodeActionInProgress, isRoot, parentId, siblingIndex]);

    //------------------------------------------------------------------------------------------------------------------
    const dragOver = useCallback((event: React.DragEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isDragOver || id === dragAndDropNodeId || ancestorIds?.includes(dragAndDropNodeId as UUID)) return;

        dispatch(updateState({
            branchId,
            id,
            isDragOver: true,
        }));
    }, [ancestorIds, dispatch, dragAndDropNodeId, id, isDragOver, branchId]);

    //------------------------------------------------------------------------------------------------------------------
    const dragLeave = useCallback(() => {
        if (!authorizeNodeAction()) {
            return;
        }

        if (!isDragOver) return;

        dispatch(updateState({
            branchId,
            id,
            isDragOver: false,
        }));
    }, [authorizeNodeAction, isDragOver, dispatch, branchId, id]);

    //------------------------------------------------------------------------------------------------------------------
    const stopDrag = useCallback(() => {
        dispatch(setDragAndDrop(null));
    }, [dispatch]);

    //------------------------------------------------------------------------------------------------------------------
    const dropCapture = useCallback(
        async () => {
            if (id === dragAndDropNodeId || ancestorIds?.includes(id)) return;

            await onNodeDropCapture({
                newParentId: id,
                newSiblingIndex: 0,
                newSiblingIndexAfterMove: 0,
            });
        },

        [ancestorIds, dragAndDropNodeId, id, onNodeDropCapture],
    );

    //------------------------------------------------------------------------------------------------------------------
    return useMemo(() => ({
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    }), [startDrag, stopDrag, dragOver, dragLeave, dropCapture]);
}
