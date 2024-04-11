import {
    createIo, deleteIo, updateIoTitle,
} from './inputOutputs.thunks';
import {
    InputOutput, InputOutputSlice, IoPaneContent,
} from './inputOutputs.types';
import { UUID } from '../../types';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: InputOutputSlice = {
    byBranchId: {},
    IoPaneContent: IoPaneContent.Description,
};

const inputOutputsSlice = createSlice({
    name: 'Ios',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { inputOutputs, workflow } = action.payload;
                const { branchId } = workflow;
                state.byBranchId[branchId] ||= {};

                inputOutputs.forEach((inputOutput: InputOutput) => {
                    state.byBranchId[branchId][inputOutput.id] = inputOutput;
                });
            }).addCase(createIo.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { branchId } = inputOutput;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][inputOutput.id] = inputOutput;
            }).addCase(updateIoTitle.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { branchId, title } = inputOutput;

                Object.values(state.byBranchId[branchId]).forEach((io) => {
                    if (io.originalId === inputOutput.originalId) {
                        io.title = title as string;
                    }
                });
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const { branchId, id } = action.payload;
                delete state.byBranchId[branchId][id];
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const { outputIdsByNodeId, branchId } = action.payload;

                const outputs = outputIdsByNodeId && Object.values(outputIdsByNodeId).flat();

                outputs?.forEach((outputId: UUID) => {
                    delete state.byBranchId[branchId][outputId];
                });
            });
    },
});

const { reducer } = inputOutputsSlice;

export default reducer;
