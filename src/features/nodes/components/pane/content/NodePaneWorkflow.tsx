import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import Workflow from '../../../../workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../../workflows/workflows.constants';
import { showWorkflow } from '../../../../workflows/workflows.thunks';
import { selectSelectedNodeId } from '../../../nodes.selectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NodePaneWorkflow() {
    const selectedNodeId = useSelector(selectSelectedNodeId);
    const [loading, setLoading] = React.useState(true);

    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            dispatch(showWorkflow(selectedNodeId)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, loading, selectedNodeId]);

    if (!selectedNodeId) return null;

    if (loading) {
        return <Loader />;
    }

    return (
        <Workflow nodeId={selectedNodeId} context={WorkflowDiagramContext.treeNodeDetails} />
    );
}
