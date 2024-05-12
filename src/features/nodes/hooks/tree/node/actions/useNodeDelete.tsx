import { NodecosmosDispatch } from '../../../../../../store';
import { reloadBranch } from '../../../../../branch/branches.thunks';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import { deleteFromState } from '../../../../nodes.actions';
import { deleteNode } from '../../../../nodes.thunks';
import useAuthorizeNodeAction from '../useAuthorizeNodeAction';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeDelete() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch } = useBranchContext();
    const {
        treeRootId, branchId, id, rootId, isTmp,
    } = useNodeContext();
    const navigate = useNavigate();
    const authorizeNodeAction = useAuthorizeNodeAction();

    return useCallback(async () => {
        if (!authorizeNodeAction()) {
            return;
        }

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
    }, [authorizeNodeAction, isTmp, treeRootId, id, navigate, dispatch, branchId, rootId, isBranch]);
}
