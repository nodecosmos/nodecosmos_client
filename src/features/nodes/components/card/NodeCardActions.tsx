import abbreviateNumber from '../../../../utils/abbreviateNumber';
import { LikeType } from '../../../likes/likes.types';
import { IndexNode } from '../../nodes.types';
import LikeButton from '../LikeButton';
import { faCodePullRequest, faUserGroup } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, CardActions, Tooltip, Typography,
} from '@mui/material';
import React from 'react';

export default function NodeCardActions({ node }: {node: IndexNode}) {
    return (
        <CardActions
            sx={{
                p: 2,
                gap: 1,
            }}
        >
            <LikeButton
                objectType={LikeType.Node}
                id={node.id}
                fontSize={16}
                rootId={node.rootId}
                likeCount={node.likeCount}
            />
            <Tooltip title="Contribution Requests">
                <div className="text-tertiary fs-16 display-flex align-center">
                    <Box width={36} height={36} display="flex" alignItems="center" justifyContent="center">
                        <FontAwesomeIcon
                            icon={faCodePullRequest}
                        />
                    </Box>
                    <Typography variant="caption" color="text.tertiary">
                        {abbreviateNumber(node.contributionRequestsCount || 0)}
                    </Typography>
                </div>
            </Tooltip>
            <Tooltip title="Threads">
                <div className="text-tertiary fs-16 display-flex align-center">
                    <Box width={36} height={36} display="flex" alignItems="center" justifyContent="center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                        />
                    </Box>
                    <Typography variant="caption" color="text.tertiary">
                        {abbreviateNumber(node.threadsCount || 0)}
                    </Typography>
                </div>
            </Tooltip>
        </CardActions>
    );
}
