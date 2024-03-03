import CommentHeader from './CommentHeader';
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
            <CommentHeader id={id} />
            <Box p={1} pl="51px">
                <div
                    className="DescriptionHTML"
                    dangerouslySetInnerHTML={{ __html: comment.content as TrustedHTML }} />
            </Box>
        </Box>
    );
}
