import StartStep from './StartStep';
import WorkflowSteps from './workflow-steps/WorkflowSteps';
import WorkflowStepCells from './workflow-steps/WorkflowStepsCells';
import Transformable from '../../../../common/components/Transformable';
import { NodecosmosDispatch } from '../../../../store';
import { selectFlowStepsByNodeId } from '../../../flow-steps/flowSteps.selectors';
import { selectFlowsByNodeId } from '../../../flows/flows.selectors';
import { selectIoByNodeId } from '../../../input-outputs/inputOutputs.selectors';
import { useDiagramContextCreator } from '../../hooks/diagram/useDiagramContext';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { selectWorkflowScale } from '../../workflow.selectors';
import { rebuildWorkflowDiagram } from '../../workflowsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorkflowDiagram() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId, nodeId, initialInputIds,
    } = useWorkflowContext();

    const wfScale = useSelector(selectWorkflowScale);

    const flows = useSelector(selectFlowsByNodeId(branchId, nodeId));
    const flowSteps = useSelector(selectFlowStepsByNodeId(branchId, nodeId));
    const inputOutputs = useSelector(selectIoByNodeId(branchId, nodeId));

    useEffect(() => {
        if (nodeId) {
            dispatch(rebuildWorkflowDiagram({
                nodeId,
                branchId,
                data: {
                    initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                },
            }));
        }
    }, [dispatch, nodeId, initialInputIds, flows, flowSteps, inputOutputs, branchId]);

    const {
        DiagramContext,
        contextProviderValue,
    } = useDiagramContextCreator({ nodeId });

    if (!nodeId) return null;

    return (
        <Transformable scale={wfScale} heightMargin={-19}>
            <DiagramContext.Provider value={contextProviderValue}>
                <WorkflowStepCells />
                <StartStep />
                <WorkflowSteps />
            </DiagramContext.Provider>
        </Transformable>
    );
}
