import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { selectNodeFromParams } from '../../nodes/nodes.actions';
import { selectObject } from '../app.thunks';
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
