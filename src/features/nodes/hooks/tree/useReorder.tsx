import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../store';
import { NodecosmosError, UUID } from '../../../../types';
import { setAlert } from '../../../app/appSlice';
import { reloadBranch } from '../../../branch/branches.thunks';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { setDragAndDrop } from '../../nodes.actions';
import { selectBranchChildIds, selectDragAndDrop } from '../../nodes.selectors';
import { reorder } from '../../nodes.thunks';
import { DragAndDrop } from '../../nodes.types';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface NodeDropCaptureParams {
    newParentId: UUID;
    newSiblingIndex: number;
    newSiblingIndexAfterMove: number;
}

export default function useReorder() {
    const dragAndDrop = useSelector(selectDragAndDrop) as DragAndDrop;
    const { branchId, isBranch } = useBranchParams();
    const dispatch: NodecosmosDispatch = useDispatch();
    const { rootId, id } = dragAndDrop || {};

    const [reorderInProgress, setReorderInProgress] = useState(false);
    const handleServerError = useHandleServerErrorAlert();
    const childIdsByParentId = useSelector(selectBranchChildIds(branchId));

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

        let newUpperSiblingId, newLowerSiblingId;

        if (childIdsByParentId) {
            newUpperSiblingId = childIdsByParentId[newParentId][newSiblingIndex - 1];
            newLowerSiblingId = childIdsByParentId[newParentId][newSiblingIndex];
        }

        const response = await dispatch(reorder({
            rootId,
            branchId,
            id,
            newParentId,
            newUpperSiblingId,
            newLowerSiblingId,
            newSiblingIndexAfterMove,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            setReorderInProgress(false);
            console.error(error);

            return;
        }

        if (isBranch) {
            dispatch(reloadBranch(branchId));
        }

        dispatch(setDragAndDrop(null));
        setReorderInProgress(false);
    },
    [
        dispatch, reorderInProgress, childIdsByParentId, rootId, branchId, id, isBranch, handleServerError,
    ]);
}
