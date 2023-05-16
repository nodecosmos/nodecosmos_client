export const MARGIN_LEFT = 20; // move children's edge left from where current node's X edge ends
export const NODE_BUTTON_HEIGHT = 29.5; // height of node button
export const MARGIN_TOP = NODE_BUTTON_HEIGHT / 2.0 + 0.3; // move children's edge down from current node's button y
export const EDGE_LENGTH = 35; // length of edge (link)
export const COMPLETE_Y_LENGTH = EDGE_LENGTH + MARGIN_TOP; // length of edge + button

export const INITIAL_ANIMATION_DURATION = 300; // ms
export const INITIAL_ANIMATION_DELAY = 50; // ms - move down siblings first than extend current node
export const TRANSITION_ANIMATION_DURATION = 150; // ms

// for virtualization
export const CLIENT_VIEWPORT_BUFFER_FACTOR = 1.5;

export const SAVE_NODE_TIMEOUT = 750; // ms
export const MIN_NODE_INPUT_SIZE = 3;
export const MAX_NODE_INPUT_SIZE = 50;

export const WORKFLOW_BUTTON_HEIGHT = 29.5;
export const IO_BUTTON_HEIGHT = 29.5;
