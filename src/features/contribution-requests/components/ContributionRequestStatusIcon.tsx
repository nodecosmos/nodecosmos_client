import { ContributionRequestStatus } from '../contributionRequest.types';
import { useStatus } from '../hooks/useStatus';
import { faCircleO } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
    status: ContributionRequestStatus;
    fontSize?: string;
}

function ContributionRequestStatusIcon(props: Props) {
    const { status, fontSize = '1rem' } = props;
    const { color } = useStatus(status);

    const style = useMemo(() => ({
        fontSize,
        cursor: 'pointer',
    }), [fontSize]);

    return (
        <Box display="flex" alignItems="center">
            <Tooltip title={status} placement="top">
                <FontAwesomeIcon icon={faCircleO} color={color} style={style} />
            </Tooltip>
        </Box>
    );
}

export default React.memo(ContributionRequestStatusIcon);
