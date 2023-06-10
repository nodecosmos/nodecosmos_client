import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';
import { createFlowStep } from './flowSteps.thunks';

const flowStepsSlice = createSlice({
  name: 'flowSteps',
  initialState: {
    /**
     * @type {{
     *   [workflowId: string]: {
     *     [flowStepId: string]: {
     *       nodeId: string,
     *       workflowId: string,
     *       flowId: string,
     *       id: string,
     *       nodeIds: string[],
     *       inputIdsByNodeId: {
     *         [nodeId: string]: string[],
     *       },
     *       outputIdsByNodeId: {
     *         [nodeId: string]: string[],
     *       },
     *     }
     *   }
     * }}
     */
    byWorkflowId: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(showWorkflow.fulfilled, (state, action) => {
        const { workflow, flowSteps } = action.payload;
        state.byWorkflowId[workflow.id] = flowSteps.reduce((acc, flowStep) => {
          flowStep.inputIdsByNodeId ||= {};
          flowStep.outputIdsByNodeId ||= {};

          acc[flowStep.id] = flowStep;
          return acc;
        }, {});
      })
      .addCase(createFlowStep.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        flowStep.inputIdsByNodeId ||= {};
        flowStep.outputIdsByNodeId ||= {};

        state.byWorkflowId[flowStep.workflowId] ||= {};
        state.byWorkflowId[flowStep.workflowId][flowStep.id] = flowStep;
      });
  },
});

const {
  actions,
  reducer,
} = flowStepsSlice;

// eslint-disable-next-line no-empty-pattern
export const {} = actions;

export default reducer;
