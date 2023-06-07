import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';

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
    byWorkflowId: {
      'workflow-1': {
        'step-1': {
          nodeId: 'node-1',
          workflowId: 'test',
          flowId: 'flow-1',
          id: 'step-1',
          nodeIds: ['node-1', 'node-2'],
          inputIdsByNodeId: {
            'node-1': ['input1', 'input2'],
            'node-2': ['input2'],
          },
          outputIdsByNodeId: {
            'node-1': ['output1'],
            'node-2': ['output2'],
          },
        },
        'step-2': {
          nodeId: 'node-2',
          workflowId: 'test',
          flowId: 'flow-1',
          id: 'step-2',
          nodeIds: ['node-3', 'node-4'],
          inputIdsByNodeId: {
            'node-3': ['output1', 'output2'],
            'node-4': ['output2'],
          },
          outputIdsByNodeId: {
            'node-3': ['output1', 'output2'],
            'node-4': ['output4'],
          },
        },
        'step-3': {
          nodeId: 'node-3',
          workflowId: 'test',
          flowId: 'flow-1',
          id: 'step-3',
          nodeIds: ['node-5'],
          inputIdsByNodeId: {
            'node-5': ['output1', 'output2', 'output4'],
          },
          outputIdsByNodeId: {},
        },

      },
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(showWorkflow.fulfilled, (state, action) => {
      const { workflow, flowSteps } = action.payload;
      state.byWorkflowId[workflow.id] = flowSteps.reduce((acc, flowStep) => {
        acc[flowStep.id] = flowStep;
        return acc;
      }, {});
    });
  },
});

const {
  actions,
  reducer,
} = flowStepsSlice;

export const {} = actions;

export default reducer;
