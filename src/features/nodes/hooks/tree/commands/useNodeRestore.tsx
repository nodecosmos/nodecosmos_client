import { NodecosmosDispatch } from '../../../../../store';
import { checkDeletedAncestorConflict, restoreNode } from '../../../../branch/branches.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import useNodeContext from '../node/useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Restores a node on a branch.
export default function useNodeRestore() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id, treeBranchId } = useNodeContext();
    const { mainBranchId } = useBranchParams();

    return useCallback(async () => {
        await dispatch(restoreNode({
            branchId: treeBranchId,
            nodeId: id,
        }));

        dispatch(checkDeletedAncestorConflict({
            mainBranchId,
            branchId: treeBranchId,
        }));
    }, [dispatch, id, mainBranchId, treeBranchId]);
}
