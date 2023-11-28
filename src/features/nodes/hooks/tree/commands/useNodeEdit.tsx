import { updateState } from '../../../actions';
import useNodeContext from '../useNodeContext';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeEdit() {
    const { branchId, id } = useNodeContext();
    const dispatch = useDispatch();

    return useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(updateState({ branchId, id, isEditing: true }));
    }, [branchId, dispatch, id]);
}
