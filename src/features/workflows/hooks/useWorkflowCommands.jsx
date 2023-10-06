import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkflow } from '../workflowsSlice';
import { deleteWorkflow } from '../workflows.thunks';
import useWorkflowContext from './useWorkflowContext';

export default function useWorkflowCommands() {
  const { id, nodeId } = useWorkflowContext();

  const dispatch = useDispatch();

  const handleTitleChange = useCallback((title) => {
    dispatch(updateWorkflow({ id, title }));
  }, [dispatch, id]);

  const handleDelete = useCallback(() => {
    dispatch(deleteWorkflow({ id, nodeId }));
  }, [dispatch, id, nodeId]);

  return {
    handleTitleChange,
    deleteWorkflow: handleDelete,
  };
}
