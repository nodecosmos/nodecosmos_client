import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Box,
    Breadcrumbs, Link as MuiLink, Stack, Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { selectCurrentContributionRequest } from '../contributionRequests.selectors';

export default function ContributionRequestShowHeader() {
    const cr = useSelector(selectCurrentContributionRequest);

    const breadcrumbs = [
        <MuiLink
            underline="hover"
            key="1"
            color="text.tertiary"
            component={Link}
            relative="path"
            to="../"
            variant="body2"
            fontWeight="bold"
        >
      Contribution Requests
        </MuiLink>,
        <Typography
            variant="body2"
            color="text.link"
            fontWeight="bold"
            p={0.5}
            px={2}
            borderRadius={1}
            backgroundColor="toolbar.active"
            key="2"
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
