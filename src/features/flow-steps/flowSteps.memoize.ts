import { defaultMemoize } from 'reselect';
import { UUID } from '../../types';
import { FlowStep } from './types';

type FlowStepsByFlowId = Record<UUID, FlowStep[]>;

export const groupFlowStepsByFlowId = defaultMemoize((flowSteps: FlowStep[]): FlowStepsByFlowId => {
    const flowStepsByFlowId: Record<UUID, FlowStep[]> = {};

    flowSteps.reduce((acc: Record<UUID, FlowStep[]>, flowStep: FlowStep) => {
        acc[flowStep.flowId] ||= [];
        acc[flowStep.flowId].push(flowStep);
        return acc;
    }, flowStepsByFlowId);

    return flowStepsByFlowId;
});
