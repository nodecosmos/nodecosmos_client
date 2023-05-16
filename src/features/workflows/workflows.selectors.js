import { createSelector } from '@reduxjs/toolkit';
// import { selectWorkflowFlowSteps } from '../flow-steps/flowSteps.selectors';
// import { selectWorkflowFlows } from '../flows/flows.selectors';
// import { selectInputOutputsById } from '../input-outputs/inputOutput.selectors';

export const selectWorkflowsById = (state) => state.workflows.byId;
export const selectWorkflowIdsByNodeId = (state) => state.workflows.idsByNodeId;
/* diagram */
export const selectWorkflowDiagramById = (state) => state.workflows.workflowDiagramById;
// export const selectFlowStepIdsByWorkflowStepId = (state) => state.workflows.flowStepIdsByWorkflowStepId;
export const selectWorkflowsByNodeId = (nodeId) => createSelector([
  selectWorkflowIdsByNodeId,
  selectWorkflowsById,
], (workflowIdsByNodeId, workflowsById) => {
  const workflowIds = workflowIdsByNodeId[nodeId] || [];
  return workflowIds.map((workflowId) => workflowsById[workflowId]);
});

export const selectWorkflowDiagram = (workflowId) => createSelector(
  selectWorkflowDiagramById,
  (workflowDiagramById) => workflowDiagramById[workflowId] || [],
);

// export const selectWorkflowDiagram = (workflowId) => createSelector([
//   selectWorkflowDiagramById,
//   selectFlowStepIdsByWorkflowStepId,
//   selectWorkflowFlows(workflowId),
//   selectWorkflowFlowSteps(workflowId),
//   selectInputOutputsById,
// ], (
//   workflowDiagramById,
//   flowStepIdsByWorkflowStepId,
//   flowsById,
//   flowStepsById,
//   inputOutputs,
// ) => {
//   const workflowStepIds = workflowDiagramById[workflowId] || [];
//   return workflowStepIds.map((workflowStepId) => {
//     const flowStepIds = flowStepIdsByWorkflowStepId[workflowStepId] || [];
//     return flowStepIds.map((flowStepId) => {
//       const inputs = flowStepsById[flowStepId].inputIdsByNodeId.map((inputId) => inputOutputs[inputId]);
//       const outputs = flowStepsById[flowStepId].outputIdsByNodeId.map((outputId) => inputOutputs[outputId]);
//
//       return {
//         flowStep: flowStepsById[flowStepId],
//         flow: flowsById[flowStepsById[flowStepId].flowId],
//         inputs,
//         outputs,
//       };
//     });
//   });
// });
