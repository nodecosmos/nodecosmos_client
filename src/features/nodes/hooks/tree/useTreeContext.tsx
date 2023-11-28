import { UUID } from '../../../../types';
import { TreeProps } from '../../components/tree/Tree';
import { TreeType } from '../../nodes.types';
import {
    createContext, useContext, useMemo,
} from 'react';

interface TreeContextValue extends TreeProps{
    selectedNodeIds: Set<UUID>;
}

const TreeContext = createContext<TreeContextValue>({ } as TreeContextValue);

export function useTreeContextCreator(props: TreeProps) {
    const {
        branchId, rootNodeId, type = TreeType.Default, onChange, value = null,
    } = props;

    const ctxProviderValue = useMemo(
        () => ({
            branchId,
            rootNodeId,
            type,
            onChange,
            selectedNodeIds: new Set(value),
        }),
        [branchId, rootNodeId, type, onChange, value],
    );

    return {
        TreeContext,
        ctxProviderValue,
    };
}

export default function useTreeContext() {
    const context = useContext(TreeContext);
    const {
        branchId,
        rootNodeId,
        type,
        onChange,
        selectedNodeIds,
    } = context;

    return {
        branchId,
        rootNodeId,
        type,
        onChange,
        selectedNodeIds,
    };
}
