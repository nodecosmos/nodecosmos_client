import { NodecosmosDispatch } from '../../../store';
import { BranchDiffPayload } from '../../branch/branches.types';
import { selectObject } from '../app.thunks';
import { SelectedObject } from '../app.types';
import { setIsPaneLoading } from '../appSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const SELECTED_OBJ_Q = 'selectedObject';

export function useSelectObject() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback((
        obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload,
    ) => {
        if (!obj.metadata?.isTmp) {
            const newParams = new URLSearchParams(searchParams);
            const encodedData = btoa(JSON.stringify(obj));

            newParams.set(SELECTED_OBJ_Q, encodedData);
            setSearchParams(newParams);
        }

        dispatch(setIsPaneLoading(true));

        requestAnimationFrame(() => {
            dispatch(selectObject(obj));
        });

        requestAnimationFrame(() => {
            dispatch(setIsPaneLoading(false));
        });
    }, [dispatch, searchParams, setSearchParams]);
}

export function useSelectObjectFromParams() {
    const [searchParams] = useSearchParams();
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(() => {
        const encodedData = searchParams.get(SELECTED_OBJ_Q);

        if (encodedData) {
            const data = JSON.parse(atob(encodedData));
            dispatch(selectObject(data));
        }

        // select node from params only on initial render, so we can't use searchParams as a dependency
        // eslint-disable-next-line
    }, [selectObject]);
}
