import { NodecosmosDispatch } from '../../../store';
import { BranchDiffPayload } from '../../branch/branches.types';
import { selectObject } from '../app.thunks';
import { SelectedObject } from '../app.types';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const SELECTED_OBJ_Q = 'selectedObject';

export function useSelectObjectFromParams() {
    const [searchParams] = useSearchParams();
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        const encodedData = searchParams.get(SELECTED_OBJ_Q);

        if (encodedData) {
            const data = JSON.parse(atob(encodedData));
            dispatch(selectObject(data));
        }

        // eslint-disable-next-line
    }, [selectObject]);
}

export default function useSelectObject() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback((obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload) => {
        const newParams = new URLSearchParams(searchParams);
        const encodedData = btoa(JSON.stringify(obj));

        newParams.set(SELECTED_OBJ_Q, encodedData);

        dispatch(selectObject(obj));

        setSearchParams(newParams);
    }, [dispatch, searchParams, setSearchParams]);
}
