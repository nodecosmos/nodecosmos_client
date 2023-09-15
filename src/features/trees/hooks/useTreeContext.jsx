import { createContext, useContext, useMemo } from 'react';

const TreeContext = createContext(undefined);

export default function useTreeContext({ type, onChange, value }) {
  const contextProviderValue = useMemo(
    () => ({ type, onChange, selectedNodeIds: new Set(value) }),
    [type, onChange, value],
  );

  return {
    TreeContext,
    contextProviderValue,
  };
}

export function useTreeCheckbox() {
  const context = useContext(TreeContext);
  const { type, selectedNodeIds, onChange } = context;

  const addId = (nodeId) => {
    selectedNodeIds.add(nodeId);
    onChange(Array.from(selectedNodeIds));
  };

  const deleteId = (nodeId) => {
    selectedNodeIds.delete(nodeId);
    onChange(Array.from(selectedNodeIds));
  };

  const isChecked = (nodeId) => selectedNodeIds.has(nodeId);

  return {
    treeType: type,
    commands: {
      addId,
      deleteId,
      isChecked,
    },
  };
}
