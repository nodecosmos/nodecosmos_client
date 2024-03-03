import CommentHeader from './CommentHeader';
import { selectComment } from '../comments.selectors';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface CommentProps {
    id: string;
}

export default function Comment({ id }: CommentProps) {
    const comment = useSelector(selectComment(id));

    return (
        <Box
            mt={1}
            border={1}
            borderColor="borders.1"
            maxWidth={MAX_COMMENT_WIDTH}
            borderRadius={1.5}>
            <CommentHeader id={id} />
            <Box p={1} pl="50px">
                {comment.content}
            </Box>
        </Box>
    );
}
