import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectFlowStepAttribute } from '../../flow-steps/flowSteps.selectors';
import { createIO } from '../inputOutputs.thunks';
import { updateWorkflowInitialInputs } from '../../workflows/workflows.thunks';
import { updateFlowStepOutputs } from '../../flow-steps/flowSteps.thunks';
import { setAlert } from '../../app/appSlice';
import { ASSOCIATED_OBJECT_TYPES } from '../inputOutputs.constants';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';

export default function useIOSubmitHandler({
  onClose,
  workflowId,
  associatedObject,
  flowStepId,
  flowStepOutputNodeId,
  autocompleteValue,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const rootNodeId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
  const currentInitialInputIds = useSelector(selectWorkflowAttribute(workflowId, 'initialInputIds'));
  const currentFlowStepOutputs = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'outputIdsByNodeId'));
  const flowId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'flowId'));
  const flowStepNodeId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'nodeId'));
  const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(rootNodeId));

  const onSubmit = async (formValues) => {
    setLoading(true);
    const existingIO = autocompleteValue && allWorkflowIOs.find((io) => io.title === autocompleteValue);

    const payload = {
      nodeId,
      workflowId,
      flowStepId,
      rootNodeId,
      originalId: autocompleteValue && existingIO.id,
      ...formValues,
    };

    await dispatch(createIO(payload)).then(async (data) => {
      const { inputOutput } = data.payload;

      try {
        if (associatedObject === ASSOCIATED_OBJECT_TYPES.workflow) {
          const initialInputIds = [...currentInitialInputIds, inputOutput.id] || [inputOutput.id];

          await dispatch(updateWorkflowInitialInputs({
            nodeId,
            id: workflowId,
            initialInputIds,
          }));
        }

        if (associatedObject === ASSOCIATED_OBJECT_TYPES.flowStep) {
          const outputIdsByNodeId = { ...currentFlowStepOutputs } || {};
          const currentOutputIds = outputIdsByNodeId[flowStepOutputNodeId] || [];

          outputIdsByNodeId[flowStepOutputNodeId] = [...currentOutputIds];
          outputIdsByNodeId[flowStepOutputNodeId].push(inputOutput.id);

          await dispatch(updateFlowStepOutputs({
            nodeId: flowStepNodeId,
            workflowId,
            flowId,
            id: flowStepId,
            outputIdsByNodeId,
          }));
        }
      } catch (e) {
        dispatch(setAlert({
          isOpen: true,
          severity: 'error',
          message: 'Failed to add output',
        }));

        console.error(e);
      }
    });

    setTimeout(() => setLoading(false), 500);

    onClose();
  };

  return {
    onSubmit,
    loading,
  };
}
