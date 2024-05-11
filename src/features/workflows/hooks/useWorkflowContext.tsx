import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import { selectWorkflow, selectWorkflowScale } from '../workflow.selectors';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface WorkflowContextType {
    insidePane: boolean;
    nodeId: UUID;
    branchId: UUID;
    inputsAdditionActive: boolean;
    activateInputsAddition: () => void;
    deactivateInputsAddition: () => void;
    selectedInputs: Set<UUID>;
    setSelectedInputs: React.Dispatch<React.SetStateAction<Set<UUID>>>;
}

const WorkflowContext = React.createContext<WorkflowContextType>({} as WorkflowContextType);

type WorkflowContextProviderProps = Pick<WorkflowContextType, 'insidePane' | 'nodeId' | 'branchId'>;

export function useWorkflowContextCreator({
    insidePane, nodeId, branchId,
}: WorkflowContextProviderProps) {
    const [inputsAdditionActive, activateInputsAddition, deactivateInputsAddition] = useBooleanStateValue();
    const [selectedInputs, setSelectedInputs] = React.useState<Set<UUID>>(new Set<UUID>());

    useEffect(() => {
        if (!inputsAdditionActive) {
            setSelectedInputs(new Set<UUID>());
        }
    }, [inputsAdditionActive]);

    const contextProviderValue = useMemo(() => ({
        insidePane,
        nodeId,
        branchId,
        inputsAdditionActive,
        activateInputsAddition,
        deactivateInputsAddition,
        selectedInputs,
        setSelectedInputs,
    }),
    [
        insidePane, nodeId, branchId,
        inputsAdditionActive, activateInputsAddition, deactivateInputsAddition,
        selectedInputs,
    ]);

    return {
        WorkflowContext,
        contextProviderValue,
    };
}

export default function useWorkflowContext() {
    const {
        insidePane,
        nodeId,
        branchId,
        inputsAdditionActive,
        activateInputsAddition,
        deactivateInputsAddition,
        selectedInputs,
        setSelectedInputs,
    } = React.useContext(WorkflowContext);

    if (insidePane === undefined) {
        throw new Error('useWorkflowContext must be used within a WorkflowContext.Provider');
    }

    const {
        rootId,
        title,
        initialInputIds,
    } = useSelector(selectWorkflow(branchId, nodeId));

    const transformableId = `WF_${insidePane}_${nodeId}`;
    const scale = useSelector(selectWorkflowScale);

    return {
        insidePane,
        nodeId,
        branchId,
        rootId,
        title,
        initialInputIds,
        transformableId,
        scale,
        inputsAdditionActive,
        activateInputsAddition,
        deactivateInputsAddition,
        selectedInputs,
        setSelectedInputs,
    };
}
