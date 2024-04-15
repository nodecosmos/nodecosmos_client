import Workflow from '../../../../features/workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../../features/workflows/constants';
import { showWorkflow } from '../../../../features/workflows/worfklow.thunks';
import { selectOptWorkflow } from '../../../../features/workflows/workflow.selectors';
import { NodecosmosDispatch } from '../../../../store';
import { ObjectType } from '../../../../types';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import Loader from '../../Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PaneWorkflow() {
    const {
        objectId, objectType, branchId,
    } = usePaneContext();
    if (objectType !== ObjectType.Node) {
        throw new Error('PaneWorkflow is only supported for nodes');
    }

    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(selectOptWorkflow(branchId, objectId));

    useEffect(() => {
        if (!fetched && !loading && !workflow?.nodeId) {
            setLoading();
            dispatch(showWorkflow({
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

    return (
        <>
            {workflow && <Workflow
                nodeId={objectId}
                branchId={branchId}
                context={WorkflowDiagramContext.treeNodeDetails} />}
        </>
    );
}
