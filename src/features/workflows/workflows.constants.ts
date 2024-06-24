import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../nodes/nodes.constants';

export const MARGIN_LEFT = 22; // move children's edge left from where current node's X edge ends
export const NODE_BUTTON_HEIGHT = 34; // height of node button
export const MARGIN_TOP = NODE_BUTTON_HEIGHT / 2.0 + 0.3; // move children's edge down from current node's button y
export const EDGE_LENGTH = 35; // length of edge (link)
export const SHADOW_OFFSET = 4; // offset of shadow from edge

export const WORKFLOW_STEP_WIDTH = 420;
export const WORKFLOW_BUTTON_HEIGHT = 34;
export const WORKFLOW_BUTTON_WIDTH = 250;
export const WORKFLOW_WIDTH_WITH_TOOLBAR = WORKFLOW_BUTTON_WIDTH + 70;

export const FLOW_TOOLBAR_HEIGHT = 65;
export const WORKFLOW_START_MARGIN_TOP = FLOW_TOOLBAR_HEIGHT / 2.0 - 1;
export const BORDER_WIDTH = 1;

export const OUTPUT_EDGE_LENGTH = 65;
export const OUTPUT_VERTICAL_EDGE_LENGTH = 220;
export const OUTPUT_BUTTON_WIDTH = 150;
export const OUTPUT_BUTTON_SKEWED_WIDTH = 169.63; // got it from dev tools
export const OUTPUT_BUTTON_X_MARGIN = (OUTPUT_VERTICAL_EDGE_LENGTH - OUTPUT_BUTTON_SKEWED_WIDTH) / 2;

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const DURATION = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

export const CIRCLE_STYLE = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
    transition: `cx ${DURATION}ms, cy ${DURATION}ms`,
};

export const PATH_STYLE = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
    transition: `d ${DURATION / 2}ms`,
};

export const ANIMATION_PATH_STYLE = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION}ms forwards`,
};

export const Y_TRANSITION_STYLE = { transition: `y ${TRANSITION_ANIMATION_DURATION}ms` };

export const HEIGHT_TRANSITION_STYLE = { transition: `height ${TRANSITION_ANIMATION_DURATION}ms` };

export const BUTTON_APPEAR_STYLE = {
    opacity: 0,
    animation: `workflow-node-button-appear ${DURATION}ms 0ms forwards`,
};
