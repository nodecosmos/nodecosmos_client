import { updateState } from '../../../../actions';
import useNodeContext from '../useNodeContext';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeEdit() {
    const { currentBranchId, id } = useNodeContext();
    const dispatch = useDispatch();

    return useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        dispatch(updateState({
            currentBranchId,
            id,
            isEditing: true,
        }));
    }, [dispatch, id, currentBranchId]);
}
