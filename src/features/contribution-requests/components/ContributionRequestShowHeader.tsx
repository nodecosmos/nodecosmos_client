import { selectCurrentContributionRequest } from '../contributionRequests.selectors';
import { faCircle, faArrowRight } from '@fortawesome/pro-light-svg-icons';
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

    if (!cr) return null;

    const breadcrumbs = [
        <MuiLink
            underline="hover"
            key="1"
            color="text.tertiary"
            component={Link}
            relative="route"
            to={`nodes/${cr.rootId}/${cr.nodeId}/contribution_requests`}
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
        <>
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
            <Box
                display="flex"
                alignItems="center">
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    pl={2}
                    sx={{
                        borderLeft: 1,
                        borderColor: 'borders.3',
                        svg: { color: 'diff.added.fg' },
                    }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="text.tertiary">Created</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.removed.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="text.tertiary">Removed</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.edited.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="text.tertiary">Edited</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.conflict.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="text.tertiary">Conflict</Typography>
                </Box>
            </Box>
        </>
    );
}
