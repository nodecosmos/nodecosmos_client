import { updateState } from '../../../nodes.actions';
import useAuthorizeNodeAction from '../useAuthorizeNodeAction';
import useNodeContext from '../useNodeContext';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeEdit() {
    const { branchId, id } = useNodeContext();
    const dispatch = useDispatch();
    const authorizeNodeAction = useAuthorizeNodeAction();

    return useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (!authorizeNodeAction()) {
            return;
        }

        event.stopPropagation();

        dispatch(updateState({
            branchId,
            id,
            isEditing: true,
        }));
    }, [authorizeNodeAction, dispatch, branchId, id]);
}
