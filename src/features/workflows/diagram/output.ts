import { Output } from './diagram.types';
import { FlowStepData } from './flow';
import { calculateInitialIoPosition, calculateIOPosition } from './position';
import { Position, UUID } from '../../../types';
import { FlowStep } from '../../flow-steps/flowSteps.types';

export function buildInitialInputs(initialInputIds: UUID[]): Output[] {
    const outputs: Output[] = [];

    initialInputIds.forEach((inputId: UUID, ioIndex) => {
        outputs.push({
            id: inputId,
            nodeId: null,
            position: calculateInitialIoPosition(ioIndex),
            nodePosition: null,
        });
    });

    return outputs;
}

interface BuildOutputsData {
    flowStep: FlowStep;
    nodePosition: Position;
    nodeId: UUID;
    flowStepData: FlowStepData,
}

export function buildOutputs(data: BuildOutputsData): Output[] {
    const {
        flowStep,
        flowStepData,
        nodeId,
        nodePosition,
    } = data;
    const { IOsById } = flowStepData;

    const outputs: Output[] = [];
    const outputIdsByNodeId = flowStep?.outputIdsByNodeId || {};
    const nodeOutputs = outputIdsByNodeId[nodeId];

    if (nodeOutputs) {
        nodeOutputs.forEach((outputId, ioIndex) => {
            const io = IOsById[outputId];
            const wfOutput = {
                id: io.id,
                nodeId,
                position: calculateIOPosition({
                    nodePosition,
                    ioIndex,
                }),
                nodePosition,
            };

            outputs.push(wfOutput);
        });
    }

    return outputs;
}
