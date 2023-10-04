import { useCallback } from 'react';
import useTreeContext from './useTreeContext';
import useTreeCheckboxCommands from './commands/useTreeCheckboxCommands';

export default function useTreeCommands() {
  const { setShouldRebuildTree } = useTreeContext();

  const rebuildTree = useCallback(() => { setShouldRebuildTree(true); }, [setShouldRebuildTree]);
  const finishTreeRebuild = useCallback(() => { setShouldRebuildTree(false); }, [setShouldRebuildTree]);

  // checkboxes
  const {
    addId,
    deleteId,
    isChecked,
    handleCheckboxChange,
  } = useTreeCheckboxCommands();

  return {
    rebuildTree,
    finishTreeRebuild,
    addId,
    deleteId,
    isChecked,
    handleCheckboxChange,
  };
}
