import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import useAppContext from '../../../../app/hooks/useAppContext';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { select } from '../../../nodes.actions';
import { TreeType } from '../../../nodes.types';
import useTreeContext from '../../tree/useTreeContext';
import useNodeContext from '../useNodeContext';
import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeClick() {
    const {
        id,
        isExpanded,
        isEditing,
        isSelected,
        isCreationInProgress,
        isTmp,
        ancestorIds,
    } = useNodeContext();
    const {
        type: treeType, addId, deleteId, isChecked, expandNode, collapseNode,
    } = useTreeContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, originalId } = useBranchContext();
    const { selectObject } = useAppContext();

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
        if (isCreationInProgress) return;

        if (treeType === TreeType.Checkbox) {
            event.preventDefault();
            event.stopPropagation();

            handleCheckboxChange();

            if (event.target instanceof HTMLInputElement) {
                return;
            }
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

            if (treeType !== TreeType.Checkbox) {
                selectObject({
                    originalId,
                    branchId,
                    objectNodeId: id,
                    objectId: id,
                    objectType: ObjectType.Node,
                    metadata: {
                        isTmp,
                        ancestorIds,
                    },
                });
            }
        }
    },
    [
        branchId, collapseNode, dispatch, expandNode, handleCheckboxChange, id, selectObject,
        isEditing, isExpanded, isSelected, treeType, originalId, isCreationInProgress, isTmp,
        ancestorIds,
    ]);
}
