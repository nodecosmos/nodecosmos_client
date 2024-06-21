import ThreadComments from './thread/ThreadComments';
import ThreadHeader from './thread/ThreadHeader';
import { UUID } from '../../../types';
import { selectThreadCommentIds } from '../comments.selectors';
import { useThreadContextCreator } from '../hooks/thread/useThreadContext';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export interface CommentThreadProps {
    id: UUID;
    showLine?: boolean;
}

export default function CommentThread(props: CommentThreadProps) {
    const { id, showLine } = props;
    const commentIds = useSelector(selectThreadCommentIds(id));
    const commentCount = commentIds?.length || 0;
    const {
        ThreadContext,
        ctxValue,
    } = useThreadContextCreator({
        id,
        showLine,
    });

    if (commentCount === 0) {
        return null;
    }

    return (
        <ThreadContext.Provider value={ctxValue}>
            <Box
                borderRadius={2}
                border={1}
                borderColor="borders.4"
                p={2}
                sx={{ backgroundColor: 'background.1' }}
                boxSizing="border-box"
            >
                <Box p={2}>
                    <ThreadHeader />
                    <ThreadComments />
                </Box>
            </Box>
        </ThreadContext.Provider>
    );
}
