import { useCallback } from 'react';
import useTreeContext from './useTreeContext';

export default function useTreeCommands() {
  const context = useTreeContext();
  const { selectedNodeIds, onChange, setShouldRebuildTree } = context;

  const rebuildTree = useCallback(() => {
    setShouldRebuildTree(true);
  }, [setShouldRebuildTree]);

  const finishTreeRebuild = useCallback(() => {
    setShouldRebuildTree(false);
  }, [setShouldRebuildTree]);

  // checkboxes
  const addId = useCallback((nodeId) => {
    selectedNodeIds.add(nodeId);
    onChange(Array.from(selectedNodeIds));
  }, [selectedNodeIds, onChange]);

  const deleteId = useCallback((nodeId) => {
    selectedNodeIds.delete(nodeId);
    onChange(Array.from(selectedNodeIds));
  }, [selectedNodeIds, onChange]);

  const isChecked = useCallback((nodeId) => selectedNodeIds && selectedNodeIds.has(nodeId), [selectedNodeIds]);

  const handleCheckboxChange = useCallback((event) => {
    const { value } = event.target;
    if (isChecked(value)) {
      deleteId(value);
    } else {
      addId(value);
    }
  }, [isChecked, addId, deleteId]);

  return {
    rebuildTree,
    finishTreeRebuild,
    isChecked,
    handleCheckboxChange,
  };
}
