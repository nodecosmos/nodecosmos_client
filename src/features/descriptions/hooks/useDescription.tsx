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
        description?.html, dispatch, fetched, loading, branchId, objectId,
        setFetched, setLoading, unsetFetched, unsetLoading,
    ]);
}
