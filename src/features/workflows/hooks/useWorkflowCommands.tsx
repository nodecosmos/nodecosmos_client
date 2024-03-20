import useWorkflowContext from './useWorkflowContext';
import { NodecosmosDispatch } from '../../../store';
import { deleteWorkflow } from '../worfklow.thunks';
import { updateWorkflow } from '../workflowsSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useWorkflowCommands() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId,
        id,
        nodeId,
    } = useWorkflowContext();

    const handleTitleChange = useCallback((title: string) => {
        dispatch(updateWorkflow({
            id,
            title,
        }));
    }, [dispatch, id]);

    const handleDelete = useCallback(() => {
        dispatch(deleteWorkflow({
            id,
            branchId,
            nodeId,
        }));
    }, [branchId, dispatch, id, nodeId]);

    return {
        handleTitleChange,
        deleteWorkflow: handleDelete,
    };
}
