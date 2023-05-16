import { createSlice } from '@reduxjs/toolkit';

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
        },
      },
    },
  },
  reducers: {},
  extraReducers(builder) {
  },
});

const {
  actions,
  reducer,
} = flowStepsSlice;

export const {} = actions;

export default reducer;
