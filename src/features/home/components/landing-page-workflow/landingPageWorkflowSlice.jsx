import { createSlice } from '@reduxjs/toolkit';

export const NEW_NODE_ID = 'NEW_NODE_ID';

const isNewNode = (id) => id === NEW_NODE_ID;

const workflowSlice = createSlice({
  name: 'landingPageNodes',
  initialState: {
    currentWorkflow: {
      title: 'Start',
      description: 'Plane starting procedure!',
    },
  },
  reducers: {
    setCurrentWorkflowStep(state, action) {
      state.currentWorkflow = action.payload;
    },
  },
});

const { actions, reducer } = workflowSlice;

export const {
  setCurrentWorkflowStep,
} = actions;

export default reducer;
