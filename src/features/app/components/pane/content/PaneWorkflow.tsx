import Loader from '../../../../../common/components/Loader';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import Workflow from '../../../../workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../../workflows/constants';
import { showWorkflow } from '../../../../workflows/worfklow.thunks';
import { selectOptWorkflow } from '../../../../workflows/workflow.selectors';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PaneWorkflow() {
    const { objectId, objectType } = usePaneContext();
    const { originalId, branchId } = useBranchParams();
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
                originalId,
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
        originalId,
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
