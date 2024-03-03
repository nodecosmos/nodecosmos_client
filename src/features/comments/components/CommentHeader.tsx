import NcAvatar from '../../../common/components/NcAvatar';
import { UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { selectComment } from '../comments.selectors';
import {
    Box, CardHeader, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function CommentHeader({ id }: {id: UUID}) {
    const comment = useSelector(selectComment(id));

    return (
        <Box>
            <CardHeader
                sx={{
                    p: 1,
                    pr: 0,
                    mr: 0,
                    '& .MuiCardHeader-avatar': { mr: 0 },
                }}
                avatar={(
                    <Box display="flex" alignItems="center" zIndex={1} position="relative">
                        <Link component={RouterLink} to={`/${comment.author.username}`}>
                            <NcAvatar
                                width={35}
                                height={35}
                                name={comment.author.name}
                                src={comment.author.profileImageURL} />
                        </Link>
                        <Link component={RouterLink} to={`/${comment.author.username}`}>
                            <Typography variant="body2" color="text.primary" ml={1} fontWeight="bold">
                                {comment.author.name}
                            </Typography>
                        </Link>
                        <Link
                            component={RouterLink}
                            to={`/${comment.author.username}`}
                            sx={{ '&:hover p': { color: 'text.link' } }}
                        >
                            {comment.author.username && (
                                <Typography variant="body2" color="text.tertiary" ml={1}>
                                    @
                                    {comment.author.username}
                                </Typography>
                            )}
                        </Link>
                    </Box>
                )}
                subheader={(
                    <Box display="flex" alignItems="center">
                        <Box component="span" mx={1} fontSize={30}>
                            ·
                        </Box>
                        <Typography variant="body2" color="text.tertiary">
                            {' '}
                            {timeSince(comment.createdAt)}
                        </Typography>
                    </Box>
                )}
            />
        </Box>
    );
}
