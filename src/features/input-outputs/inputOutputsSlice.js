import { createSlice } from '@reduxjs/toolkit';
import { createWorkflow, showWorkflow } from '../workflows/workflows.thunks';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import {
  createIO, deleteIO, getIODescription, updateIOTitle,
} from './inputOutputs.thunks';
import { IO_PANE_CONTENTS } from './inputOutputs.constants';

const inputOutputsSlice = createSlice({
  name: 'nodes',
  initialState: {
    /**
     * @type {{
     *   [id: string]: {
     *     id: string,
     *     workflowId: string,
     *     workflowIndex: number,
     *     title: string,
     *     unit: string,
     *     dataType: string,
     *     value: string,
     *     createdAt: string,
     *     updatedAt: string,
     *     description: string,
     *     descriptionMarkdown: string,
     *     properties: [{
     *       title: string,
     *       dataType: string,
     *       value: string,
     *     }],
     *   };
     * }}
     */
    byId: {},
    IOPaneContent: IO_PANE_CONTENTS.description,
  },
  reducers: {
    updateIOState(state, action) {
      const { id } = action.payload;
      state.byId[id] = { ...state.byId[id], ...action.payload };

      Object.values(state.byId).forEach((io) => {
        if (io.originalId === state.byId[id].originalId) {
          io.title = state.byId[id].title;
          io.unit = state.byId[id].unit;
          io.dataType = state.byId[id].dataType;
          io.value = state.byId[id].value;
          io.description = state.byId[id].description;
          io.descriptionMarkdown = state.byId[id].descriptionMarkdown;
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
        const { inputOutputs } = action.payload;
        inputOutputs.forEach((inputOutput) => {
          state.byId[inputOutput.id] = inputOutput;
        });
      }).addCase(createIO.fulfilled, (state, action) => {
        const { inputOutput } = action.payload;
        state.byId[inputOutput.id] = inputOutput;
      }).addCase(getIODescription.fulfilled, (state, action) => {
        const { inputOutput } = action.payload;
        const { description, descriptionMarkdown } = inputOutput;

        Object.values(state.byId).forEach((io) => {
          if (io.originalId === inputOutput.originalId) {
            io.description = description;
            io.descriptionMarkdown = descriptionMarkdown;
          }
        });
      }).addCase(updateIOTitle.fulfilled, (state, action) => {
        const { inputOutput } = action.payload;
        const { title } = inputOutput;

        Object.values(state.byId).forEach((io) => {
          if (io.originalId === inputOutput.originalId) {
            io.title = title;
          }
        });
      })
      .addCase(deleteIO.fulfilled, (state, action) => {
        const { id } = action.payload;
        delete state.byId[id];
      })
      .addCase(deleteFlowStep.fulfilled, (state, action) => {
        const { outputIdsByNodeId } = action.payload.flowStep;

        const outputs = outputIdsByNodeId && Object.values(outputIdsByNodeId).flat();

        outputs?.forEach((outputId) => {
          delete state.byId[outputId];
        });
      })
      .addCase(createWorkflow.fulfilled, (state, action) => {
        const { inputOutputs } = action.payload;
        inputOutputs.forEach((inputOutput) => {
          state.byId[inputOutput.id] = inputOutput;
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
