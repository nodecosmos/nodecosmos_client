import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import EditTitleField from '../../../common/components/EditTItleField';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { withOpacity } from '../../../utils/colors';
import useAuthorizeBranch from '../../branch/hooks/useAuthorizeBranch';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { updateContributionRequestTitle } from '../contributionRequests.thunks';
import { useStatus } from '../hooks/useStatus';
import { Box, Chip } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SX = {
    p: 0,
    pb: 2,
    transition: 'border-color 0.2s',
    '&:hover': { borderColor: 'borders.5' },
    '&:focus-within': {
        borderColor: 'borders.5',
        transition: 'none',
    },
};

export default function ContributionRequestTitle() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id: nodeId, branchId: id } = useParams();

    if (!nodeId || !id) {
        throw new Error('Missing required params');
    }

    const handleTitleChange = useCallback(async (title: string) => {
        await dispatch(updateContributionRequestTitle({
            nodeId,
            id,
            title,
        }));
    }, [dispatch, id, nodeId]);

    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const { color: statusColor, label: statusLabel } = useStatus(contributionRequest.status);
    const authorized = useAuthorizeBranch();

    if (!contributionRequest) {
        return null;
    }

    const { title } = contributionRequest;

    return (
        <Box
            display="flex"
            borderBottom={2}
            borderColor="transparent"
            sx={SX}
            flexDirection={{
                xs: 'column',
                md: 'row',
            }}
            alignItems={{
                xs: 'flex-start',
                md: 'center',
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

            <Box
                ml={{
                    xs: 0,
                    md: 2,
                }}
                mt={{
                    xs: 2,
                    md: 0,
                }}
                width={1}>
                <EditTitleField
                    authorized={authorized}
                    inputFontSize="2rem"
                    variant="h5"
                    title={title}
                    color="text.secondary"
                    onChange={handleTitleChange}
                    maxWidth="100%"
                    inputHeight={32}
                    inputBorder="transparent!important"
                />
            </Box>
        </Box>
    );
}
