import { UUID } from '../../../../../types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
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
    const { id, isAlreadyMounted } = useContext(NodeContext);
    const { treeNodes } = useTreeContext();
    const { branchId } = useBranchContext();

    // tree node attributes
    const {
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
    } = useSelector(selectNode(branchId, id as UUID));

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

    const isCurrentRoot = treeRootId === id;

    return {
        treeRootId,
        isCurrentRoot,
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
