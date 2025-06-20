import { selectCurrentThread } from '../../comments.selectors';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Breadcrumbs, Link as MuiLink, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ThreadShowHeader() {
    const thread = useSelector(selectCurrentThread);

    if (!thread) return null;

    const breadcrumbs = [
        <MuiLink
            className="display-flex align-center text-tertiary max-w-200 ml-1"
            underline="hover"
            key="1"
            color="texts.tertiary"
            component={Link}
            relative="route"
            to={`nodes/${thread.branchId}/${thread.objectId}/threads`}
            variant="body2"
            fontWeight="bold"
        >
            Threads
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
            {thread?.title}
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
        </>
    );
}
