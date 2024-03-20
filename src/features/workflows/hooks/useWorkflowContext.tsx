import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import { WorkflowDiagramContext } from '../constants';
import { selectWorkflow, selectWorkflowScale } from '../workflow.selectors';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface WorkflowContextType {
    context: WorkflowDiagramContext;
    id: UUID;
    nodeId: UUID;
    branchId: UUID;
    inputsAdditionActive: boolean;
    activateInputsAddition: () => void;
    deactivateInputsAddition: () => void;
    selectedInputs: Set<UUID>;
    setSelectedInputs: React.Dispatch<React.SetStateAction<Set<UUID>>>;
}

const WorkflowContext = React.createContext<WorkflowContextType>({} as WorkflowContextType);

type WorkflowContextProviderProps = Pick<WorkflowContextType, 'context' | 'id' | 'nodeId' | 'branchId'>;

export function useWorkflowContextCreator({
    context, id, nodeId, branchId,
}: WorkflowContextProviderProps) {
    const [inputsAdditionActive, activateInputsAddition, deactivateInputsAddition] = useBooleanStateValue();
    const [selectedInputs, setSelectedInputs] = React.useState<Set<UUID>>(new Set<UUID>());

    useEffect(() => {
        if (!inputsAdditionActive) {
            setSelectedInputs(new Set<UUID>());
        }
    }, [inputsAdditionActive]);

    const contextProviderValue = useMemo(() => ({
        context,
        id,
        nodeId,
        branchId,
        inputsAdditionActive,
        activateInputsAddition,
        deactivateInputsAddition,
        selectedInputs,
        setSelectedInputs,
    }),
    [
        context, id, nodeId, branchId,
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
        context,
        id,
        nodeId,
        branchId,
        inputsAdditionActive,
        activateInputsAddition,
        deactivateInputsAddition,
        selectedInputs,
        setSelectedInputs,
    } = React.useContext(WorkflowContext);

    if (context === undefined) {
        throw new Error('useWorkflowContext must be used within a WorkflowContext.Provider');
    }

    const {
        rootNodeId,
        title,
        initialInputIds,
    } = useSelector(selectWorkflow(branchId, id));

    const transformableId = `WF_${context}_${id}`;
    const scale = useSelector(selectWorkflowScale);

    return {
        context,
        id,
        nodeId,
        branchId,
        rootNodeId,
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
