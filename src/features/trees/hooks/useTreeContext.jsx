import {
    createContext, useContext, useMemo, useState,
} from 'react';

const TreeContext = createContext(undefined);

export function useTreeContextCreator({
    type, onChange, value, rootNodeId,
}) {
    const [shouldRebuildTree, setShouldRebuildTree] = useState(false);

    const contextProviderValue = useMemo(
        () => ({
            type,
            onChange,
            selectedNodeIds: new Set(value),
            rootNodeId,
            shouldRebuildTree,
            setShouldRebuildTree,
        }),
        [type, onChange, value, rootNodeId, shouldRebuildTree],
    );

    return {
        TreeContext,
        contextProviderValue,
    };
}

export default function useTreeContext() {
    const context = useContext(TreeContext);
    const {
        rootNodeId,
        type,
        shouldRebuildTree,
        setShouldRebuildTree,
        onChange,
        selectedNodeIds,
    } = context;

    return {
        rootNodeId,
        shouldRebuildTree,
        type,
        setShouldRebuildTree,
        onChange,
        selectedNodeIds,
    };
}
