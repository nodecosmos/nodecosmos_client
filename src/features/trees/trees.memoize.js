/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const extractRootIdFromTreeNodeId = defaultMemoize((treeNodeId) => treeNodeId.split('-')[0]);
