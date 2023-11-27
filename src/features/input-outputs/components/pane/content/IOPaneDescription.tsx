import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import Loader from '../../../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../../../store';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../../workflows/workflow.types';
import { selectInputOutputById, selectInputOutputPrimaryKey } from '../../../inputOutputs.selectors';
import { getIODescription } from '../../../inputOutputs.thunks';
import { Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function IOPaneDescription() {
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const dispatch: NodecosmosDispatch = useDispatch();

    const { description } = useSelector(selectInputOutputById(id));
    const primaryKey = useSelector(selectInputOutputPrimaryKey(id));

    const [loading, setLoading] = React.useState(!description);

    useEffect(() => {
        if (loading) {
            dispatch(getIODescription(primaryKey)).then(() => setLoading(false));
        }
    }, [dispatch, loading, primaryKey]);

    if (loading) {
        return <Loader />;
    }

    const noDescriptionContent = (
        <>
            <Typography color="text.secondary" align="center" fontWeight="bold">
        IO has no description yet.
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
