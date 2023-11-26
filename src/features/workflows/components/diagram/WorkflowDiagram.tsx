import StartStep from './StartStep';
import WorkflowSteps from './workflow-steps/WorkflowSteps';
import Transformable from '../../../../common/components/Transformable';
import { NodecosmosDispatch } from '../../../../store';
import { selectFlowStepsByWorkflowId } from '../../../flow-steps/flowSteps.selectors';
import { selectFlowsByWorkflowId } from '../../../flows/flows.selectors';
import { selectIOByWorkflowId } from '../../../input-outputs/inputOutputs.selectors';
import { useDiagramContextCreator } from '../../hooks/diagram/useDiagramContext';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { selectWorkflowScale } from '../../selectors';
import { rebuildWorkflowDiagram } from '../../slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorkflowDiagram() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        id, initialInputIds, transformableId,
    } = useWorkflowContext();

    const wfScale = useSelector(selectWorkflowScale);

    const flows = useSelector(selectFlowsByWorkflowId(id));
    const flowSteps = useSelector(selectFlowStepsByWorkflowId(id));
    const inputOutputs = useSelector(selectIOByWorkflowId(id));

    useEffect(() => {
        if (id) {
            dispatch(rebuildWorkflowDiagram({ id, data: { initialInputIds, flows, flowSteps, inputOutputs } }));
        }
    }, [dispatch, id, initialInputIds, flows, flowSteps, inputOutputs]);

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
                <StartStep />
                <WorkflowSteps />
            </DiagramContext.Provider>
        </Transformable>
    );
}
