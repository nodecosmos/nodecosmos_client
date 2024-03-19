import useHandleServerErrorAlert from '../../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../../store';
import { NodecosmosError } from '../../../../../../types';
import { undoDeleteNode } from '../../../../../branch/branches.thunks';
import useBranchParams from '../../../../../branch/hooks/useBranchParams';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeUndoDeletion() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id } = useNodeContext();
    const { branchId } = useBranchParams();
    const handleServerError = useHandleServerErrorAlert();

    return useCallback(async () => {
        const response = await dispatch(undoDeleteNode({
            branchId,
            nodeId: id,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }
    }, [branchId, dispatch, handleServerError, id]);
}
