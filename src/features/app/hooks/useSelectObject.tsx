import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { BranchDiffPayload } from '../../branch/branches.types';
import { selectNodeFromParams } from '../../nodes/nodes.actions';
import { selectObject } from '../app.thunks';
import { SelectedObject } from '../app.types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const SELECTED_OBJ_Q = 'selectedObject';

export function useSelectObjectFromParams() {
    const [searchParams] = useSearchParams();
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(() => {
        const encodedData = searchParams.get(SELECTED_OBJ_Q);

        if (encodedData) {
            const data = JSON.parse(atob(encodedData));
            dispatch(selectObject(data));

            if (data.objectType === ObjectType.Node) {
                console.log('selecting node from params', data);
                dispatch(selectNodeFromParams({
                    branchId: data.branchId,
                    id: data.objectId,
                }));
            }
        }

        // select node from params only on initial render, so we can't use searchParams as a dependency
        // eslint-disable-next-line
    }, [selectObject]);
}

export default function useSelectObject() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback((obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload) => {
        if (!obj.metadata?.isTmp) {
            const newParams = new URLSearchParams(searchParams);
            const encodedData = btoa(JSON.stringify(obj));

            newParams.set(SELECTED_OBJ_Q, encodedData);

            setSearchParams(newParams);
        }

        dispatch(selectObject(obj));
    }, [dispatch, searchParams, setSearchParams]);
}
