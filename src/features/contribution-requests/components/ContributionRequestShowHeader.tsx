import { selectCurrentContributionRequest } from '../contributionRequests.selectors';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Breadcrumbs, Link as MuiLink, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ContributionRequestShowHeader() {
    const cr = useSelector(selectCurrentContributionRequest);

    const breadcrumbs = [
        <MuiLink
            underline="hover"
            key="1"
            color="text.tertiary"
            component={Link}
            relative="route"
            to={`nodes/${cr?.nodeId}/contribution_requests`}
            variant="body2"
            fontWeight="bold"
        >
            Contribution Requests
        </MuiLink>
        ,
        <Typography
            variant="body2"
            color="text.link"
            fontWeight="bold"
            p={0.5}
            px={2}
            borderRadius={1}
            key="2"
            sx={{ backgroundColor: 'toolbar.active' }}
        >
            {cr?.title}
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={(
                    <Box color="text.tertiary" fontSize={14}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Box>
                )}
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
