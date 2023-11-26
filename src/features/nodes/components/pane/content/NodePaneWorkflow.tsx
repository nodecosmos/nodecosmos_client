import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import Workflow from '../../../../workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../../workflows/constants';
import { showWorkflow } from '../../../../workflows/thunks';
import { selectSelectedNodePrimaryKey } from '../../../selectors';
import { NodePrimaryKey } from '../../../types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NodePaneWorkflow() {
    const { id } = useSelector(selectSelectedNodePrimaryKey) as NodePrimaryKey;
    const [loading, setLoading] = React.useState(true);

    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            dispatch(showWorkflow(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, loading, id]);

    if (!id) return null;

    if (loading) {
        return <Loader />;
    }

    return (
        <Workflow nodeId={id} context={WorkflowDiagramContext.treeNodeDetails} />
    );
}
