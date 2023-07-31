import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';
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

        state.byId[inputOutput.id].description = description;
        state.byId[inputOutput.id].descriptionMarkdown = descriptionMarkdown;
      }).addCase(updateIOTitle.fulfilled, (state, action) => {
        const { inputOutput } = action.payload;
        const { id, title } = inputOutput;

        state.byId[id].title = title;
      })
      .addCase(deleteIO.fulfilled, (state, action) => {
        const { id } = action.payload;
        delete state.byId[id];
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
