/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const buildIODiagramId = defaultMemoize((flowStepId, nodeId, ioId) => `${flowStepId}->${nodeId}->${ioId}`);
export const buildDiagramNodeId = defaultMemoize((flowStepId, nodeId) => `${flowStepId}->${nodeId}`);

export const extractNodeIdFromDiagramId = defaultMemoize((nodeDiagramId) => nodeDiagramId.split('->')[1]);
