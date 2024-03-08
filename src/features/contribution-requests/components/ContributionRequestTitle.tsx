import EditTitleField from '../../../common/components/EditTItleField';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { updateContributionRequestState } from '../contributionRequestsSlice';
import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestTitle() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id: nodeId, contributionRequestId: id } = useParams();
    const onTitleChange = useCallback((value: string) => {
        dispatch(updateContributionRequestState({
            nodeId,
            id,
            title: value,
        }));
    }, [dispatch, id, nodeId]);
    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));

    if (!contributionRequest) {
        return null;
    }

    const { title } = contributionRequest;

    return (
        <Box
            display="flex"
            alignItems="center"
            borderBottom={2}
            borderColor="transparent"
            sx={{
                p: 1,
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'borders.5' },
                '&:focus-within': {
                    borderColor: 'borders.5',
                    transition: 'none',
                },
            }}
        >
            <EditTitleField
                inputFontSize="2rem"
                variant="h2"
                title={title}
                endpoint="/contribution_requests/title"
                reqData={{
                    nodeId,
                    id,
                }}
                color="text.secondary"
                onChange={onTitleChange}
                maxWidth="100%"
                inputHeight="auto"
                inputBorder="transparent!important"
                inputP={0}
            />
        </Box>
    );
}
