import { selectBranchThreadIds } from '../../../../features/comments/comments.selectors';
import CommentThread from '../../../../features/comments/components/CommentThread';
import { UUID } from '../../../../types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Activity() {
    const { branchId: id } = useParams();
    const threadIds = useSelector(selectBranchThreadIds(id as UUID));
    // We have main thread and activity threads. Main thread is the thread is where id is equal to cr.id.
    const activityThreadIds = threadIds && threadIds.filter(threadId => threadId !== id);

    return (
        <div>
            <Box mb={2}>
                {
                    activityThreadIds && activityThreadIds.map((threadId) => (
                        <Box mt={2} key={threadId} p={0}>
                            <CommentThread id={threadId} showLine />
                        </Box>
                    ))
                }
                {
                    (!threadIds || activityThreadIds.length === 0) && (
                        <Box mt={4} p={0}>
                            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                                No activity
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </div>

    );
}
