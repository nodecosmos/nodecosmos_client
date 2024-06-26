import { Position, UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { maybeSelectNode } from '../../../../nodes/nodes.selectors';
import { FlowStepNode } from '../../../diagram/diagram.types';
import useWorkflowContext from '../../useWorkflowContext';
import useFlowStepContext from '../flow-step/useFlowStepContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowStepNodeContextValue {
    id: UUID,
    flowStepNode?: FlowStepNode,
}

const FlowStepNodeContext = React.createContext({} as FlowStepNodeContextValue);

export function useFlowStepNodeContextCreator(val: FlowStepNodeContextValue) {
    const { id, flowStepNode } = val;

    const flowStepContextValue = useMemo(() => ({
        id,
        flowStepNode,
    }), [id, flowStepNode]);

    return useMemo(() => ({
        FlowStepNodeContext,
        flowStepContextValue,
    }), [flowStepContextValue]);
}

export default function useFlowStepNodeContext() {
    const { id, flowStepNode } = useContext(FlowStepNodeContext);
    const selectedObject = useSelector(selectSelectedObject);
    const { branchId } = useWorkflowContext();
    const { id: flowStepId } = useFlowStepContext();
    const fsNode = useSelector(maybeSelectNode(branchId, id));
    const title = fsNode?.title || 'deleted node';
    const position = useMemo(() => flowStepNode?.position || {} as Position, [flowStepNode?.position]);
    const inputIds = useMemo(() => flowStepNode?.inputIds || [], [flowStepNode?.inputIds]);
    const outputs = useMemo(() => flowStepNode?.outputs || [], [flowStepNode?.outputs]);
    const isSelected = useMemo(() => (
        selectedObject?.objectId === id
        && selectedObject.metadata?.flowStepId === flowStepId
    ), [flowStepId, id, selectedObject]);

    return useMemo(() => ({
        branchId,
        id,
        flowStepId,
        title,
        inputIds,
        position,
        outputs,
        isSelected,
    }), [branchId, id, flowStepId, title, inputIds, position, outputs, isSelected]);
}
