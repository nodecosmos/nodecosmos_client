import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import EditTitleField from '../../../common/components/EditTItleField';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { withOpacity } from '../../../utils/colors';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { updateContributionRequestState } from '../contributionRequestsSlice';
import { useStatus } from '../hooks/useStatus';
import { Box, Chip } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestTitle() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id: nodeId, branchId: id } = useParams();
    const onTitleChange = useCallback((value: string) => {
        dispatch(updateContributionRequestState({
            nodeId,
            id,
            title: value,
        }));
    }, [dispatch, id, nodeId]);
    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const { color: statusColor, label: statusLabel } = useStatus(contributionRequest.status);

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
                p: 0,
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'borders.5' },
                '&:focus-within': {
                    borderColor: 'borders.5',
                    transition: 'none',
                },
            }}
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <Chip
                    variant="filled"
                    color="primary"
                    sx={{
                        px: 2,
                        color: statusColor,
                        backgroundColor: withOpacity(statusColor, 0.1),
                    }}
                    label={statusLabel}
                    icon={<ContributionRequestStatusIcon status={contributionRequest.status} />}
                />
            </Box>

            <Box ml={2} width={1}>
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
        </Box>
    );
}
