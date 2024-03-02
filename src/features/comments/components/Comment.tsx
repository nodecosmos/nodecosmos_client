import { selectComment } from '../comments.selectors';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface CommentProps {
    id: string;
}

export default function Comment({ id }: CommentProps) {
    const comment = useSelector(selectComment(id));

    return (
        <Box mt={1}>
            {comment.content}
        </Box>
    );
}
