import Comment from './Comment';
import CommentReply from './CommentReply';
import { UUID } from '../../../types';
import { selectThreadCommentIds } from '../comments.selectors';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export interface CommentThreadProps {
    id: UUID;
}

export default function CommentThread(props: CommentThreadProps) {
    const { id } = props;
    const commentIds = useSelector(selectThreadCommentIds(id));
    const commentCount = commentIds.length;

    return (
        <Box
            border={1}
            borderColor="borders.4"
            p={1}
            sx={{ backgroundColor: 'background.1' }}
            boxSizing="border-box">
            <Box
                overflow="hidden"
                maxWidth={MAX_COMMENT_WIDTH}
                border={1}
                borderRadius={1.5}
                borderColor="borders.4">
                {
                    commentIds.map((commentId, index) => <Comment
                        key={commentId}
                        id={commentId}
                        isLast={commentCount === index + 1} />)
                }
                <CommentReply id={id} />
            </Box>
        </Box>
    );
}
