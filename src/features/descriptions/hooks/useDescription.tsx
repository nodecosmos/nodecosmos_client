import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectDescription } from '../descriptions.selectors';
import { getDescription } from '../descriptions.thunks';
import { useEffect, useRef } from 'react';
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
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const description = useSelector(selectDescription(branchId, objectId));

    const fetchedById = useRef<FetchedByBranchId>({});

    useEffect(() => {
        if (!description?.html && !loading && !fetched && !fetchedById.current[branchId]?.has(objectId)) {
            setLoading();
            dispatch(getDescription({
                rootId,
                nodeId: objectNodeId,
                objectId,
                objectType,
                branchId,
            })).catch((error) => {
                console.error(error);
            }).finally(() => {
                fetchedById.current[branchId] ||= new Set();
                fetchedById.current[branchId].add(objectId);
                unsetLoading();
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    },
    [
        rootId,
        branchId,
        objectNodeId,
        objectId,
        objectType,
        fetched,
        loading,
        setLoading,
        unsetFetched,
        unsetLoading,
        dispatch,
        description?.html,
        setFetched,
    ]);
}
