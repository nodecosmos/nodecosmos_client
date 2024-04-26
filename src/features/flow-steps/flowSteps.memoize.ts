import { FlowStep } from './flowSteps.types';
import { UUID } from '../../types';
import { lruMemoize } from 'reselect';

export const groupFlowStepsByFlowId = lruMemoize((flowSteps: FlowStep[]): Record<UUID, FlowStep[]> => {
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
