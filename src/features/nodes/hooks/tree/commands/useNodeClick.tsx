import {
    collapseNode, expandNode, select,
} from '../../../actions';
import useNodeContext from '../useNodeContext';
import useTreeCommands from '../useTreeCommands';
import useTreeContext from '../useTreeContext';
import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        treeBranchId,
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
                id,
            }));
        }
    }, [dispatch, treeBranchId, handleCheckboxChange, id, isEditing, isExpanded, isSelected, treeType]);
}
