import { NodecosmosDispatch } from '../../../../../../store';
import { ObjectType } from '../../../../../../types';
import { selectObject } from '../../../../../app/app.thunks';
import useBranchParams from '../../../../../branch/hooks/useBranchParams';
import { select } from '../../../../nodes.actions';
import useTreeActions from '../../useTreeActions';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        id,
        isExpanded,
        isEditing,
        isSelected,
    } = useNodeContext();
    const { type: treeType } = useTreeContext();
    const {
        addId, deleteId, isChecked, expandNode, collapseNode,
    } = useTreeActions();
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, originalId } = useBranchParams();

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
                branchId,
                id,
            }));
            dispatch(selectObject({
                originalId,
                branchId,
                objectNodeId: id,
                objectId: id,
                objectType: ObjectType.Node,
            }));
        }
    }, [
        branchId, collapseNode, dispatch, expandNode, handleCheckboxChange, id,
        isEditing, isExpanded, isSelected, treeType, originalId,
    ]);
}
