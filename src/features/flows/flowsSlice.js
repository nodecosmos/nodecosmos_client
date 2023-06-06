import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';
import { createFlow } from './flows.thunks';

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
    byWorkflowId: {
      'workflow-1': {
        'flow-1': {
          nodeId: 'node-1',
          workflowId: 'workflow-1',
          id: 'flow-1',
          title: 'Flow 1',
          description: 'Flow 1 description',
          stepIds: ['step-1', 'step-2', 'step-3'],
          startIndex: 0,
        },
      },
    },

    /**
     * @type {{
     *   [flowId: string]: number,
     * }}
     */
    flowStartIndexByFlowId: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createFlow.fulfilled, (state, action) => {
        const { flow } = action.payload;
        state.byWorkflowId[flow.workflowId][flow.id] = flow;
      })
      .addCase(createFlow.rejected, (state, action) => {
        console.log('createFlow.rejected', action);
      })
      .addCase(showWorkflow.fulfilled, (state, action) => {
        const { workflow, flows } = action.payload;
        state.byWorkflowId[workflow.id] = flows.reduce((acc, flow) => {
          acc[flow.id] = flow;
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
