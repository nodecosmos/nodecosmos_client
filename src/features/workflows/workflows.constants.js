export const MARGIN_LEFT = 20; // move children's edge left from where current node's X edge ends
export const NODE_BUTTON_HEIGHT = 34; // height of node button
export const MARGIN_TOP = NODE_BUTTON_HEIGHT / 2.0 + 0.3; // move children's edge down from current node's button y
export const EDGE_LENGTH = 35; // length of edge (link)
export const SHADOW_OFFSET = 4; // offset of shadow from edge
// export const COMPLETE_Y_LENGTH = EDGE_LENGTH + MARGIN_TOP; // length of edge + button

export const OUTPUT_EDGE_LENGTH = 65.5;
export const WORKFLOW_STEP_HEIGHT = 65;
export const WORKFLOW_STEP_WIDTH = 380;
export const OUTPUT_VERTICAL_EDGE_LENGTH = 220;
export const WORKFLOW_BUTTON_HEIGHT = 34;
export const OUTPUT_BUTTON_WIDTH = 150;
export const WORKFLOW_BUTTON_SKEWED_WIDTH = 169.63; // got it from dev tools
export const OUTPUT_BUTTON_X_MARGIN = (OUTPUT_VERTICAL_EDGE_LENGTH - WORKFLOW_BUTTON_SKEWED_WIDTH) / 2;
export const FLOW_STEP_SIZE = 65.5;
export const WORKFLOW_START_MARGIN_TOP = 30;

export const WORKFLOW_DIAGRAM_OBJECTS = {
    flow: 'flow',
    flowStep: 'flowStep',
    node: 'node',
    output: 'io',
};

export const WORKFLOW_DIAGRAM_CONTEXT = {
    workflowPage: 'workflowPage',
    workflowNodeDetails: 'workflowNodeDetails',
    treeNodeDetails: 'treeNodeDetails',
};

export const WORKFLOW_PANE_CONTENTS = {
    markdown: 'markdown',
    description: 'description',
};
