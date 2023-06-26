import { createSlice } from '@reduxjs/toolkit';
import { createFlowStep, deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { showWorkflow } from '../workflows/workflows.thunks';
import { FLOW_PANE_CONTENTS } from './flows.constants';
import {
  createFlow, deleteFlow, getFlowDescription, updateFlowTitle,
} from './flows.thunks';

const flowStepsSlice = createSlice({
  name: 'flows',
  initialState: {
    /**
     * @type {{
     *   [workflowId: string]: {
     *     [flowId: string]: {
     *       nodeId: string,
     *       workflowId: string,
     *       id: string,
     *       title: string,
     *       description: string,
     *       stepIds: string[],
     *     }
     *   }
     * }}
     */
    byWorkflowId: {},

    /**
     * @type {{
     *   [flowId: string]: number,
     * }}
     */
    flowStartIndexByFlowId: {},

    flowPaneContent: FLOW_PANE_CONTENTS.description,
  },
  reducers: {
    setFlowPaneContent(state, action) {
      state.flowPaneContent = action.payload;
    },
    updateFlowState(state, action) {
      const { workflowId, flowId } = action.payload;
      state.byWorkflowId[workflowId][flowId] = { ...state.byWorkflowId[workflowId][flowId], ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createFlow.fulfilled, (state, action) => {
        const { flow } = action.payload;
        state.byWorkflowId[flow.workflowId] ||= {};
        state.byWorkflowId[flow.workflowId][flow.id] = flow;
      })
      .addCase(createFlow.rejected, (state, action) => {
        console.log('createFlow.rejected', action);
      })
      .addCase(getFlowDescription.fulfilled, (state, action) => {
        const { flow } = action.payload;
        state.byWorkflowId[flow.workflowId][flow.id].description = flow.description;
      })
      .addCase(showWorkflow.fulfilled, (state, action) => {
        const { workflow, flows } = action.payload;
        state.byWorkflowId[workflow.id] = flows.reduce((acc, flow) => {
          acc[flow.id] = flow;
          return acc;
        }, {});
      })
      .addCase(deleteFlow.fulfilled, (state, action) => {
        const { flow } = action.payload;
        delete state.byWorkflowId[flow.workflowId][flow.id];
      })
      .addCase(updateFlowTitle.fulfilled, (state, action) => {
        const { flow } = action.payload;
        state.byWorkflowId[flow.workflowId][flow.id].title = flow.title;
      })
      .addCase(createFlowStep.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        flowStep.inputIdsByNodeId ||= {};
        flowStep.outputIdsByNodeId ||= {};
        state.byWorkflowId[flowStep.workflowId][flowStep.flowId].stepIds ||= [];

        state.byWorkflowId[flowStep.workflowId][flowStep.flowId].stepIds.push(flowStep.id);
      })
      .addCase(deleteFlowStep.fulfilled, (state, action) => {
        const { flowStep } = action.payload;
        const flow = state.byWorkflowId[flowStep.workflowId][flowStep.flowId];
        flow.stepIds = flow.stepIds.filter((stepId) => stepId !== flowStep.id);
      });
  },
});

const {
  actions,
  reducer,
} = flowStepsSlice;

export const {
  setFlowPaneContent,
  updateFlowState,
} = actions;

export default reducer;
