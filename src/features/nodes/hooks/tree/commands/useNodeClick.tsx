import {
    collapseNode, expandNode, select,
} from '../../../actions';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import useTreeCommands from '../useTreeCommands';
import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        treeBranchId,
        branchId,
        id,
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
            dispatch(collapseNode({
                treeBranchId,
                id,
            }));
            dispatch(select(null));
        } else {
            dispatch(expandNode({
                treeBranchId,
                id,
            }));
            dispatch(select({
                treeBranchId,
                branchId,
                id,
            }));
        }
    }, [treeType, isEditing, isExpanded, isSelected, handleCheckboxChange, dispatch, treeBranchId, id, branchId]);
}
