import { createSlice } from '@reduxjs/toolkit';
import { createFlow, deleteFlow } from '../flows/flows.thunks';
import { deleteIO } from '../input-outputs/inputOutputs.thunks';
import workflowDiagramBuilder from './reducers/workflowDiagramBuilder';
import workflowDiagramPositionSetter from './reducers/workflowDiagramPositionSetter';
import { WORKFLOW_PANE_CONTENTS } from './workflows.constants';
import { createWorkflow, showWorkflow, updateWorkflowInitialInputs } from './workflows.thunks';

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
     *     initialInputIds: string[],
     *     workflowSteps: [{
     *       workflowId: string,
     *       index: number,
     *       diagramId: string,
     *       flows: [{
     *         id: string,
     *         workflowId: string,
     *         diagramId: string,
     *         flowStep: {
     *           id: string,
     *           workflowId: string,
     *           flowId: string,
     *           nodes: [{
     *             id: string,
     *             diagramId: string,
     *           }],
     *           inputsByNodeId: {
     *             id: string,
     *             nodeDiagramId: string,
     *           },
     *           outputIdsByNodeId: {
     *             [nodeId: string]: string[],
     *           },
     *         },
     *       }],
     *     }],
     *   }
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

    /**
     * @type {{
     *   id: string,
     *   diagramId: string,
     *   workflowId: string,
     *   type: string,
     * }}
     */
    selectedWorkflowDiagramObject: {},

    isWfPaneOpen: true,
    /**
     * @type {string}
     */
    workflowPaneContent: WORKFLOW_PANE_CONTENTS.description,

    /**
     * @type {number}
     */
    workflowScale: parseFloat(localStorage.getItem('workflowScale')) || 1,
  },
  reducers: {
    buildWorkflow: workflowDiagramBuilder.buildWorkflowDiagram,
    setWorkflowDiagramPosition: workflowDiagramPositionSetter.setWorkflowDiagramPosition,
    setSelectedWorkflowDiagramObject(state, action) {
      state.selectedWorkflowDiagramObject = action.payload;
    },
    setIsWfPaneOpen(state, action) {
      state.isWfPaneOpen = action.payload;
    },
    setWorkflowPaneContent(state, action) {
      state.workflowPaneContent = action.payload;
    },
    setWorkflowScale(state, action) {
      localStorage.setItem('workflowScale', action.payload);
      state.workflowScale = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(showWorkflow.fulfilled, (state, action) => {
        const { workflow } = action.payload;
        const { id, nodeId } = workflow;

        workflow.flowIds = workflow.flowIds || [];
        workflow.initialInputIds = workflow.initialInputIds || [];

        state.byId[id] = workflow;

        state.idsByNodeId[nodeId] = state.idsByNodeId[nodeId] || [];
        state.idsByNodeId[nodeId].push(id);
      })
      .addCase(createWorkflow.fulfilled, (state, action) => {
        const { workflow } = action.payload;
        const { id, nodeId } = workflow;

        workflow.flowIds = workflow.flowIds || [];
        workflow.initialInputIds = workflow.initialInputIds || [];

        state.byId[id] = workflow;

        state.idsByNodeId[nodeId] = state.idsByNodeId[nodeId] || [];
        state.idsByNodeId[nodeId].push(id);
      })
      .addCase(createFlow.fulfilled, (state, action) => {
        const { flow } = action.payload;
        state.byId[flow.workflowId].flowIds.push(flow.id);
      })
      .addCase(deleteFlow.fulfilled, (state, action) => {
        const { flow } = action.payload;
        const { workflowId } = flow;

        state.byId[workflowId].flowIds = state.byId[workflowId].flowIds.filter((id) => id !== flow.id);
      })
      .addCase(updateWorkflowInitialInputs.fulfilled, (state, action) => {
        const { id, initialInputIds } = action.payload.workflow;

        state.byId[id].initialInputIds = initialInputIds;
      })
      .addCase(deleteIO.fulfilled, (state, action) => {
        const { id, nodeId } = action.payload.inputOutput;

        const workflowIds = state.idsByNodeId[nodeId];
        const workflow = workflowIds.map((workflowId) => state.byId[workflowId])
          .find((wf) => wf.initialInputIds.includes(id));

        if (workflow) {
          workflow.initialInputIds = workflow.initialInputIds.filter((inputId) => inputId !== id);
        }

        if (state.selectedWorkflowDiagramObject.id === id) {
          state.selectedWorkflowDiagramObject = {};
        }
      });
  },
});

const {
  actions,
  reducer,
} = workflowsSlice;

export const {
  setWorkflowDiagramPosition,
  buildWorkflow,
  setSelectedWorkflowDiagramObject,
  setIsWfPaneOpen,
  setWorkflowScale,
  setWorkflowPaneContent,
} = actions;

export default reducer;
