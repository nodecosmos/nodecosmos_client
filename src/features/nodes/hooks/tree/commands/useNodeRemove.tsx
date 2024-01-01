import { NodecosmosDispatch } from '../../../../../store';
import { deleteFromState } from '../../../actions';
import { deleteNode } from '../../../nodes.thunks';
import useNodeContext from '../node/useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeRemove() {
    const dispatch: NodecosmosDispatch = useDispatch();
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
        }
        if (treeRootId === id) navigate('/nodes');
    }, [branchId, dispatch, id, isTmp, navigate, treeBranchId, treeRootId]);
}
