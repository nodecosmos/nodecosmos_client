export default {
  setWorkflowDiagramPosition(state, action) {
    state.workflowDiagramPositionsById = {
      ...state.workflowDiagramPositionsById,
      ...action.payload,
    };
  },
};
