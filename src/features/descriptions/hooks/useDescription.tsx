import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { maybeSelectDescription } from '../descriptions.selectors';
import { getDescription } from '../descriptions.thunks';
import {
    useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

type FetchedByBranchId = Record<UUID, Set<UUID>>;

export default function useDescription() {
    const {
        rootId,
        mainObjectId: objectId,
        branchId,
        objectNodeId,
        objectType,
        loading,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const description = useSelector(maybeSelectDescription(branchId, objectId));
    const [fetchedById, setFetchedById] = useState<FetchedByBranchId>({});
    const fetched = description || (fetchedById[branchId] && fetchedById[branchId].has(objectId));
    const fetchDescription = useCallback(async () => {
        if (!description && !loading && !fetched) {
            try {
                setLoading();

                await dispatch(getDescription({
                    rootId,
                    nodeId: objectNodeId,
                    objectId,
                    objectType,
                    branchId,
                }));

                unsetLoading();
            } finally {
                setFetchedById(
                    (prev) => ({
                        ...prev,
                        [branchId]: new Set([...(prev[branchId] || []), objectId]),
                    }),
                );
            }
        }
    },
    [
        fetched,
        rootId,
        branchId,
        objectNodeId,
        objectId,
        objectType,
        loading,
        setLoading,
        unsetLoading,
        dispatch,
        description,
    ]);

    useEffect(() => {
        fetchDescription().catch((error) => {
            console.error(error);
        });
    }, [fetchDescription, loading]);

    return [fetched];
}
