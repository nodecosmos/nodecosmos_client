import StartStep from './StartStep';
import WorkflowSteps from './workflow-steps/WorkflowSteps';
import WorkflowStepCells from './workflow-steps/WorkflowStepsCells';
import Transformable from '../../../../common/components/Transformable';
import { NodecosmosDispatch } from '../../../../store';
import { selectFlowStepsByWorkflowId } from '../../../flow-steps/flowSteps.selectors';
import { selectFlowsByWorkflowId } from '../../../flows/flows.selectors';
import { selectIoByWorkflowId } from '../../../input-outputs/inputOutputs.selectors';
import { useDiagramContextCreator } from '../../hooks/diagram/useDiagramContext';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { selectWorkflowScale } from '../../workflow.selectors';
import { rebuildWorkflowDiagram } from '../../workflowsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorkflowDiagram() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId, id, initialInputIds, transformableId,
    } = useWorkflowContext();

    const wfScale = useSelector(selectWorkflowScale);

    const flows = useSelector(selectFlowsByWorkflowId(branchId, id));
    const flowSteps = useSelector(selectFlowStepsByWorkflowId(branchId, id));
    const inputOutputs = useSelector(selectIoByWorkflowId(branchId, id));

    useEffect(() => {
        if (id) {
            dispatch(rebuildWorkflowDiagram({
                id,
                branchId,
                data: {
                    initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                },
            }));
        }
    }, [dispatch, id, initialInputIds, flows, flowSteps, inputOutputs, branchId]);

    const {
        DiagramContext,
        contextProviderValue,
    } = useDiagramContextCreator({ id });

    if (!id) return null;

    return (
        <Transformable
            transformableId={transformableId}
            scale={wfScale}
            heightMargin={-19}
        >
            <DiagramContext.Provider value={contextProviderValue}>
                <WorkflowStepCells />
                <StartStep />
                <WorkflowSteps />
            </DiagramContext.Provider>
        </Transformable>
    );
}
