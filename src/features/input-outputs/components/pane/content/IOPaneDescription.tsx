import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById, selectInputOutputPrimaryKey } from '../../../inputOutputs.selectors';
import { getIODescription } from '../../../inputOutputs.thunks';
import { WorkflowDiagramObject } from '../../../../workflows/types';
import { NodecosmosDispatch } from '../../../../../store';

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
