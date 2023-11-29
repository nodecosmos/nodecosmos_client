import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError, UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import { setDragAndDrop } from '../../../actions';
import { selectDragAndDrop, selectBranchChildIds } from '../../../nodes.selectors';
import { reorder } from '../../../nodes.thunks';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface NodeDropCaptureParams {
    newParentId: UUID;
    newSiblingIndex: number;
    newSiblingIndexAfterMove: number;
}

export default function useNodeDropCapture() {
    const dispatch: NodecosmosDispatch = useDispatch();

    const dragAndDrop = useSelector(selectDragAndDrop);
    const [reorderInProgress, setReorderInProgress] = useState(false);
    const handleServerError = useHandleServerErrorAlert();

    const id = dragAndDrop?.id;
    const branchId = dragAndDrop?.branchId;
    const treeBranchId = dragAndDrop?.treeBranchId;

    const childIdsByParentId = useSelector(selectBranchChildIds(branchId as UUID)) as Record<UUID, UUID[]>;

    return useCallback(async (params: NodeDropCaptureParams) => {
        const {
            newParentId, newSiblingIndex, newSiblingIndexAfterMove,
        } = params;

        if (reorderInProgress) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Another reorder in progress. Please wait!',
            }));

            return;
        }

        const newUpperSiblingId = childIdsByParentId[newParentId][newSiblingIndex - 1];
        const newlowerSiblingId = childIdsByParentId[newParentId][newSiblingIndex];

        const response = await dispatch(reorder({
            treeBranchId: treeBranchId as UUID,
            id: id as UUID,
            branchId: branchId as UUID,
            newParentId,
            newUpperSiblingId,
            newlowerSiblingId,
            newSiblingIndexAfterMove,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            setReorderInProgress(false);
            console.error(error);

            return;
        }

        dispatch(setDragAndDrop(null));
        setReorderInProgress(false);
    }, [branchId, childIdsByParentId, dispatch, handleServerError, id, reorderInProgress, treeBranchId]);
}

