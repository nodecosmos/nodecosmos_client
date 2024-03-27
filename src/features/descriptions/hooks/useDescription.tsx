import { usePaneContext } from '../../../common/hooks/pane/usePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectDescription } from '../descriptions.selectors';
import { getDescription } from '../descriptions.thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useDescription() {
    const {
        objectId,
        branchId,
        objectNodeId,
        loading,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const description = useSelector(selectDescription(branchId, objectId));

    useEffect(() => {
        if (!description?.html && !loading && !fetched) {
            setLoading();
            dispatch(getDescription({
                nodeId: objectNodeId,
                objectId,
                branchId,
            })).then(() => {
                setFetched();
                unsetLoading();
            }).catch((error) => {
                console.error(error);
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    },
    [
        branchId,
        objectNodeId,
        objectId,
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
