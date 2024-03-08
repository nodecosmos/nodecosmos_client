import CommentContent from './CommentContent';
import CommentHeader from './CommentHeader';
import { useCommentContextCreator } from '../hooks/useCommentContext';
import { Box } from '@mui/material';
import React from 'react';

interface CommentProps {
    id: string;
    isLast?: boolean;
}

export default function Comment({ id, isLast }: CommentProps) {
    const {
        CommentContext,
        ctxValue,
    } = useCommentContextCreator(id);

    return (
        <CommentContext.Provider value={ctxValue}>
            <Box m={1}>
                <CommentHeader />
                <Box pl="24px">
                    <CommentContent isLast={isLast} />
                </Box>
            </Box>
        </CommentContext.Provider>
    );
}
