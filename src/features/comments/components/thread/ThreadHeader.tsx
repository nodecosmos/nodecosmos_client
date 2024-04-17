import ThreadLine from './ThreadLine';
import { timeSince } from '../../../../utils/localTime';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { selectOptNode } from '../../../nodes/nodes.selectors';
import { ThreadType } from '../../comments.types';
import { useThreadContext } from '../../hooks/thread/useThreadContext';
import {
    Box, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function ThreadHeader() {
    const {
        author, createdAt, threadType, threadNodeId,
    } = useThreadContext();
    const { currentBranchId } = useBranchParams();
    const node = useSelector(selectOptNode(currentBranchId, threadNodeId));
    const nodeTitle = node ? node.title : '';

    let commentAction;
    switch (threadType) {
    case ThreadType.ContributionRequestNodeAddition:
        commentAction = <span>commented added node <em>{nodeTitle}</em></span>;
        break;
    case ThreadType.ContributionRequestNodeRemoval:
        commentAction = <span>commented removed node <em>{nodeTitle}</em></span>;
        break;
    case ThreadType.ContributionRequestNodeDescription:
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
