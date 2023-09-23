import { createContext, useContext, useMemo } from 'react';

const TreeContext = createContext(undefined);

export default function useTreeContext({
  type, onChange, value, rootNodeId,
}) {
  const contextProviderValue = useMemo(
    () => ({
      type,
      onChange,
      selectedNodeIds: new Set(value),
      rootNodeId,
    }),
    [type, onChange, value, rootNodeId],
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

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (isChecked(value)) {
      deleteId(value);
    } else {
      addId(value);
    }
  };

  return {
    treeType: type,
    commands: {
      addId,
      deleteId,
      isChecked,
    },
    handleCheckboxChange,
  };
}

export function useTreeRootNodeId() {
  const context = useContext(TreeContext);
  const { rootNodeId } = context;

  return rootNodeId;
}
