/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const extractRootIdFromTreeNodeId = defaultMemoize((treeNodeId) => treeNodeId.split('->')[0]);
export const extractNodeIdFromTreeNodeId = defaultMemoize((treeNodeId) => treeNodeId.split('->').pop());
export const replaceNodeIdInTreeNodeId = defaultMemoize((treeNodeId, newId) => {
  // replace last part of the id with the new id
  const parts = treeNodeId.split('->');
  parts.pop();
  parts.push(newId);
  return parts.join('->');
});
