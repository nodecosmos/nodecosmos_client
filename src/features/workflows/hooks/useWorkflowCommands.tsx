import useWorkflowContext from './useWorkflowContext';
import { NodecosmosDispatch } from '../../../store';
import { updateWorkflow } from '../workflowsSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useWorkflowCommands() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId,
        id,
    } = useWorkflowContext();

    const handleTitleChange = useCallback((title: string) => {
        dispatch(updateWorkflow({
            branchId,
            id,
            title,
        }));
    }, [branchId, dispatch, id]);

    return { handleTitleChange };
}
