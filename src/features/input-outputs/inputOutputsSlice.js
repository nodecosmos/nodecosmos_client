import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';
import { createIo } from './inputOutput.thunks';

const inputOutputsSlice = createSlice({
  name: 'nodes',
  initialState: {
    byId: {
      input1: {
        workflowId: 'workflow-1',
        id: 'input1',
        title: 'input1',
        unit: 'unit1',
        value: 1,
      },
      input2: {
        workflowId: 'workflow-1',
        id: 'input2',
        title: 'input2',
        unit: 'unit2',
        value: 2,
      },
      input3: {
        workflowId: 'workflow-1',
        id: 'input3',
        title: 'input3',
        unit: 'unit3',
        value: 3,
      },
      output1: {
        workflowId: 'workflow-1',
        id: 'output1',
        title: 'output1',
        unit: 'unit1',
        value: 1,
      },
      output2: {
        workflowId: 'workflow-1',
        id: 'output2',
        title: 'output2 long',
        unit: 'unit2',
        value: 2,
      },
      output3: {
        workflowId: 'workflow-1',
        id: 'output3',
        title: 'output3',
        unit: 'unit3',
        value: 3,
      },
      output4: {
        workflowId: 'workflow-1',
        id: 'output4',
        title: 'output4',
        unit: 'unit4',
        value: 4,
      },
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(showWorkflow.fulfilled, (state, action) => {
        const { inputOutputs } = action.payload;
        inputOutputs.forEach((inputOutput) => {
          state.byId[inputOutput.id] = inputOutput;
        });
      }).addCase(createIo.fulfilled, (state, action) => {
        const { inputOutput } = action.payload;
        state.byId[inputOutput.id] = inputOutput;
      });
  },
});

const {
  actions,
  reducer,
} = inputOutputsSlice;

// eslint-disable-next-line no-empty-pattern
export const {
} = actions;

export default reducer;
