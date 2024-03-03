import Comment from './Comment';
import { UUID } from '../../../types';
import { selectThreadCommentIds } from '../comments.selectors';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface CommentThreadProps {
    id: UUID;
}

export default function CommentThread(props: CommentThreadProps) {
    const { id } = props;
    const commentIds = useSelector(selectThreadCommentIds(id));

    return (
        <Box
            border={1}
            borderColor="borders.4"
            p={1}
            sx={{ backgroundColor: 'background.1' }}
            boxSizing="border-box">
            {commentIds.map((commentId) => <Comment key={commentId} id={commentId} />)}
        </Box>
    );
}
