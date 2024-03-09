import { useNodePaneContext } from './pane/useNodePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { getDescription } from '../nodes.thunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeDescription() {
    const {
        description,
        treeBranchId, // branchId of the current tree
        isTmp,
        id,
        branchId, // branchId of the selected node
        loading,
        setLoading,
        unsetLoading,
    } = useNodePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    useEffect(() => {
        if (id && !isTmp && !description && !loading && !fetched) {
            console.log(id);
            setLoading();
            dispatch(getDescription({
                treeBranchId,
                branchId,
                id,
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
        branchId, dispatch, id, isTmp, loading, treeBranchId,
        setLoading, unsetLoading, description,
        fetched, setFetched, unsetFetched,
    ]);
}
