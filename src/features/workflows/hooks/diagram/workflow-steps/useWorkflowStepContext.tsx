import React, { useContext, useMemo } from 'react';
import { WorkflowStep } from '../../../types';

interface WorkflowStepContextValue {
    wfStep: WorkflowStep;
    wfStepIndex: number;
    hovered: boolean;
}

const WorkflowStepContext = React.createContext({} as WorkflowStepContextValue);

export function useWorkflowStepContextCreator({
    wfStep, wfStepIndex, hovered, 
}: WorkflowStepContextValue) {
    const contextProviderValue = useMemo(() => ({ wfStep, wfStepIndex, hovered }), [hovered, wfStep, wfStepIndex]);

    return {
        WorkflowStepContext,
        contextProviderValue,
    };
}

export default function useWorkflowStepContext() {
    return useContext(WorkflowStepContext);
}
