import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import Workflow from '../../../../workflows/components/Workflow';
import { selectWorkflowByNodeId } from '../../../../workflows/workflows.selectors';
import { showWorkflow } from '../../../../workflows/workflows.thunks';
import { selectSelectedNodeId } from '../../../nodes.selectors';
import { WorkflowDiagramContext } from '../../../../workflows/workflows.constants';
import { NodecosmosDispatch } from '../../../../../store';

export default function NodePaneWorkflow() {
    const selectedNodeId = useSelector(selectSelectedNodeId);
    const [loading, setLoading] = React.useState(true);

    const workflow = useSelector(selectWorkflowByNodeId(selectedNodeId));

    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (selectedNodeId) {
            if (!workflow.id) setLoading(true);
            dispatch(showWorkflow(selectedNodeId)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, selectedNodeId, workflow.id]);

    if (!selectedNodeId) return null;

    if (loading) {
        return <Loader />;
    }

    return (
        <Workflow nodeId={selectedNodeId} context={WorkflowDiagramContext.treeNodeDetails} />
    );
}
