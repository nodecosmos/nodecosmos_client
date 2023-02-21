export const MARGIN_LEFT = 20; // move children's edge left from where current node's X edge ends
export const NODE_BUTTON_HEIGHT = 29.5; // height of node button
export const MARGIN_TOP = NODE_BUTTON_HEIGHT / 2.0 + 0.3; // move children's edge down from current node's button y
export const EDGE_LENGTH = 35; // length of edge (link)
export const COMPLETE_Y_LENGTH = EDGE_LENGTH + MARGIN_TOP; // length of edge + button

export const INITIAL_ANIMATION_DURATION = 300; // ms
export const INITIAL_ANIMATION_DELAY = 50; // ms - move down siblings first than extend current node
export const TRANSITION_ANIMATION_DURATION = 150; // ms

// Path: src/features/nodes/components/tree/Transformable.jsx
export const TRANSFORMABLE_HEIGHT_MARGIN = 200;
export const TRANSFORMABLE_WIDTH_MARGIN = 50;
export const TRANSFORMABLE_MIN_WIDTH = 800;
// for virtualization
export const CLIENT_VIEWPORT_BUFFER_FACTOR = 1.5;

export const SAVE_NODE_TIMEOUT = 1000; // ms
export const MIN_NODE_INPUT_SIZE = 3;
export const MAX_NODE_INPUT_SIZE = 50;
