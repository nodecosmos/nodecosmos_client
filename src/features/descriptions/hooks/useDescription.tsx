import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { executeWithConditionalLoader } from '../../../utils/loader';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectDescription } from '../descriptions.selectors';
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
    const description = useSelector(selectDescription(branchId, objectId));

    const fetchedById = useRef<FetchedByBranchId>({});

    const fetchDescription = useCallback(async () => {
        if (!description?.html && !loading && !fetchedById.current[branchId]?.has(objectId)) {
            try {
                const action = getDescription({
                    rootId,
                    nodeId: objectNodeId,
                    objectId,
                    objectType,
                    branchId,
                });

                // @ts-expect-error It complains about the type of the action, but it's correct
                await executeWithConditionalLoader(dispatch, [action], setLoading, unsetLoading);
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
        setLoading,
        unsetLoading,
        dispatch,
        description?.html,
    ]);

    useEffect(() => {
        fetchDescription().catch((error) => {
            console.error(error);
        });
    }, [fetchDescription, loading]);
}
