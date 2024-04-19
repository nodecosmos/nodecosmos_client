import useWorkflowContext from './useWorkflowContext';
import { UUID } from '../../../types';
import { selectBranch } from '../../branch/branches.selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export interface WorkflowBranchChanges {
    isFlowCreated(flowId: UUID): boolean;
    isFlowDeleted(flowId: UUID): boolean;
    isFlowTitleEdited(flowId: UUID): boolean;
    isFlowDescriptionEdited(flowId: UUID): boolean;
    isFlowStepCreated(flowStepId: UUID): boolean;
    isFlowStepDeleted(flowStepId: UUID): boolean;
    isFlowStepNodeCreated(flowStepId: UUID, nodeId: UUID): boolean;
    isFlowStepNodeDeleted(flowStepId: UUID, nodeId: UUID): boolean;
    isFlowStepInputCreated(flowStepId: UUID, nodeId: UUID, inputId: UUID): boolean;
    isFlowStepInputDeleted(flowStepId: UUID, nodeId: UUID, inputId: UUID): boolean;
    isFlowStepOutputCreated(flowStepId: UUID, nodeId: UUID, outputId: UUID): boolean;
    isFlowStepOutputDeleted(flowStepId: UUID, nodeId: UUID, outputId: UUID): boolean;
    isIoCreated(ioId: UUID): boolean;
    isIoDeleted(ioId: UUID): boolean;
    isIoTitleEdited(ioId: UUID): boolean;
    isIoDescriptionEdited(ioId: UUID): boolean;
    // conflicts
    isFlowDeletedConflict(flowId: UUID): boolean;
    isFlowStepInConflict(flowStepId: UUID): boolean;
    isFlowStepDeletedConflict(flowStepId: UUID): boolean;
}

export default function useWorkflowBranch(): WorkflowBranchChanges {
    const { branchId } = useWorkflowContext();

    const branch = useSelector(selectBranch(branchId));
    // const conflict = useSelector(selectConflict(branchId));
    const {
        createdFlows,
        deletedFlows,
        editedTitleFlows,
        editedDescriptionFlows,
        createdIos,
        deletedIos,
        editedTitleIos,
        editedDescriptionIos,
        createdFlowSteps,
        deletedFlowSteps,
        createdFlowStepInputsByNode,
        deletedFlowStepInputsByNode,
        createdFlowStepOutputsByNode,
        deletedFlowStepOutputsByNode,
        createdFlowStepNodes,
        deletedFlowStepNodes,
        conflict,
    } = branch ?? {};

    const isFlowCreated = useCallback((flowId: UUID) => createdFlows.has(flowId), [createdFlows]);

    const isFlowDeleted = useCallback((flowId: UUID) => deletedFlows.has(flowId), [deletedFlows]);

    const isFlowTitleEdited = useCallback((flowId: UUID) => editedTitleFlows.has(flowId), [editedTitleFlows]);

    const isFlowDescriptionEdited = useCallback(
        (flowId: UUID) => editedDescriptionFlows.has(flowId), [editedDescriptionFlows],
    );

    const isFlowStepCreated = useCallback((flowStepId: UUID) => createdFlowSteps.has(flowStepId), [createdFlowSteps]);

    const isFlowStepDeleted = useCallback((flowStepId: UUID) => deletedFlowSteps.has(flowStepId), [deletedFlowSteps]);

    const isFlowStepNodeCreated = useCallback((flowStepId: UUID, nodeId: UUID) => {
        return createdFlowStepNodes?.[flowStepId]?.has(nodeId) ?? false;
    }, [createdFlowStepNodes]);

    const isFlowStepNodeDeleted = useCallback((flowStepId: UUID, nodeId: UUID) => {
        return deletedFlowStepNodes?.[flowStepId]?.has(nodeId) ?? false;
    }, [deletedFlowStepNodes]);

    const isFlowStepInputCreated = useCallback((flowStepId: UUID, nodeId: UUID, inputId: UUID) => {
        return createdFlowStepInputsByNode?.[flowStepId]?.[nodeId]?.has(inputId) ?? false;
    }, [createdFlowStepInputsByNode]);

    const isFlowStepInputDeleted = useCallback((flowStepId: UUID, nodeId: UUID, inputId: UUID) => {
        return deletedFlowStepInputsByNode?.[flowStepId]?.[nodeId]?.has(inputId) ?? false;
    }, [deletedFlowStepInputsByNode]);

    const isFlowStepOutputCreated = useCallback((flowStepId: UUID, nodeId: UUID, outputId: UUID) => {
        return createdFlowStepOutputsByNode?.[flowStepId]?.[nodeId]?.has(outputId) ?? false;
    }, [createdFlowStepOutputsByNode]);

    const isFlowStepOutputDeleted = useCallback((flowStepId: UUID, nodeId: UUID, outputId: UUID) => {
        return deletedFlowStepOutputsByNode?.[flowStepId]?.[nodeId]?.has(outputId) ?? false;
    }, [deletedFlowStepOutputsByNode]);

    const isIoCreated = useCallback((ioId: UUID) => createdIos.has(ioId), [createdIos]);

    const isIoDeleted = useCallback((ioId: UUID) => deletedIos.has(ioId), [deletedIos]);

    const isIoTitleEdited = useCallback((ioId: UUID) => editedTitleIos.has(ioId), [editedTitleIos]);

    const isIoDescriptionEdited = useCallback((ioId: UUID) => editedDescriptionIos.has(ioId), [editedDescriptionIos]);

    const isFlowDeletedConflict = useCallback((flowId: UUID) => {
        return conflict?.deletedEditedFlows?.has(flowId) ?? false;
    }, [conflict]);

    const isFlowStepDeletedConflict = useCallback((flowStepId: UUID) => {
        return conflict?.deletedEditedFlowSteps?.has(flowStepId) ?? false;
    }, [conflict]);

    // original flow step with same index exist
    const isFlowStepInConflict = useCallback((flowStepId: UUID) => {
        return conflict?.conflictingFlowSteps.has(flowStepId) ?? false;
    }, [conflict]);

    return {
        isFlowCreated,
        isFlowDeleted,
        isFlowTitleEdited,
        isFlowDescriptionEdited,
        isIoCreated,
        isIoDeleted,
        isIoTitleEdited,
        isIoDescriptionEdited,
        isFlowStepCreated,
        isFlowStepDeleted,
        isFlowStepNodeCreated,
        isFlowStepNodeDeleted,
        isFlowStepInputCreated,
        isFlowStepInputDeleted,
        isFlowStepOutputCreated,
        isFlowStepOutputDeleted,
        isFlowDeletedConflict,
        isFlowStepInConflict,
        isFlowStepDeletedConflict,
    };
}
