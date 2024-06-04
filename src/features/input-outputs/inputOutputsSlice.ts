import {
    createIo, deleteIo, updateIoTitle,
} from './inputOutputs.thunks';
import {
    InputOutput, InputOutputSlice, IoPaneContent,
} from './inputOutputs.types';
import { UUID } from '../../types';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { indexWorkflowBranchData, showWorkflow } from '../workflows/worfklow.thunks';
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
                const { branchId } = action.meta.arg;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][inputOutput.id] = inputOutput;
            }).addCase(updateIoTitle.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { branchId } = action.meta.arg;
                const { title } = inputOutput;

                Object.values(state.byBranchId[branchId]).forEach((io) => {
                    if (io.mainId === inputOutput.mainId) {
                        io.title = title as string;
                    }
                });
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const io = action.payload.data;
                const { deleteFromState } = action.payload.metadata;
                const { id } = io;
                const { branchId } = action.meta.arg;

                if (deleteFromState) {
                    delete state.byBranchId[branchId][id];
                }
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const { deleteFromState } = action.payload.metadata;
                const { outputIdsByNodeId, branchId } = action.payload.data;

                const outputs = outputIdsByNodeId && Object.values(outputIdsByNodeId).flat();

                if (deleteFromState) {
                    outputs?.forEach((outputId: UUID) => {
                        delete state.byBranchId[branchId][outputId];
                    });
                }
            })
            .addCase(indexWorkflowBranchData.fulfilled, (state, action) => {
                const { inputOutputs } = action.payload;
                const { branchId } = action.meta.arg;
                state.byBranchId[branchId] ||= {};

                inputOutputs.forEach((inputOutput: InputOutput) => {
                    state.byBranchId[branchId][inputOutput.id] ||= inputOutput;
                });
            });
    },
});

const { reducer } = inputOutputsSlice;

export default reducer;
