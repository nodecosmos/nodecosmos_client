import LikeButton from './tree-node-toolbar/LikeButton';
import { IndexNode } from '../nodes.types';
import {
    faCodePullRequest, faHashtag, faUserGroup,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, CardActions, Tooltip, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function NodeCardActions({ node }: {node: IndexNode}) {
    return (
        <CardActions
            sx={{
                p: 2,
                gap: 1,
            }}
        >
            <LikeButton nodeId={node.id} fontSize={16} likesCount={node.likesCount} />
            <Tooltip title="Nodes">
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ svg: { fontSize: 16, color: 'text.tertiary' } }}
                >
                    <Box width={36} height={36} display="flex" alignItems="center" justifyContent="center">
                        <FontAwesomeIcon
                            icon={faHashtag}
                        />
                    </Box>
                    <Typography variant="caption" color="text.tertiary">
            0
                    </Typography>
                </Box>
            </Tooltip>
            <Tooltip title="Contribution Requests">
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ svg: { fontSize: 16, color: 'text.tertiary' } }}
                >
                    <Box width={36} height={36} display="flex" alignItems="center" justifyContent="center">
                        <FontAwesomeIcon
                            icon={faCodePullRequest}
                        />
                    </Box>
                    <Typography variant="caption" color="text.tertiary">
            0
                    </Typography>
                </Box>
            </Tooltip>
            <Tooltip title="Topics">
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ svg: { fontSize: 16, color: 'text.tertiary' } }}
                >
                    <Box width={36} height={36} display="flex" alignItems="center" justifyContent="center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                        />
                    </Box>
                    <Typography variant="caption" color="text.tertiary">
            0
                    </Typography>
                </Box>
            </Tooltip>
        </CardActions>
    );
}

NodeCardActions.propTypes = {
    node: PropTypes.object.isRequired,
};
