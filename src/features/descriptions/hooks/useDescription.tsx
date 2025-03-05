import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { maybeSelectDescription } from '../descriptions.selectors';
import { getDescription } from '../descriptions.thunks';
import {
    useCallback, useEffect, useRef,
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

    const fetchedById = useRef<FetchedByBranchId>({});

    if (fetchedById.current[branchId] && !fetchedById.current[branchId].has(objectId)) {
        setLoading();
    }

    const fetchDescription = useCallback(async () => {
        if (!description && !loading && !fetchedById.current[branchId]?.has(objectId)) {
            try {
                dispatch(getDescription({
                    rootId,
                    nodeId: objectNodeId,
                    objectId,
                    objectType,
                    branchId,
                }));

                unsetLoading();
            } finally {
                fetchedById.current[branchId] ||= new Set();
                fetchedById.current[branchId].add(objectId);
            }
        }
    },
    [
        rootId,
        branchId,
        objectNodeId,
        objectId,
        objectType,
        loading,
        unsetLoading,
        dispatch,
        description,
    ]);

    useEffect(() => {
        fetchDescription().catch((error) => {
            console.error(error);
        });
    }, [fetchDescription, loading]);
}
