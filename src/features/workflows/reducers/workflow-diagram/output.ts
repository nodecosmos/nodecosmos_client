import { FlowStep } from '../../../flow-steps/types';
import { Output } from '../../types';
import {Position, UUID} from "../../../../types";
import { FlowStepData } from './flowStep';
import {calculateInitialIoPosition, calculateIOPosition} from "./positionCalculator";

export function buildInitialOutputs(initialInputIds: UUID[]): Output[] {
    const outputs: Output[] = [];

    initialInputIds.forEach((inputId: UUID, ioIndex) => {
        outputs.push({
            id: inputId,
            position: calculateInitialIoPosition(ioIndex),
        });
    });

    return outputs;
}

export interface BuildsInputsData {
    flowStep: FlowStep;
    nodeId: UUID;
    prevOutputs: Output[];
}

export function buildInputs(data: BuildsInputsData): Output[] {
    const { flowStep, nodeId, prevOutputs } = data;

    const inputs: Output[] = [];

    flowStep.inputIdsByNodeId[nodeId].forEach((inputId: UUID) => {
        const output = prevOutputs.find((output: Output) => output.id === inputId);
        if (output) {
            inputs.push(output);
        }
    });

    return inputs;
}

export interface BuildOutputsData {
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

    flowStep.outputIdsByNodeId[nodeId].forEach((outputId, ioIndex) => {
        const io = IOsById[outputId];
        const wfOutput = {
            id: io.id,
            position: calculateIOPosition({nodePosition, ioIndex}),
        };

        outputs.push(wfOutput);

        // connect output to previous workflow step,
        // so we can use it as input for next workflow step
        if (prevWorkflowStep) {
            prevWorkflowStep.outputs.push(wfOutput);
        }
    });

    return outputs;
}

