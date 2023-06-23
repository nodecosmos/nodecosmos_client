import { createSlice } from '@reduxjs/toolkit';
import { deleteIO } from '../input-outputs/inputOutput.thunks';
import { showWorkflow } from '../workflows/workflows.thunks';
import {
  createFlowStep, deleteFlowStep, updateFlowStepInputs, updateFlowStepNodes, updateFlowStepOutputs,
} from './flowSteps.thunks';

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

          flowStep.nodeIds ||= [];

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
      })
      .addCase(updateFlowStepNodes.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        state.byWorkflowId[flowStep.workflowId][flowStep.id].nodeIds = flowStep.nodeIds;
      })
      .addCase(updateFlowStepOutputs.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        state.byWorkflowId[flowStep.workflowId][flowStep.id].outputIdsByNodeId = flowStep.outputIdsByNodeId;
      })
      .addCase(updateFlowStepInputs.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        state.byWorkflowId[flowStep.workflowId][flowStep.id].inputIdsByNodeId = flowStep.inputIdsByNodeId;
      })
      .addCase(deleteFlowStep.fulfilled, (state, action) => {
        const { flowStep } = action.payload;

        delete state.byWorkflowId[flowStep.workflowId][flowStep.id];
      })
      .addCase(deleteIO.fulfilled, (state, action) => {
        const {
          flowStepId, workflowId, id,
        } = action.payload.inputOutput;

        const flowStep = state.byWorkflowId[workflowId][flowStepId];

        Object.keys(flowStep.outputIdsByNodeId).forEach((nodeId) => {
          flowStep.outputIdsByNodeId[nodeId] = flowStep.outputIdsByNodeId[nodeId].filter((outputId) => outputId !== id);
        });

        state.byWorkflowId[workflowId][flowStepId] = flowStep;
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
