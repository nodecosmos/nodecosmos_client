import { ContributionRequestStatus } from '../contributionRequest.types';
import { useStatus } from '../hooks/useStatus';
import { faCircleO } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
    status: ContributionRequestStatus;
    fontSize?: string;
}

export default function ContributionRequestStatusIcon(props: Props) {
    const { status, fontSize = '1rem' } = props;
    const { color } = useStatus(status);

    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                svg: {
                    fontSize,
                    cursor: 'pointer',
                },
            }}
        >
            <Tooltip title={status} placement="top">
                <FontAwesomeIcon icon={faCircleO} color={color} />
            </Tooltip>
        </Box>
    );
}
