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
            <Box>
                <CommentHeader />
                {
                    // total width of avatar is 35 so marginLeft of 16 should align border in middle of the avatar as
                    // 16 + 3(border) + 16 = 35
                }
                <Box px={2} my={-0.5}>
                    <CommentContent isLast={isLast} />
                </Box>
            </Box>

        </CommentContext.Provider>
    );
}
