import useTreeCheckboxCommands from './commands/useTreeCheckboxCommands';
import useTreeContext from './useTreeContext';
import { useCallback } from 'react';

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
