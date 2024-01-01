import useBranchChanges from './context/useBranchChanges';
import { UUID } from '../../../../../types';
import { NodeProps } from '../../../components/tree/node/Node';
import { selectNode } from '../../../nodes.selectors';
import { TreeType } from '../../../nodes.types';
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
        treeBranchId, id, isAlreadyMounted,
    } = useContext(NodeContext);
    const { type, treeNodes } = useTreeContext();
    const branchChanges = useBranchChanges(treeBranchId, id);

    // tree node attributes
    const {
        branchId: currentBranchId,
        rootId,
        parentId,
        persistedId,
        ancestorIds,
        title,
        isRoot,
        isTmp,
        tmpId,
        isJustCreated,
        isSelected,
        isEditing,
        isDragOver,
        isCreationInProgress,
    } = useSelector(selectNode(treeBranchId, id as UUID));

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
        tmpId,
        isRoot,
        isTmp,
        isAlreadyMounted,
        isJustCreated,
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
        branchChanges,
    };
}
