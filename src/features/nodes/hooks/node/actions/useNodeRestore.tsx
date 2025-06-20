import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError } from '../../../../../types';
import { restoreNode } from '../../../../branch/branches.thunks';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Restores a node on a branch.
export default function useNodeRestore() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id, branchId } = useNodeContext();
    const handleServerError = useHandleServerErrorAlert();

    return useCallback(async () => {
        const response = await dispatch(restoreNode({
            branchId,
            objectId: id,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }
    }, [dispatch, handleServerError, id, branchId]);
}
