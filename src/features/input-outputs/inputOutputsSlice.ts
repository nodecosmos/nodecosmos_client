import {
    createIO, deleteIO, getIODescription, updateIOTitle,
} from './inputOutputs.thunks';
import {
    InputOutput, InputOutputSlice, IOPaneContent,
} from './inputOutputs.types';
import { UUID } from '../../types';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: InputOutputSlice = {
    byBranchId: {},
    IOPaneContent: IOPaneContent.Description,
};

const inputOutputsSlice = createSlice({
    name: 'IOs',
    initialState,
    reducers: {
        updateIOState(state, action) {
            const { id, branchId } = action.payload;
            state.byBranchId[branchId][id] = {
                ...state.byBranchId[branchId][id],
                ...action.payload,
            };

            Object.values(state.byBranchId[branchId]).forEach((io) => {
                const updatedIo = state.byBranchId[branchId][id];

                if (io.originalId === io.originalId) {
                    io.title = updatedIo.title;
                    io.unit = updatedIo.unit;
                    io.dataType = updatedIo.dataType;
                    io.value = updatedIo.value;
                    io.description = updatedIo.description;
                    io.descriptionMarkdown = updatedIo.descriptionMarkdown;
                }
            });
        },
        setIOPaneContent(state, action) {
            state.IOPaneContent = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { inputOutputs, workflow } = action.payload;
                const { branchId } = workflow;
                state.byBranchId[branchId] ||= {};

                inputOutputs.forEach((inputOutput: InputOutput) => {
                    state.byBranchId[branchId][inputOutput.id] = inputOutput;
                });
            }).addCase(createIO.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { branchId } = inputOutput;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][inputOutput.id] = inputOutput;
            }).addCase(getIODescription.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const {
                    branchId, description, descriptionMarkdown,
                } = inputOutput;

                Object.values(state.byBranchId[branchId]).forEach((io) => {
                    if (io.originalId === inputOutput.originalId) {
                        io.description = description as string | null;
                        io.descriptionMarkdown = descriptionMarkdown as string | null;
                    }
                });
            }).addCase(updateIOTitle.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { branchId, title } = inputOutput;

                Object.values(state.byBranchId[branchId]).forEach((io) => {
                    if (io.originalId === inputOutput.originalId) {
                        io.title = title as string;
                    }
                });
            })
            .addCase(deleteIO.fulfilled, (state, action) => {
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

const {
    actions,
    reducer,
} = inputOutputsSlice;

export const {
    updateIOState,
    setIOPaneContent,
} = actions;

export default reducer;
