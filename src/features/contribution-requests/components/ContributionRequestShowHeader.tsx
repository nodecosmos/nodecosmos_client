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
            className="display-flex align-center text-tertiary max-w-200 ml-1"
            underline="hover"
            key="1"
            color="texts.link"
            component={Link}
            relative="route"
            to={`nodes/${cr.rootId}/${cr.nodeId}/contribution_requests`}
            fontWeight="bold"
        >
            Contribution Requests
        </MuiLink>
        ,
        <Typography
            variant="body2"
            color="texts.link"
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
                        <Box color="texts.tertiary" fontSize={12}>
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
                    <Typography ml={1} variant="caption" color="texts.tertiary">Created</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.removed.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="texts.tertiary">Removed</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.edited.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="texts.tertiary">Edited</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    sx={{ svg: { color: 'diff.conflict.fg' } }}>
                    <FontAwesomeIcon icon={faCircle} size="2xs" />
                    <Typography ml={1} variant="caption" color="texts.tertiary">Conflict</Typography>
                </Box>
            </Box>
        </>
    );
}
