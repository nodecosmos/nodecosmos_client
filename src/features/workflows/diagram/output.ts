import { Output } from './diagram.types';
import { FlowStepData } from './flow';
import { calculateInitialIoPosition, calculateIoPosition } from './position';
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
    const { IosById } = flowStepData;

    const outputs: Output[] = [];
    const nodeOutputs = flowStep?.outputIdsByNodeId?.[nodeId];

    if (nodeOutputs) {
        nodeOutputs.forEach((outputId, ioIndex) => {
            const io = IosById[outputId];

            if (!io) {
                return;
            }

            const wfOutput = {
                id: io.id,
                nodeId,
                position: calculateIoPosition({
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
