import Loader from '../../../../../common/components/Loader';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import Workflow from '../../../../workflows/components/Workflow';
import { showWorkflow } from '../../../../workflows/worfklow.thunks';
import { maybeSelectWorkflow } from '../../../../workflows/workflow.selectors';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PaneWorkflow() {
    const {
        rootId, objectId, objectType,
    } = usePaneContext();
    const { branchId } = useBranchContext();
    if (objectType !== ObjectType.Node) {
        throw new Error('PaneWorkflow is only supported for nodes');
    }

    if (!branchId) {
        throw new Error('PaneWorkflow requires a branchId');
    }

    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(maybeSelectWorkflow(branchId, objectId));

    useEffect(() => {
        if (!fetched && !loading && !workflow?.nodeId) {
            setLoading();
            dispatch(showWorkflow({
                rootId,
                nodeId: objectId,
                branchId,
            })).then(() => {
                setFetched();
                setTimeout(unsetLoading, 250);
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
        dispatch,
        fetched,
        loading,
        objectId,
        setFetched,
        setLoading,
        unsetFetched,
        unsetLoading,
        workflow?.nodeId,
    ]);

    if (!objectId) return null;

    if (loading) {
        return <Loader />;
    }

    return workflow && <Workflow nodeId={objectId} branchId={branchId} insidePane />;
}
