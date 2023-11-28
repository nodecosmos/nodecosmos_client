import useTreeContext from './useTreeContext';
import { UUID } from '../../../../types';
import { NodeProps } from '../../components/tree/Node';
import { selectNode } from '../../nodes.selectors';
import { TreeType } from '../../nodes.types';
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
        branchId: treeBranchId, id, alreadyMounted,
    } = useContext(NodeContext);
    const { type } = useTreeContext();

    // tree node attributes
    const {
        branchId: currentBranchId,
        treeRootId,
        rootId,
        parentId,
        persistedId,
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
    } = useSelector(selectNode(treeBranchId, id as UUID));

    // if the node is a contribution request, we need to use the tree branch id
    let branchId = currentBranchId;
    if (type === TreeType.ContributionRequest) {
        branchId = treeBranchId;
    }

    return {
        treeBranchId,
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
        alreadyMounted,
    };
}
