import { selectObjectThreadIds } from '../../../../features/comments/comments.selectors';
import CommentThread from '../../../../features/comments/components/CommentThread';
import { UUID } from '../../../../types';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Activity() {
    const { branchId: id } = useParams();
    const threadIds = useSelector(selectObjectThreadIds(id as UUID));

    return (
        <div>
            <Box mb={2}>
                {
                    threadIds && threadIds.filter(threadId => threadId !== id).map((threadId) => (
                        <Box mt={2} key={threadId} p={0}>
                            <CommentThread id={threadId} showLine />
                        </Box>
                    ))
                }
            </Box>
        </div>

    );
}
