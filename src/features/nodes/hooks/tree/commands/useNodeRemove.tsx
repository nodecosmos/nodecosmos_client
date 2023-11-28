import { NodecosmosDispatch } from '../../../../../store';
import { deleteFromState } from '../../../actions';
import { deleteNode } from '../../../nodes.thunks';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeRemove() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeRootId, branchId, id, isTemp,
    } = useNodeContext();
    const navigate = useNavigate();

    return useCallback(() => {
        if (isTemp) {
            dispatch(deleteFromState({
                branchId,
                id, 
            }));
        } else {
            dispatch(deleteNode({
                branchId,
                id, 
            }));
        }
        if (treeRootId === id) navigate('/nodes');
    }, [branchId, dispatch, id, isTemp, navigate, treeRootId]);
}
