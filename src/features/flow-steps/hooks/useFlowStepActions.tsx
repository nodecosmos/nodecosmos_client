import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import {
    NodecosmosError, ObjectType, Strict,
} from '../../../types';
import { setAlert } from '../../app/appSlice';
import { useSelectObject } from '../../app/hooks/useSelectObject';
import {
    keepFlowStep, restoreFlowStep, undoDeleteFlowStep,
} from '../../branch/branches.thunks';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useFlowActions from '../../flows/hooks/useFlowActions';
import useAuthorizeNodeAction from '../../nodes/hooks/node/useAuthorizeNodeAction';
import useFlowStepContext from '../../workflows/hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../workflows/hooks/diagram/flows/useFlowContext';
import useWorkflowStepContext from '../../workflows/hooks/diagram/workflow-steps/useWorkflowStepContext';
import useWorkflowBranch from '../../workflows/hooks/useWorkflowBranch';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { createFlowStep, deleteFlowStep } from '../flowSteps.thunks';
import { FlowStepCreationParams } from '../flowSteps.types';
import Decimal from 'decimal.js';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    unhover?: () => void;
}

export default function useFlowStepActions(props?: Props) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isFlowDeleted } = useWorkflowBranch();
    const {
        rootId, inputsAdditionActive, insidePane, deactivateInputsAddition,
    } = useWorkflowContext();
    const { startIndex: flowStartIndex } = useFlowContext();
    const { wfStepIndex } = useWorkflowStepContext();
    const { originalId, branchId } = useBranchContext();
    const {
        flowStepPrimaryKey, stepIndex, nextStepIndex, flowId,
    } = useFlowStepContext();
    const { handleFlowClick } = useFlowActions();
    const handleServerError = useHandleServerErrorAlert();
    const authorizeNodeAction = useAuthorizeNodeAction();

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
    const selectObject = useSelectObject();

    const handleFlowStepClick = useCallback((event: React.MouseEvent<SVGGElement | HTMLElement>) => {
        if (inputsAdditionActive) {
            event.stopPropagation();
            event.preventDefault();

            // dispatch(setAlert({
            //     isOpen: true,
            //     severity: 'warning',
            //     message: 'Cannot select workflow object while adding inputs. Please finish adding inputs first.',
            //     duration: 5000,
            //
            // }));

            deactivateInputsAddition();

            // return;
        }

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
                || event.target instanceof HTMLFormElement
                || event.target instanceof HTMLLabelElement
                || event.target instanceof SVGElement
            ) return;

            // html elements that are rendered within modals
            if (event.target instanceof HTMLElement) {
                if (
                    event.currentTarget.classList.contains('FlowToolbarClick')
                    || event.target.classList.contains('no-io-close')
                    || event.target.classList.contains('FlowToolbar')
                    || event.target.classList.contains('MuiDialogContent-root')
                    || event.target.classList.contains('MuiDialogActions-root')
                    || event.target.classList.contains('MuiDialog-container')
                    || event.target.classList.contains('MuiFormControl-root')
                    || event.target.classList.contains('MuiInputBase-root')

                ) return;
            }
        }

        if (!flowStepPrimaryKey || isFlowDeleted(flowStepPrimaryKey.flowId)) {
            handleFlowClick();

            return;
        }

        props.unhover();

        if (insidePane) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Cannot select workflow object in the pane for now. Please use node\'s workflow page.',
                duration: 5000,
            }));

            return;
        }

        selectObject({
            originalId,
            branchId,
            objectNodeId: flowStepPrimaryKey.nodeId,
            objectId: flowStepPrimaryKey.id,
            objectType: ObjectType.FlowStep,
            metadata: {
                flowId,
                flowStepIndex: wfStepIndex - flowStartIndex + 1,
            },
        });
    },
    [
        inputsAdditionActive, deactivateInputsAddition, props, flowStepPrimaryKey, isFlowDeleted, insidePane,
        dispatch, originalId, branchId, handleFlowClick, selectObject, flowId, flowStartIndex, wfStepIndex,
    ]);

    const createNextFlowStep = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        if (!authorizeNodeAction()) return;

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
    },
    [
        dispatch, stepIndex, flowStepPrimaryKey, handleServerError, nextStepIndex,
        rootId, setCreateIsLoading, setCreateIsNotLoading, authorizeNodeAction,
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

    return useMemo(() => ({
        createLoading,
        createNextFlowStep,
        deleteFlowStep: deleteFlowStepCb,
        keepFlowStep: keepFlowStepCb,
        restoreFlowStep: restoreFlowStepCb,
        handleFlowStepClick,
        undoDeleteFlowStep: undoDeleteFlowStepCb,
    }), [
        createLoading,
        createNextFlowStep,
        deleteFlowStepCb,
        handleFlowStepClick,
        keepFlowStepCb,
        restoreFlowStepCb,
        undoDeleteFlowStepCb,
    ]);
}
