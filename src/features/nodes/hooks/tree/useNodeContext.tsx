import { UUID } from '../../../../types';
import { selectNode } from '../../nodes.selectors';
import { NodePrimaryKey } from '../../nodes.types';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const NodeContext = createContext<NodePrimaryKey>({} as NodePrimaryKey);

export function useNodeContextCreator(contextProviderValue: NodePrimaryKey) {
    return {
        NodeContext,
        contextProviderValue,
    };
}

export default function useNodeContext() {
    const { branchId, id } = useContext(NodeContext);

    // tree node attributes
    const {
        treeRootId,
        rootId,
        parentId,
        persistentId,
        ancestorIds,
        lastChildId,
        siblingIndex,
        title,
        isRoot,
        isTemp,
        isSelected,
        isExpanded,
        isEditing,
        isDragOver,
        isCreationInProgress,
        x,
        y,
        xEnd,
        yEnd,
    } = useSelector(selectNode(branchId, id as UUID));

    return {
        treeRootId,
        branchId,
        id,
        rootId,
        parentId,
        persistentId,
        ancestorIds,
        lastChildId,
        siblingIndex: siblingIndex as number,
        title,
        isRoot,
        isTemp,
        isSelected,
        isExpanded,
        isEditing,
        isDragOver,
        isCreationInProgress,
        x,
        y,
        xEnd,
        yEnd,
        // TODO: introduce virtualizer
        isAlreadyMounted: false,
    };
}
