import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType, UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { setAlert } from '../../../../app/appSlice';
import { selectBranch } from '../../../../branch/branches.selectors';
import { maybeSelectFlowStep } from '../../../../flow-steps/flowSteps.selectors';
import { updateFlowStepInputs } from '../../../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../useWorkflowContext';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook to handle the change of inputs for a flow step node. It takes flow step from `selectSelectedWorkflowObject` and
 * it uses it to update the inputs of the flow step.
 * Inputs are added to `Workflow
 */
export default function useInputsChange() {
    const selectedObject = useSelector(selectSelectedObject);
    const { branchId, rootId } = useWorkflowContext();

    const flowStep = useSelector(maybeSelectFlowStep(branchId, selectedObject?.metadata?.flowStepId));
    const dispatch: NodecosmosDispatch = useDispatch();
    const branch = useSelector(selectBranch(branchId));
    const { deletedFlowStepInputsByNode } = useMemo(() => (branch ?? {}), [branch]);

    return useCallback(async (selectedInputs: UUID[]) => {
        if (!selectedObject) {
            throw new Error('Selected object is not found');
        }

        const { objectId, objectType } = selectedObject;

        if (objectType !== ObjectType.Node) {
            throw new Error('Selected object is not a node');
        }

        if (!flowStep) {
            throw new Error('Flow step primary key not found');
        }

        const flowStepPrimaryKey = {
            nodeId: flowStep.nodeId,
            branchId,
            flowId: flowStep.flowId,
            stepIndex: flowStep.stepIndex,
            id: flowStep.id,
        };

        try {
            const inputIdsByNodeId = { ...flowStep.inputIdsByNodeId };
            const deletedInputs = deletedFlowStepInputsByNode[flowStep.id];
            if (deletedInputs) {
                for (const nodeId in deletedInputs) {
                    const deletedInputIds = deletedInputs[nodeId];
                    inputIdsByNodeId[nodeId] = inputIdsByNodeId[nodeId].filter(
                        (inputId) => !deletedInputIds.has(inputId),
                    );
                }
            }

            inputIdsByNodeId[objectId] = selectedInputs;

            await dispatch(updateFlowStepInputs({
                ...flowStepPrimaryKey,
                rootId,
                inputIdsByNodeId,
            }));
        } catch (e) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to add output',
            }));

            console.error(e);
        }
    }, [branchId, deletedFlowStepInputsByNode, dispatch, flowStep, rootId, selectedObject]);
}
