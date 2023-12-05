import {
    FlowStep, FlowStepsByFlowId, FlowStepsById, 
} from './types';
import { UUID } from '../../types';
import { lruMemoize } from 'reselect';

export const groupFlowStepsByFlowId = lruMemoize((flowSteps: FlowStep[]): FlowStepsByFlowId => {
    const flowStepsByFlowId: Record<UUID, FlowStep[]> = {};

    flowSteps.reduce((acc: Record<UUID, FlowStep[]>, flowStep: FlowStep) => {
        acc[flowStep.flowId] ||= [];

        flowStep.inputIdsByNodeId ||= {};
        flowStep.outputIdsByNodeId ||= {};

        acc[flowStep.flowId].push(flowStep);
        return acc;
    }, flowStepsByFlowId);

    return flowStepsByFlowId;
});

export const groupFlowStepsById = lruMemoize((flowSteps: FlowStep[]): FlowStepsById => {
    const flowStepsById: Record<UUID, FlowStep> = {};

    flowSteps.forEach((flowStep) => {
        flowStepsById[flowStep.id] = flowStep;
    });

    return flowStepsById;
});
