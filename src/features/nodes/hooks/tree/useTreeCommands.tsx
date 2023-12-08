import { calculatePositions } from './position';
import { UUID } from '../../../../types';
import useTreeContext, { TreeNode, TreeNodes } from '../useTreeContext';
import { ChangeEvent, useCallback } from 'react';

export default function useTreeCommands() {
    const {
        orderedTreeNodeIds, selectedNodeIds, onChange, treeNodes, setTreeNodes,
    } = useTreeContext();

    const expandNode = useCallback((nodeId: UUID) => {
        const node = treeNodes[nodeId];

        if (node.isExpanded) return;

        const newNode = {
            ...node,
            isExpanded: true,
        };
        const newTreeNodes = Object.assign({}, treeNodes, { [nodeId]: newNode });

        if (node.childIds.length > 0) {
            mountDescendants(newTreeNodes, node);
            calculatePositions(orderedTreeNodeIds, newTreeNodes);
        }

        setTreeNodes(newTreeNodes);
    }, [orderedTreeNodeIds, setTreeNodes, treeNodes]);

    const collapseNode = useCallback((nodeId: UUID) => {
        const node = treeNodes[nodeId];

        const newNode = {
            ...node,
            isExpanded: false,
        };
        const newTreeNodes = Object.assign({}, treeNodes, { [nodeId]: newNode });

        if (node.childIds.length > 0) {
            unmountDescendants(newTreeNodes, node);
            calculatePositions(orderedTreeNodeIds, newTreeNodes);
        }

        setTreeNodes(newTreeNodes);
    }, [orderedTreeNodeIds, setTreeNodes, treeNodes]);

    // checkboxes
    const addId = useCallback((nodeId: UUID) => {
        selectedNodeIds.add(nodeId);
        if (onChange) onChange(Array.from(selectedNodeIds));
    }, [selectedNodeIds, onChange]);

    const deleteId = useCallback((nodeId: UUID) => {
        selectedNodeIds.delete(nodeId);
        if (onChange) onChange(Array.from(selectedNodeIds));
    }, [selectedNodeIds, onChange]);

    const isChecked = useCallback((nodeId: UUID) => {
        return selectedNodeIds && selectedNodeIds.has(nodeId);
    }, [selectedNodeIds]);

    const handleCheckboxChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (isChecked(value)) {
            deleteId(value);
        } else {
            addId(value);
        }
    }, [isChecked, addId, deleteId]);

    return {
        expandNode,
        collapseNode,
        addId,
        deleteId,
        isChecked,
        handleCheckboxChange,
    };
}

function mountDescendants(treeNodes: TreeNodes, node: TreeNode) {
    const { descendantIds } = node;

    descendantIds.forEach((id) => {
        const parentId = treeNodes[id].parentId;
        const { isMounted: isParentMounted, isExpanded: isParentExpanded } = treeNodes[parentId as UUID];

        treeNodes[id].isMounted = isParentMounted && isParentExpanded;
    });
}

function unmountDescendants(treeNodes: TreeNodes, node: TreeNode) {
    const { descendantIds } = node;

    descendantIds.forEach((id) => {
        treeNodes[id].isMounted = false;
    });
}
