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
            <CommentHeader />
            {/* total width of avatar is 40 so 19.5 + 1px border-width + 19.5 = 40 */}
            <Box marginLeft="19.5px">
                <CommentContent isLast={isLast} />
            </Box>
        </CommentContext.Provider>
    );
}
