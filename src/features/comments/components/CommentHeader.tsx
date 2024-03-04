import CommentOptions from './CommentOptions';
import NcAvatar from '../../../common/components/NcAvatar';
import { timeSince } from '../../../utils/localTime';
import { useCommentContext } from '../hooks/useCommentContext';
import {
    Box, CardHeader, Chip, Link, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function CommentHeader() {
    const {
        author, createdAt, isEdited,
    } = useCommentContext();

    return (
        <CardHeader
            sx={{
                p: 1,
                pr: 0,
                mr: 0,
                '& .MuiCardHeader-avatar': { mr: 0 },
            }}
            avatar={(
                <Box display="flex" alignItems="center" zIndex={1} position="relative">
                    <Link component={RouterLink} to={`/${author.username}`}>
                        <NcAvatar
                            width={35}
                            height={35}
                            name={author.name}
                            src={author.profileImageURL} />
                    </Link>
                    <Link component={RouterLink} to={`/${author.username}`}>
                        <Typography variant="body2" color="text.primary" ml={1} fontWeight="bold">
                            {author.name}
                        </Typography>
                    </Link>
                </Box>
            )}
            subheader={(
                <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
                    <Box display="flex" alignItems="center">
                        <Link
                            component={RouterLink}
                            to={`/${author.username}`}
                            sx={{ '&:hover p': { color: 'text.link' } }}
                        >
                            {author.username && (
                                <Typography variant="body2" color="text.tertiary" ml={1}>
                                    @
                                    {author.username}
                                </Typography>
                            )}
                        </Link>
                        <Box component="span" mx={1} fontSize={30}>
                            ·
                        </Box>
                        <Typography variant="body2" color="text.tertiary">
                            {timeSince(createdAt)}
                        </Typography>
                        {
                            isEdited
                            && <Chip
                                color="secondary"
                                variant="outlined"
                                sx={{ ml: 1 }}
                                className="ToolbarChip"
                                size="small"
                                label="Edited"
                            />
                        }
                    </Box>

                    <CommentOptions />
                </Box>
            )}
        />
    );
}
