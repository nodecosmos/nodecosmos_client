/* nodecosmos */
import { setSelectedNode } from '../../../../nodes/nodeActions';
import {
    collapseTreeNode, expandTreeNode, setSelectedTreeNode,
} from '../../../treeActions';
import useTreeCommands from '../../useTreeCommands';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        treeNodeId,
        nodeId,
        isExpanded,
        isEditing,
        isSelected,
    } = useNodeContext();

    const { type: treeType } = useTreeContext();
    const {
        addId, deleteId, isChecked,
    } = useTreeCommands();
    const dispatch = useDispatch();

    //------------------------------------------------------------------------------------------------------------------
    const handleCheckboxChange = useCallback(() => {
        const isNodeChecked = isChecked(nodeId);
        if (isNodeChecked) {
            deleteId(nodeId);
        } else {
            addId(nodeId);
        }
    }, [addId, deleteId, isChecked, nodeId]);

    //------------------------------------------------------------------------------------------------------------------
    return useCallback((event) => {
        if (treeType === 'checkbox') {
            event.preventDefault();
            event.stopPropagation();

            dispatch(expandTreeNode(treeNodeId));
            dispatch(setSelectedNode(nodeId));
            dispatch(setSelectedTreeNode(treeNodeId));

            handleCheckboxChange();

            return;
        }

        if (isEditing) return;
        if (isExpanded && isSelected) {
            dispatch(collapseTreeNode(treeNodeId));
            dispatch(setSelectedNode(null));
            dispatch(setSelectedTreeNode(null));
        } else {
            dispatch(expandTreeNode(treeNodeId));
            dispatch(setSelectedNode(nodeId));
            dispatch(setSelectedTreeNode(treeNodeId));
        }
    }, [treeType, isEditing, isExpanded, isSelected, handleCheckboxChange, dispatch, treeNodeId, nodeId]);
}
