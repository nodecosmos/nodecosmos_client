import { UUID } from '../../../../../types';
import { NodeProps } from '../../../components/tree/node/Node';
import { selectNode } from '../../../nodes.selectors';
import useTreeContext from '../useTreeContext';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const NodeContext = createContext<NodeProps>({} as NodeProps);

export function useNodeContextCreator(contextProviderValue: NodeProps) {
    return {
        NodeContext,
        contextProviderValue,
    };
}

export default function useNodeContext() {
    const {
        currentBranchId, id, isAlreadyMounted,
    } = useContext(NodeContext);
    const { treeNodes } = useTreeContext();

    // tree node attributes
    const {
        branchId,
        rootId,
        parentId,
        persistedId,
        ancestorIds,
        title,
        isRoot,
        isTmp,
        tmpId,
        isSelected,
        isEditing,
        isDragOver,
        isCreationInProgress,
    } = useSelector(selectNode(currentBranchId, id as UUID));

    const {
        treeRootId,
        lastChildId,
        siblingIndex,
        isExpanded,
        nestedLevel,
        x,
        y,
        xEnd,
        yEnd,
    } = treeNodes[id] || {};

    return {
        currentBranchId,
        treeRootId,
        branchId,
        id,
        rootId,
        parentId,
        persistedId,
        ancestorIds,
        lastChildId,
        siblingIndex: siblingIndex as number,
        title,
        tmpId,
        isRoot,
        isTmp,
        isAlreadyMounted,
        isSelected,
        isExpanded,
        isEditing,
        isDragOver,
        isCreationInProgress,
        nestedLevel,
        x,
        y,
        xEnd,
        yEnd,
    };
}
