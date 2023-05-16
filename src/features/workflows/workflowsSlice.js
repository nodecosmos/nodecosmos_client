import { createSlice } from '@reduxjs/toolkit';
import workflowDiagramBuilder from './reducers/workflowDiagramBuilder';
import workflowDiagramPositionSetter from './reducers/workflowDiagramPositionSetter';

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState: {
    byId: {
      'workflow-1': {
        id: 'workflow-1',
        nodeId: 'node-1',
        title: 'Workflow',
        description: 'Workflow description',
        initialInputIds: ['input1', 'input2'],
      },
    },

    idsByNodeId: {
      'node-1': ['workflow-1'],
    },

    /**
     * @type {{
     *   [workflowId: string]: [
     *     workflowStep: [
     *       {
     *         flowId: string,
     *         flowStepId: string,
     *         inputsByNodeId: {
     *           [nodeId: string]: [
     *             {
     *               inputId: string,
     *               diagramId: string,
     *             }
     *           ]
     *         },
     *         outputsByNodeId: {
     *           [nodeId: string]: [
     *             {
     *               outputId: string,
     *               diagramId: string,
     *             }
     *           ],
     *         },
     *       }
     *     ]
     *   ]
     * }}
     */
    workflowDiagramById: {},

    /**
     * @type {{
     *   [diagramId: string]: {
     *     x: number,
     *     y: number,
     *     xEnd: number,
     *     yEnd: number,
     *   }
     * }}
     */
    workflowDiagramPositionsById: {},
  },
  reducers: {
    buildWorkflow: workflowDiagramBuilder.buildWorkflowDiagram,
    setWorkflowDiagramPosition: workflowDiagramPositionSetter.setWorkflowDiagramPosition,
  },
  extraReducers(builder) {
  },
});

const {
  actions,
  reducer,
} = workflowsSlice;

export const {
  setWorkflowDiagramPosition,
  buildWorkflow,
} = actions;

export default reducer;
