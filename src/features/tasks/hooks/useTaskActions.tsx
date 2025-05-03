import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { updateTaskTitle } from '../tasks.thunks';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export default function useTaskActions(id: UUID) {
    const { branchId, nodeId } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();

    const handleTitleChange = useCallback(async (title: string) => {
        try {
            const response = await dispatch(updateTaskTitle({
                id,
                title,
                branchId,
                nodeId,
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);

                return;
            }
        } catch (error) {
            const nodecosmosError = error as NodecosmosError;
            handleServerError(nodecosmosError);
            console.error(nodecosmosError);

            return;
        }
    }, [branchId, dispatch, handleServerError, id, nodeId]);

    return useMemo(() => ({ handleTitleChange }), [handleTitleChange]);
}
