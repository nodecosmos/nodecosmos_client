import { useNodePaneContext } from './pane/useNodePaneContext';
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

    useEffect(() => {
        if (id && !isTmp && !description && !loading) {
            setLoading();
            dispatch(getDescription({
                treeBranchId,
                branchId,
                id,
            })).finally(() => {
                unsetLoading();
            });
        }
    },
    [
        branchId, dispatch, id, isTmp, loading, treeBranchId, setLoading, unsetLoading, description,
    ]);
}
