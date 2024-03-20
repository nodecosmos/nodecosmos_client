import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../../workflows/workflow.types';
import { selectFlowAttribute, selectFlowPrimaryKey } from '../../../flows.selectors';
import { getFlowDescription } from '../../../flows.thunks';
import { Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FlowPaneDescription() {
    const { branchId, id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;

    const description = useSelector(selectFlowAttribute(branchId, id, 'description'));
    const flowPrimaryKey = useSelector(selectFlowPrimaryKey(branchId, id));

    const [loading, setLoading] = React.useState(!description);
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            dispatch(getFlowDescription(flowPrimaryKey)).then(() => setLoading(false));
        }
    }, [dispatch, loading, flowPrimaryKey]);

    if (loading) {
        return <Loader />;
    }

    const noDescriptionContent = (
        <>
            <Typography color="text.secondary" align="center" fontWeight="bold">
        Flow has no description yet.
            </Typography>
            <Typography color="text.secondary" align="center" fontSize={30}>
        ¯\_(ツ)_/¯
            </Typography>
        </>
    );

    return (
        (
            description
            && <Box className="DescriptionHTML" pb={2} dangerouslySetInnerHTML={{ __html: description }} />
        )
        || noDescriptionContent
    );
}
