import { NodecosmosTheme } from '../../../themes/type';
import { ContributionRequestStatus } from '../contributionRequest.types';
import { faCircleO } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Tooltip, useTheme,
} from '@mui/material';
import React from 'react';

interface Props {
    status: ContributionRequestStatus;
}

export default function ContributionRequestStatusIcon({ status }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const statusColors = {
        [ContributionRequestStatus.WorkInProgress]: theme.palette.toolbar.yellow,
        [ContributionRequestStatus.Published]: theme.palette.toolbar.green,
        [ContributionRequestStatus.Merged]: theme.palette.toolbar.purple,
        [ContributionRequestStatus.Closed]: theme.palette.toolbar.lightRed,
    };

    return (
        <Box sx={{
            svg: {
                fontSize: '1rem',
                cursor: 'pointer',
            },
        }}
        >
            <Tooltip title={status} placement="top">
                <FontAwesomeIcon icon={faCircleO} color={statusColors[status]} />
            </Tooltip>
        </Box>
    );
}
