import { CONTRIBUTION_REQUEST_STATUS } from '../contributionRequests.constants';
import { faCircleO } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Tooltip, useTheme, 
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ContributionRequestStatusIcon({ status }) {
    const theme = useTheme();

    const statusColors = {
        [CONTRIBUTION_REQUEST_STATUS.WORK_IN_PROGRESS]: theme.palette.toolbar.yellow,
        [CONTRIBUTION_REQUEST_STATUS.PUBLISHED]: theme.palette.toolbar.green,
        [CONTRIBUTION_REQUEST_STATUS.MERGED]: theme.palette.toolbar.purple,
        [CONTRIBUTION_REQUEST_STATUS.CLOSED]: theme.palette.toolbar.lightRed,
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

ContributionRequestStatusIcon.propTypes = {
    status: PropTypes.string.isRequired,
};
