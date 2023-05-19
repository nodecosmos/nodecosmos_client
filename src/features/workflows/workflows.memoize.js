/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const buildWorkflowStepDiagramId = defaultMemoize((workflowId, step) => `${workflowId}->${step}`);
export const buildDefaultIODiagramId = defaultMemoize((workflowId, inputId) => `${workflowId}->${inputId}`);
export const buildIODiagramId = defaultMemoize((flowStepId, nodeId, ioId) => `${flowStepId}->${nodeId}->${ioId}`);
export const buildDiagramNodeId = defaultMemoize((flowStepId, nodeId) => `${flowStepId}->${nodeId}`);
