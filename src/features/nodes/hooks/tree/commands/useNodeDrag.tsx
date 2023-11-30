import { NodecosmosDispatch } from '../../../../../store';
import { setDragAndDrop, updateState } from '../../../actions';
import { selectDragAndDrop, selectActionInProgress } from '../../../nodes.selectors';
import { DragAndDrop } from '../../../nodes.types';
import useNodeDropCapture from '../reorder/useNodeDropCapture';
import useNodeContext from '../useNodeContext';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeDrag() {
    const {
        treeBranchId,
        branchId,
        parentId,
        siblingIndex,
        id,
        isRoot,
        isDragOver,
        ancestorIds,
    } = useNodeContext();
    const dragAndDrop = useSelector(selectDragAndDrop) as DragAndDrop;
    const dispatch: NodecosmosDispatch = useDispatch();
    const onNodeDropCapture = useNodeDropCapture();
    const isNodeActionInProgress = useSelector(selectActionInProgress);

    const dragAndDropNodeId = dragAndDrop?.id;

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
            treeBranchId,
            isDragging: true,
            id,
            branchId,
            parentId,
            siblingIndex,
        }));
    }, [branchId, dispatch, id, isNodeActionInProgress, isRoot, parentId, siblingIndex, treeBranchId]);

    //------------------------------------------------------------------------------------------------------------------
    const dragOver = useCallback((event: React.DragEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isDragOver || id === dragAndDropNodeId || ancestorIds.includes(id)) return;

        dispatch(updateState({
            treeBranchId,
            id,
            isDragOver: true,
        }));
    }, [ancestorIds, dispatch, dragAndDropNodeId, id, isDragOver, treeBranchId]);

    //------------------------------------------------------------------------------------------------------------------
    const dragLeave = useCallback(() => {
        if (!isDragOver) return;

        dispatch(updateState({
            treeBranchId,
            id,
            isDragOver: false,
        }));
    }, [dispatch, id, isDragOver, treeBranchId]);

    //------------------------------------------------------------------------------------------------------------------
    const stopDrag = useCallback(() => {
        if (!isDragOver) return;
        dispatch(setDragAndDrop(null));
    }, [dispatch, isDragOver]);

    //------------------------------------------------------------------------------------------------------------------
    const captureDroppedNode = useCallback(
        async () => {
            if (id === dragAndDropNodeId || ancestorIds.includes(id)) return;

            await onNodeDropCapture({
                newParentId: id,
                newSiblingIndex: 0,
                newSiblingIndexAfterMove: 0,
            });

            if (!isDragOver) return;

            dispatch(updateState({
                treeBranchId,
                id,
                isDragOver: false,
            }));
        },
        [ancestorIds, dispatch, dragAndDropNodeId, id, isDragOver, onNodeDropCapture, treeBranchId],
    );

    //------------------------------------------------------------------------------------------------------------------
    return {
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        captureDroppedNode,
    };
}
