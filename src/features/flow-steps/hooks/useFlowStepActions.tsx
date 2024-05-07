import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import {
    NodecosmosError, ObjectType, Strict,
} from '../../../types';
import { selectObject } from '../../app/app.thunks';
import {
    keepFlowStep, restoreFlowStep, undoDeleteFlowStep,
} from '../../branch/branches.thunks';
import useBranchParams from '../../branch/hooks/useBranchParams';
import useFlowActions from '../../flows/hooks/useFlowActions';
import useFlowStepContext from '../../workflows/hooks/diagram/flow-step/useFlowStepContext';
import useWorkflowBranch from '../../workflows/hooks/useWorkflowBranch';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { createFlowStep, deleteFlowStep } from '../flowSteps.thunks';
import { FlowStepCreationParams } from '../flowSteps.types';
import Decimal from 'decimal.js';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    unhover?: () => void;
}

export default function useFlowStepActions(props?: Props) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isFlowDeleted } = useWorkflowBranch();
    const { rootId, inputsAdditionActive } = useWorkflowContext();
    const { originalId, branchId } = useBranchParams();
    const {
        flowStepPrimaryKey, stepIndex, nextStepIndex,
    } = useFlowStepContext();
    const { handleFlowClick } = useFlowActions();
    const handleServerError = useHandleServerErrorAlert();

    const deleteFlowStepCb = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }
        await dispatch(deleteFlowStep({
            ...flowStepPrimaryKey,
            rootId,
        }));
    }, [dispatch, flowStepPrimaryKey, rootId]);

    const [createLoading, setCreateIsLoading, setCreateIsNotLoading] = useBooleanStateValue();

    const handleFlowStepClick = useCallback((event: React.MouseEvent<SVGGElement | HTMLElement>) => {
        if (inputsAdditionActive) return;

        if (!props?.unhover) {
            throw new Error('Unhover callback is not provided');
        }

        const isRect = event.target instanceof SVGRectElement;
        /**
         * @description We want to have clickable area as big as Flow Step, but we need to exclude elements
         * that are clickable within Flow Step, and modals that are rendered within Flow Step.
         */
        if (!isRect) {
            if (
                event.target instanceof HTMLButtonElement
                || event.target instanceof HTMLInputElement
                || event.target instanceof HTMLParagraphElement
                || event.target instanceof HTMLLIElement
                || event.target instanceof HTMLUListElement
                || event.target instanceof HTMLHeadingElement
                || event.target instanceof HTMLSpanElement
                || event.target instanceof HTMLFieldSetElement
                || event.target instanceof SVGElement
            ) return;

            // html elements that are rendered within modals
            if (event.target instanceof HTMLElement) {
                if (
                    event.currentTarget.classList.contains('FlowToolbarClick')
                    || event.target.classList.contains('FlowToolbar')
                    || event.target.classList.contains('MuiDialogContent-root')
                    || event.target.classList.contains('MuiDialog-container')
                    || event.target.classList.contains('MuiInputBase-root')

                ) return;
            }
        }

        if (!flowStepPrimaryKey || isFlowDeleted(flowStepPrimaryKey.flowId)) {
            handleFlowClick();

            return;
        }

        props.unhover();

        dispatch(selectObject({
            originalId,
            branchId,
            objectNodeId: flowStepPrimaryKey.nodeId,
            objectId: flowStepPrimaryKey.id,
            objectType: ObjectType.FlowStep,
        }));
    },
    [
        inputsAdditionActive, props, flowStepPrimaryKey,
        isFlowDeleted, dispatch, originalId, branchId, handleFlowClick,
    ]);

    const createNextFlowStep = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        setCreateIsLoading();

        let newStepIndex;

        if (stepIndex && nextStepIndex) {
            newStepIndex = Decimal.div(Decimal.add(stepIndex, nextStepIndex), 2);
        } else if (stepIndex) {
            newStepIndex = Decimal.add(stepIndex, 1);
        } else {
            newStepIndex = new Decimal(0);
        }

        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
            branchId: flowStepPrimaryKey.branchId,
            flowId: flowStepPrimaryKey.flowId,
            stepIndex: newStepIndex,
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

    const undoDeleteFlowStepCb = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        dispatch(undoDeleteFlowStep({
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
        handleFlowStepClick,
        undoDeleteFlowStep: undoDeleteFlowStepCb,
    };
}
