import useTreeContext from './useTreeContext';
import { UUID } from '../../../../types';
import { ChangeEvent, useCallback } from 'react';

export default function useTreeCommands() {
    const { selectedNodeIds, onChange } = useTreeContext();

    // checkboxes
    const addId = useCallback((nodeId: UUID) => {
        selectedNodeIds.add(nodeId);
        if (onChange) onChange(Array.from(selectedNodeIds));
    }, [selectedNodeIds, onChange]);

    const deleteId = useCallback((nodeId: UUID) => {
        selectedNodeIds.delete(nodeId);
        if (onChange) onChange(Array.from(selectedNodeIds));
    }, [selectedNodeIds, onChange]);

    const isChecked = useCallback((nodeId: UUID) => selectedNodeIds && selectedNodeIds.has(nodeId), [selectedNodeIds]);

    const handleCheckboxChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
