import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectDescription } from '../descriptions.selectors';
import { getDescription } from '../descriptions.thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useDescription() {
    const {
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

    useEffect(() => {
        if (!description?.html && !loading && !fetched) {
            setLoading();
            dispatch(getDescription({
                nodeId: objectNodeId,
                objectId,
                objectType,
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
