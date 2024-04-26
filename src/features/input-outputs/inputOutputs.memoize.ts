import { InputOutput } from './inputOutputs.types';
import { UUID } from '../../types';
import { lruMemoize } from 'reselect';

export type InputOutputsById = Record<UUID, InputOutput>;

export const groupInputOutputsById = lruMemoize((inputOutputs) => {
    const iosById: InputOutputsById = {};

    return inputOutputs.reduce((acc: Record<UUID, InputOutput>, inputOutput: InputOutput) => {
        acc[inputOutput.id] = inputOutput;
        return acc;
    }, iosById);
});
