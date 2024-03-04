import CommentContent from './CommentContent';
import CommentHeader from './CommentHeader';
import { useCommentContextCreator } from '../hooks/useCommentContext';
import { Box } from '@mui/material';
import React from 'react';

interface CommentProps {
    id: string;
}

export default function Comment({ id }: CommentProps) {
    const {
        CommentContext,
        ctxValue,
    } = useCommentContextCreator(id);

    return (
        <CommentContext.Provider value={ctxValue}>
            <Box mt={1}>
                <CommentHeader />
                <Box p={1} pl="51px">
                    <CommentContent />
                </Box>
            </Box>
        </CommentContext.Provider>
    );
}
