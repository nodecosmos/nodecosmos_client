import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import { WorkflowDiagramObject } from '../../../../workflows/types';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectFlowAttribute, selectFlowPrimaryKey } from '../../../flows.selectors';
import { getFlowDescription } from '../../../flows.thunks';
import { Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FlowPaneDescription() {
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;

    const description = useSelector(selectFlowAttribute(id, 'description'));
    const flowPrimaryKey = useSelector(selectFlowPrimaryKey(id));

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
        <DescriptionContainer>
            {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || noDescriptionContent}
        </DescriptionContainer>
    );
}
