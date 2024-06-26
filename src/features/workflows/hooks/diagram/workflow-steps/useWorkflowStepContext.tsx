import { UUID } from '../../../../../types';
import { WorkflowStep } from '../../../diagram/diagram.types';
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

    return useMemo(() => ({
        WorkflowStepContext,
        contextProviderValue,
    }), [contextProviderValue]);
}

export default function useWorkflowStepContext() {
    const {
        wfStep, wfStepIndex, hovered,
    } = useContext(WorkflowStepContext);
    const diagram = useDiagramContext();

    return useMemo(() => {
        let prevStepOutputIds: WorkflowStep['outputIds'];

        if (wfStepIndex > 0) {
            const prevStep = diagram.workflowSteps[wfStepIndex - 1];
            prevStepOutputIds = prevStep.outputIds;
        } else {
            prevStepOutputIds = new Set<UUID>(diagram.initialInputs.map((input) => input.id));
        }

        return {
            wfStep,
            wfStepIndex,
            hovered,
            prevStepOutputIds,
        };
    }, [hovered, diagram, wfStep, wfStepIndex]);
}
