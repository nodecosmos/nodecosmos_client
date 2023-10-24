import { defaultMemoize } from 'reselect';
import { UUID } from '../../types';
import { InputOutput } from './types';

export type InputOutputsById = Record<UUID, InputOutput>;

export const groupInputOutputsById = defaultMemoize((inputOutputs) => {
    const iosById: InputOutputsById = {};

    return inputOutputs.reduce((acc: Record<UUID, InputOutput>, inputOutput: InputOutput) => {
        acc[inputOutput.id] = inputOutput;
        return acc;
    }, iosById);
});
