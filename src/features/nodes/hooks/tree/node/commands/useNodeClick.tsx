import { NodecosmosDispatch } from '../../../../../../store';
import { ObjectType } from '../../../../../../types';
import { selectObject } from '../../../../../app/app.thunks';
import { select } from '../../../../nodes.actions';
import useTreeCommands from '../../useTreeCommands';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        currentBranchId,
        branchId,
        id,
        isExpanded,
        isEditing,
        isSelected,
    } = useNodeContext();
    const { type: treeType } = useTreeContext();
    const {
        addId, deleteId, isChecked, expandNode, collapseNode,
    } = useTreeCommands();
    const dispatch: NodecosmosDispatch = useDispatch();

    //------------------------------------------------------------------------------------------------------------------
    const handleCheckboxChange = useCallback(() => {
        const isNodeChecked = isChecked(id);
        if (isNodeChecked) {
            deleteId(id);
        } else {
            addId(id);
        }
    }, [addId, deleteId, isChecked, id]);

    //------------------------------------------------------------------------------------------------------------------
    return useCallback((event: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
        if (treeType === 'checkbox') {
            event.preventDefault();
            event.stopPropagation();

            handleCheckboxChange();

            return;
        }

        if (isEditing) return;
        if (isExpanded && isSelected) {
            collapseNode(id);
            dispatch(select(null));
        } else {
            expandNode(id);
            dispatch(select({
                currentBranchId,
                branchId,
                id,
            }));
            dispatch(selectObject({
                currentOriginalBranchId: branchId,
                currentBranchId,
                objectNodeId: id,
                branchId,
                objectId: id,
                objectType: ObjectType.Node,
                metadata: { currentBranchId },
            }));
        }
    }, [
        branchId, collapseNode, dispatch, expandNode, handleCheckboxChange, id,
        isEditing, isExpanded, isSelected, currentBranchId, treeType,
    ]);
}
