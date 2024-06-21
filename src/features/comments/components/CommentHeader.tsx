import CommentOptions from './CommentOptions';
import NcAvatar from '../../../common/components/NcAvatar';
import { timeSince } from '../../../utils/localTime';
import { useCommentContext } from '../hooks/useCommentContext';
import {
    Box, Link, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function CommentHeader() {
    const { author, createdAt } = useCommentContext();

    return (
        <Box display="flex" alignItems="center" height={40}>
            <Link component={RouterLink} to={`/${author.username}`}>
                <NcAvatar
                    size={40}
                    name={author.name}
                    src={author.profileImageUrl} />
            </Link>
            <Box ml={2} width={1}>
                <Box display="flex" alignItems="center" width={1} justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        {/*<Link component={RouterLink} to={`/${author.username}`}>*/}
                        {/*    <Typography*/}
                        {/*        variant="body2"*/}
                        {/*        color="text.primary"*/}
                        {/*        fontWeight="bold"*/}
                        {/*        width={{*/}
                        {/*            xs: 'min-content',*/}
                        {/*            sm: 'auto',*/}
                        {/*        }}*/}
                        {/*        sx={{*/}
                        {/*            overflow: 'hidden',*/}
                        {/*            textOverflow: 'ellipsis',*/}
                        {/*        }}>*/}
                        {/*        {author.name}*/}
                        {/*    </Typography>*/}
                        {/*</Link>*/}
                        <Link
                            component={RouterLink}
                            to={`/${author.username}`}
                            sx={{ '&:hover p': { color: 'text.link' } }}
                        >
                            {author.username && (
                                <Typography variant="body2" color="text.primary" fontWeight="bold">
                                    {author.username}
                                </Typography>
                            )}
                        </Link>
                    </Box>
                    <Box mx={1}>
                        <CommentOptions />
                    </Box>
                </Box>
                <Typography variant="subtitle1" color="text.tertiary" mt={-0.75}>
                    {timeSince(createdAt)}
                </Typography>
            </Box>
        </Box>
    );
}
