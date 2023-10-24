import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectFlowAttribute } from '../../../flows.selectors';
import { getFlowDescription } from '../../../flows.thunks';

export default function FlowPaneDescription() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const { id, workflowId } = selectedWorkflowDiagramObject;

    const description = useSelector(selectFlowAttribute(workflowId, id, 'description'));
    const nodeId = useSelector(selectFlowAttribute(workflowId, id, 'nodeId'));

    const [loading, setLoading] = React.useState(!description);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!description) {
            dispatch(getFlowDescription({
                nodeId,
                workflowId,
                id,
            })).then(() => setLoading(false));
        }
    }, [dispatch, nodeId, workflowId, id, description]);

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
