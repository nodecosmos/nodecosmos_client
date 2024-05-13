import useTreeContext, { TreeNode, TreeNodes } from './useTreeContext';
import { NodecosmosDispatch } from '../../../../store';
import { ObjectType, UUID } from '../../../../types';
import useSelectObject from '../../../app/hooks/useSelectObject';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import {
    collapseNodeAction, expandNodeAction, select,
} from '../../nodes.actions';
import { calculatePositions } from '../../utils/position';
import { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useTreeActions() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, originalId } = useBranchContext();

    const {
        orderedTreeNodeIds, selectedNodeIds, treeNodes, onChange, setTreeNodes,
    } = useTreeContext();
    const selectObject = useSelectObject();

    const selectNode = useCallback((id: UUID) => {
        dispatch(select({
            branchId,
            id,
        }));
        selectObject({
            originalId,
            branchId,
            objectNodeId: id,
            objectId: id,
            objectType: ObjectType.Node,
        });
    }, [branchId, dispatch, originalId, selectObject]);

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
        dispatch(expandNodeAction(nodeId));
    }, [dispatch, orderedTreeNodeIds, setTreeNodes, treeNodes]);

    // currently used only for expanding nodes from the URL
    const expandNodes = useCallback((ids: UUID[]) => {
        let newTreeNodes = { ...treeNodes };

        ids.forEach((id) => {
            const node = treeNodes[id];

            if (!node) return;

            if (node.isExpanded) return;

            const newNode = {
                ...node,
                isExpanded: true,
            };

            newTreeNodes = Object.assign({}, newTreeNodes, { [id]: newNode });

            if (node.childIds.length > 0) {
                mountDescendants(newTreeNodes, node);
                calculatePositions(orderedTreeNodeIds, newTreeNodes);
            }
        });

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
        dispatch(collapseNodeAction(nodeId));
    }, [dispatch, orderedTreeNodeIds, setTreeNodes, treeNodes]);

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
        selectNode,
        expandNode,
        expandNodes,
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
