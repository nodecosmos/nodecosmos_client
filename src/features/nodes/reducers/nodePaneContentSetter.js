import { NODE_PANE_CONTENTS } from '../nodes.constants';

export default {
  setNodePaneContent: (state, action) => {
    state.nodePaneContent = action.payload;
  },
  setDefaultNodeDetailsAction: (state) => {
    state.nodePaneContent = NODE_PANE_CONTENTS.description;
  },
};
