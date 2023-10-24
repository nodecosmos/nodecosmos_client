import { FlowStep } from '../../features/flow-steps/types';
import { Output } from '../../features/workflows/types';
import { Position, UUID } from '../../types';
import { FlowStepData } from './flowStep';
import { calculateInitialIoPosition, calculateIOPosition } from './positionCalculator';

export function buildInitialOutputs(initialInputIds: UUID[]): Output[] {
    const outputs: Output[] = [];

    initialInputIds.forEach((inputId: UUID, ioIndex) => {
        outputs.push({
            id: inputId,
            nodeId: null,
            position: calculateInitialIoPosition(ioIndex),
        });
    });

    return outputs;
}

interface BuildsInputsData {
    flowStep: FlowStep;
    nodeId: UUID;
    prevOutputs: Output[];
    nodePosition: Position;
}

export function buildInputs(data: BuildsInputsData): Output[] {
    const {
        flowStep, nodeId, prevOutputs, nodePosition,
    } = data;

    const inputs: Output[] = [];
    const outputIdsByNodeId = flowStep?.outputIdsByNodeId || {};
    const nodeInputs = outputIdsByNodeId[nodeId];

    if (nodeInputs){
        nodeInputs.forEach((inputId: UUID) => {
            const output = prevOutputs.find((output: Output) => output.id === inputId);
            if (output) {
                inputs.push({
                    id: inputId,
                    nodeId,
                    position: {
                        x: output.position.xEnd,
                        y: output.position.yEnd,
                        xEnd: nodePosition.x,
                        yEnd: nodePosition.y,
                    },
                });
            }
        });
    }

    return inputs;
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
    const { IOsById, prevWorkflowStep } = flowStepData;

    const outputs: Output[] = [];
    const outputIdsByNodeId = flowStep?.outputIdsByNodeId || {};
    const nodeOutputs = outputIdsByNodeId[nodeId];

    if (nodeOutputs) {
        nodeOutputs.forEach((outputId, ioIndex) => {
            const io = IOsById[outputId];
            const wfOutput = {
                id: io.id,
                nodeId,
                position: calculateIOPosition({ nodePosition, ioIndex }),
            };

            outputs.push(wfOutput);

            // connect output to previous workflow step,
            // so we can use it as input for next workflow step
            if (prevWorkflowStep) {
                prevWorkflowStep.outputs.push(wfOutput);
            }
        });
    }

    return outputs;
}

