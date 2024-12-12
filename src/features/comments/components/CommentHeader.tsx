import CommentOptions from './CommentOptions';
import NcAvatar from '../../../common/components/NcAvatar';
import { timeSince } from '../../../utils/localTime';
import { DISPLAY_MD_FLEX_SX, DISPLAY_XS_SX } from '../../app/constants';
import { useCommentContext } from '../hooks/useCommentContext';
import {
    Box, Chip, Link, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function CommentHeader() {
    const {
        author, createdAt, isEdited, isAuthor,
    } = useCommentContext();

    return (
        <Box display="flex" alignItems="center" height={35}>
            <Link component={RouterLink} to={`/${author.username}`}>
                <NcAvatar
                    size={35}
                    name={author.name}
                    src={author.profileImageUrl} />
            </Link>
            <Box ml={2} width={1} height={35}>
                <Box display="flex" alignItems="center" width={1} justifyContent="space-between">
                    <Box display={DISPLAY_MD_FLEX_SX} alignItems="center">
                        <Box>
                            <Link component={RouterLink} to={`/${author.username}`}>
                                <Typography
                                    className="overflow-hidden ellipsis"
                                    variant="body1"
                                    color="texts.primary"
                                    fontWeight="bold">
                                    {author.username}
                                </Typography>
                            </Link>
                        </Box>
                        <Typography variant="subtitle1" color="texts.tertiary" ml={1}>
                            {timeSince(createdAt)}
                        </Typography>
                        {
                            isEdited
                            && <Chip
                                color="buttonContrast"
                                variant="outlined"
                                className="ToolbarChip ml-1"
                                size="small"
                                label="edited"
                            />
                        }
                    </Box>
                    <Box display={DISPLAY_XS_SX}>
                        <Link component={RouterLink} to={`/${author.username}`}>
                            {author.username && (
                                <Typography variant="body2" color="texts.primary" fontWeight="bold">
                                    {author.username}
                                </Typography>
                            )}
                        </Link>
                    </Box>
                    {
                        isAuthor && (
                            <Box mx={1}>
                                <CommentOptions />
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    );
}
