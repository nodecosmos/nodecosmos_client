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
    isIoCreated(ioId: UUID): boolean;
    isIoDeleted(ioId: UUID): boolean;
    isIoTitleEdited(ioId: UUID): boolean;
    isIoDescriptionEdited(ioId: UUID): boolean;
    isFlowStepCreated(flowStepId: UUID): boolean;
    isFlowStepDeleted(flowStepId: UUID): boolean;
    isFlowStepNodeCreated(flowStepId: UUID, nodeId: UUID): boolean;
    isFlowStepNodeDeleted(flowStepId: UUID, nodeId: UUID): boolean;
    isFlowStepInputCreated(flowStepId: UUID, nodeId: UUID, inputId: UUID): boolean;
    isFlowStepInputDeleted(flowStepId: UUID, nodeId: UUID, inputId: UUID): boolean;
    isFlowStepOutputCreated(flowStepId: UUID, nodeId: UUID, outputId: UUID): boolean;
    isFlowStepOutputDeleted(flowStepId: UUID, nodeId: UUID, outputId: UUID): boolean;
}

export default function useWorkflowBranchContext(): WorkflowBranchChanges {
    const { branchId } = useWorkflowContext();

    const branch = useSelector(selectBranch(branchId));
    // const conflict = useSelector(selectConflict(branchId));
    const {
        createdFlows,
        deletedFlows,
        editedFlowTitles,
        editedFlowDescriptions,
        createdIOs,
        deletedIOs,
        editedIOTitles,
        editedIODescriptions,
        createdFlowSteps,
        deletedFlowSteps,
        createdFlowStepInputsByNode,
        deletedFlowStepInputsByNode,
        createdFlowStepOutputsByNode,
        deletedFlowStepOutputsByNode,
        createdFlowStepNodes,
        deletedFlowStepNodes,
    } = branch ?? {};

    const isFlowCreated = useCallback((flowId: UUID) => createdFlows.has(flowId), [createdFlows]);
    const isFlowDeleted = useCallback((flowId: UUID) => deletedFlows.has(flowId), [deletedFlows]);
    const isFlowTitleEdited = useCallback((flowId: UUID) => editedFlowTitles.has(flowId), [editedFlowTitles]);
    const isFlowDescriptionEdited = useCallback(
        (flowId: UUID) => editedFlowDescriptions.has(flowId), [editedFlowDescriptions],
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
    const isIoCreated = useCallback((ioId: UUID) => createdIOs.has(ioId), [createdIOs]);
    const isIoDeleted = useCallback((ioId: UUID) => deletedIOs.has(ioId), [deletedIOs]);
    const isIoTitleEdited = useCallback((ioId: UUID) => editedIOTitles.has(ioId), [editedIOTitles]);
    const isIoDescriptionEdited = useCallback((ioId: UUID) => editedIODescriptions.has(ioId), [editedIODescriptions]);

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
    };
}
