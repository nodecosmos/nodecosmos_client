import { NodecosmosDispatch } from '../../../store';
import { BranchDiffPayload } from '../../branch/branches.types';
import { selectObject } from '../app.thunks';
import { SelectedObject } from '../app.types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const SELECTED_OBJ_Q = 'selectedObject';

export default function useSelectObject() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback((obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(SELECTED_OBJ_Q, JSON.stringify(obj));

        dispatch(selectObject(obj));

        setSearchParams(newParams);
    }, [dispatch, searchParams, setSearchParams]);
}
