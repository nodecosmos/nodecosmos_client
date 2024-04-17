import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, Strict } from '../../../types';
import { keepFlowStep } from '../../branch/branches.thunks';
import useFlowStepContext from '../../workflows/hooks/diagram/flow-step/useFlowStepContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { createFlowStep, deleteFlowStep } from '../flowSteps.thunks';
import { FlowStepCreationParams } from '../flowSteps.types';
import Decimal from 'decimal.js';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useFlowStepActions() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { rootId } = useWorkflowContext();

    const {
        flowStepPrimaryKey, flowIndex, nextFlowIndex,
    } = useFlowStepContext();
    const handleServerError = useHandleServerErrorAlert();

    const deleteFlowStepCb = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }
        dispatch(deleteFlowStep({
            ...flowStepPrimaryKey,
            rootId,
        }));
    }, [dispatch, flowStepPrimaryKey, rootId]);

    const [createLoading, setCreateIsLoading, setCreateIsNotLoading] = useBooleanStateValue();

    const createNextFlowStep = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        setCreateIsLoading();

        let newFlowIndex;

        if (flowIndex && nextFlowIndex) {
            newFlowIndex = Decimal.div(Decimal.add(flowIndex, nextFlowIndex), 2);
        } else if (flowIndex) {
            newFlowIndex = Decimal.add(flowIndex, 1);
        } else {
            newFlowIndex = new Decimal(0);
        }

        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
            branchId: flowStepPrimaryKey.branchId,
            flowId: flowStepPrimaryKey.flowId,
            flowIndex: newFlowIndex,
            rootId,
            nodeIds: [],
        };

        try {
            const response = await dispatch(createFlowStep(insertPayload));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                handleServerError(error);
                console.error(error);

                return;
            }
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setCreateIsNotLoading();
        }
    }, [
        dispatch, flowIndex, flowStepPrimaryKey, handleServerError, nextFlowIndex,
        rootId, setCreateIsLoading, setCreateIsNotLoading,
    ]);

    const keepFlowStepCb = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        dispatch(keepFlowStep({
            branchId: flowStepPrimaryKey.branchId,
            objectId: flowStepPrimaryKey.id,
        }));
    }, [dispatch, flowStepPrimaryKey]);

    return {
        createLoading,
        createNextFlowStep,
        deleteFlowStep: deleteFlowStepCb,
        keepFlowStep: keepFlowStepCb,
    };
}
