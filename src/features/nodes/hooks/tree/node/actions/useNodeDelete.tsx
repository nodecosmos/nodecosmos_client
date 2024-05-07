import { NodecosmosDispatch } from '../../../../../../store';
import { reloadBranch } from '../../../../../branch/branches.thunks';
import useBranchParams from '../../../../../branch/hooks/useBranchParams';
import { deleteFromState } from '../../../../nodes.actions';
import { deleteNode } from '../../../../nodes.thunks';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeDelete() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch } = useBranchParams();
    const {
        treeRootId, branchId, id, rootId, isTmp,
    } = useNodeContext();
    const navigate = useNavigate();

    return useCallback(async () => {
        if (isTmp) {
            dispatch(deleteFromState({
                branchId,
                id,
            }));
        } else {
            await dispatch(deleteNode({
                rootId,
                branchId,
                id,
            }));

            if (isBranch) {
                await dispatch(reloadBranch(branchId));
            }
        }
        if (treeRootId === id) navigate('/nodes');
    }, [branchId, dispatch, id, rootId, isBranch, isTmp, navigate, treeRootId]);
}
