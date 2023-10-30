import useTreeContext from '../useTreeContext';
import { useCallback } from 'react';

export default function useTreeCheckboxCommands() {
    const { selectedNodeIds, onChange } = useTreeContext();

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
        addId,
        deleteId,
        isChecked,
        handleCheckboxChange,
    };
}
