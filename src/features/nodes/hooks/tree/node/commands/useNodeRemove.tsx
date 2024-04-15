import { NodecosmosDispatch } from '../../../../../../store';
import { reloadBranch } from '../../../../../branch/branches.thunks';
import useBranchParams from '../../../../../branch/hooks/useBranchParams';
import { deleteFromState } from '../../../../actions';
import { deleteNode } from '../../../../nodes.thunks';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeRemove() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch } = useBranchParams();
    const {
        treeRootId, treeBranchId, branchId, id, isTmp,
    } = useNodeContext();
    const navigate = useNavigate();

    return useCallback(() => {
        if (isTmp) {
            dispatch(deleteFromState({
                treeBranchId,
                branchId,
                id,
            }));
        } else {
            dispatch(deleteNode({
                treeBranchId,
                branchId,
                id,
            }));

            if (isBranch) {
                dispatch(reloadBranch(treeBranchId));
            }
        }
        if (treeRootId === id) navigate('/nodes');
    }, [branchId, dispatch, id, isBranch, isTmp, navigate, treeBranchId, treeRootId]);
}
