import { SELECTED_OBJ_Q } from './useSelectObject';
import { NodecosmosDispatch } from '../../../store';
import { BranchDiffPayload } from '../../branch/branches.types';
import { selectObject } from '../app.thunks';
import { SelectedObject } from '../app.types';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

interface AppContextType {
    selectObject: (obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload) => void;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function useAppContextCreator() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectObjectCb = useCallback((
        obj: Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload,
    ) => {
        if (!obj.metadata?.isTmp) {
            const newParams = new URLSearchParams(searchParams);
            const encodedData = btoa(JSON.stringify(obj));

            newParams.set(SELECTED_OBJ_Q, encodedData);
            setSearchParams(newParams);
        }

        dispatch(selectObject(obj));
    }, [dispatch, searchParams, setSearchParams]);

    return useMemo(() => ({
        AppContext,
        ctxValue: { selectObject: selectObjectCb },
    }), [selectObjectCb]);
}

export default function useAppContext() {
    return React.useContext(AppContext);
}
