import useWorkflowContext from './useWorkflowContext';
import { NodecosmosDispatch } from '../../../store';
import { updateWorkflowTitle } from '../worfklow.thunks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useWorkflowActions() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        rootId,
        branchId,
        nodeId,
    } = useWorkflowContext();

    const handleTitleChange = useCallback(async (title: string) => {
        await dispatch(updateWorkflowTitle({
            rootId,
            branchId,
            nodeId,
            title,
        }));
    }, [branchId, dispatch, nodeId, rootId]);

    return { handleTitleChange };
}
