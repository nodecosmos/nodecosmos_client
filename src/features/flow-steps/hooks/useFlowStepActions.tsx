import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, Strict } from '../../../types';
import { keepFlowStep, restoreFlowStep } from '../../branch/branches.thunks';
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
        flowStepPrimaryKey, stepIndex, nextStepIndex,
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

        let newstepIndex;

        if (stepIndex && nextStepIndex) {
            newstepIndex = Decimal.div(Decimal.add(stepIndex, nextStepIndex), 2);
        } else if (stepIndex) {
            newstepIndex = Decimal.add(stepIndex, 1);
        } else {
            newstepIndex = new Decimal(0);
        }

        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
            branchId: flowStepPrimaryKey.branchId,
            flowId: flowStepPrimaryKey.flowId,
            stepIndex: newstepIndex,
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
        dispatch, stepIndex, flowStepPrimaryKey, handleServerError, nextStepIndex,
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

    const restoreFlowStepCb = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        dispatch(restoreFlowStep({
            branchId: flowStepPrimaryKey.branchId,
            objectId: flowStepPrimaryKey.id,
        }));
    }, [dispatch, flowStepPrimaryKey]);

    return {
        createLoading,
        createNextFlowStep,
        deleteFlowStep: deleteFlowStepCb,
        keepFlowStep: keepFlowStepCb,
        restoreFlowStep: restoreFlowStepCb,
    };
}
