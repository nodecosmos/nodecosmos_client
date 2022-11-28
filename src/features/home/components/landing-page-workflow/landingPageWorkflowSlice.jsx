import { createSlice } from '@reduxjs/toolkit';

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
