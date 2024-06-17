import ThreadLine from './ThreadLine';
import { timeSince } from '../../../../utils/localTime';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../../nodes/nodes.selectors';
import { ThreadLocation } from '../../comments.types';
import { useThreadContext } from '../../hooks/thread/useThreadContext';
import {
    Box, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function ThreadHeader() {
    const {
        author, createdAt, threadLocation, objectId,
    } = useThreadContext();
    const { branchId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, objectId));
    const nodeTitle = node ? node.title : '';

    let commentAction;
    switch (threadLocation) {
    case ThreadLocation.ContributionRequestNode:
        commentAction = <span>commented node <em>{nodeTitle}</em></span>;
        break;
    case ThreadLocation.ContributionRequestFlow:
        commentAction = <span>commented flow <em>{nodeTitle}</em></span>;
        break;
    case ThreadLocation.ContributionRequestFlowStep:
        commentAction = <span>commented flow step <em>{nodeTitle}</em></span>;
        break;
    case ThreadLocation.ContributionRequestInputOutput:
        commentAction = <span>commented input/output <em>{nodeTitle}</em></span>;
        break;
    case ThreadLocation.ContributionRequestObjectDescription:
        commentAction = <span>commented line <em>{nodeTitle}</em></span>;
        break;
    default:
        commentAction = 'commented';
    }

    return (
        <div>
            <Box display="flex" alignItems="center" zIndex={1} position="relative" mb={2}>
                <Link component={RouterLink} to={`/${author.username}`}>
                    <Typography variant="body2" color="text.tertiary" fontWeight="bold">
                        @{author.username}
                    </Typography>
                </Link>

                <Typography variant="body2" color="text.tertiary" ml={1}>
                    {commentAction} · {timeSince(createdAt)}
                </Typography>
            </Box>

            <ThreadLine />
        </div>
    );
}
