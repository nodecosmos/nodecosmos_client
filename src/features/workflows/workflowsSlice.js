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
        initialInputs: ['input1', 'input2'],
        flowIds: ['flow-1'],
      },
    },

    idsByNodeId: {
      'node-1': ['workflow-1'],
    },

    /**
     * So workflow is made up of following:
     *  - initialInputs
     *  - workflowSteps
     *
     *  Each workflow is collection of flows.
     *  Each flow has flowSteps.
     *  Each flowStep has inputs, nodes, outputs.
     *
     * Flow represents isolated process of same workflow.
     *
     * E.g.
     * If we have machine that produces some product, and it also has waist material
     * that needs to be disposed, we can have two flows:
     *  - production flow
     *  - disposal flow
     * These are different flows, but they are part of same workflow that describes
     * production of some product.
     *
     * On the other hand if we have unrelated flows than we can separate them into
     * different workflows.
     *
     * Each workflowStep contains flowSteps on same step.
     *
     * From previous example, workflowStep can be:
     *  - production flowStep1
     *  - disposal flowStep1
     * than next workflowStep would be:
     *  - production flowStep2
     *  - disposal flowStep2
     * and so on.
     *
     * @type {{
     *   [workflowId: string]: {
     *     initialInputs: [
     *       {
     *         inputId: string,
     *         diagramId: string,
     *       },
     *     ],
     *     workflowSteps: [
     *       {
     *         diagramId: string,
     *         index: number,
     *         flowSteps: [
     *          {
     *            diagramId: string,
     *            flowStepId: string,
     *            flowId: string,
     *            nodes: [
     *              {
     *                nodeId: string,
     *                diagramId: string,
     *              }
     *            ],
     *            inputsByNodeId: {
     *              [nodeId: string]: [
     *                {
     *                  inputId: string,
     *                  diagramId: string,
     *                }
     *              ]
     *            },
     *            outputsByNodeId: {
     *              [nodeId: string]: [
     *                {
     *                  outputId: string,
     *                  diagramId: string,
     *                }
     *              ],
     *            },
     *          }
     *         ],
     *       }
     *     ],
     *   },
     * }}
     *
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
