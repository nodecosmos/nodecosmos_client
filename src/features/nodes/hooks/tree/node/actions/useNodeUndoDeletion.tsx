import useHandleServerErrorAlert from '../../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../../store';
import { NodecosmosError } from '../../../../../../types';
import { undoDeleteNode } from '../../../../../branch/branches.thunks';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeUndoDeletion() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id } = useNodeContext();
    const { branchId } = useBranchContext();
    const handleServerError = useHandleServerErrorAlert();

    return useCallback(async () => {
        const response = await dispatch(undoDeleteNode({
            branchId,
            objectId: id,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }
    }, [branchId, dispatch, handleServerError, id]);
}
