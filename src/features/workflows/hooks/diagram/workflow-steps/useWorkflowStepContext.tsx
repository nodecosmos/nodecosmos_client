import { groupById } from '../../../../../utils/group';
import { WorkflowStep } from '../../../diagram/types';
import useDiagramContext from '../useDiagramContext';
import React, { useContext, useMemo } from 'react';

interface WorkflowStepContextValue {
    wfStep: WorkflowStep;
    wfStepIndex: number;
    hovered: boolean;
}

const WorkflowStepContext = React.createContext({} as WorkflowStepContextValue);

export function useWorkflowStepContextCreator({
    wfStep, wfStepIndex, hovered,
}: WorkflowStepContextValue) {
    const contextProviderValue = useMemo(() => ({
        wfStep,
        wfStepIndex,
        hovered, 
    }), [hovered, wfStep, wfStepIndex]);

    return {
        WorkflowStepContext,
        contextProviderValue,
    };
}

export default function useWorkflowStepContext() {
    const {
        wfStep, wfStepIndex, hovered,
    } = useContext(WorkflowStepContext);

    const diagram = useDiagramContext();

    let prevStepOutputsById: WorkflowStep['outputsById'];

    if (wfStepIndex > 0) {
        const prevStep = diagram.workflowSteps[wfStepIndex - 1];
        prevStepOutputsById = prevStep.outputsById;
    } else {
        prevStepOutputsById = groupById(diagram.initialInputs);
    }

    return {
        wfStep,
        wfStepIndex,
        hovered,
        prevStepOutputsById,
    };
}
