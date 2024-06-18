import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { selectThread, selectThreadCommentIds } from '../../features/comments/comments.selectors';
import Comment from '../../features/comments/components/Comment';
import CommentEditor from '../../features/comments/components/CommentEditor';
import { UUID } from '../../types';
import { faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Show() {
    const { branchId, nodeId } = useBranchContext();
    const { threadId } = useParams();
    const thread = useSelector(selectThread(threadId as UUID));
    const mainThreadCommentIds = useSelector(selectThreadCommentIds(threadId as UUID));
    const commentCount = mainThreadCommentIds?.length;

    if (!threadId) {
        throw new Error('Thread ID is required');
    }

    return (
        <Box m={4}>
            <Container>
                <Typography variant="h5" color="text.secondary" mb={2} mx={2}>
                    <FontAwesomeIcon icon={faComments} />
                    <Box component="span" ml={2}>{thread.title}</Box>
                </Typography>
                <Box
                    border={1}
                    borderColor="borders.3"
                    borderRadius={4}
                    p={2}
                    backgroundColor="background.1"
                    boxSizing="border-box">
                    {
                        mainThreadCommentIds?.map(
                            (commentId, index) => {
                                return (
                                    <Comment
                                        key={commentId}
                                        id={commentId}
                                        isLast={commentCount === index + 1} />
                                );
                            },
                        )
                    }
                    <CommentEditor
                        autoFocus={false}
                        threadPk={{
                            branchId,
                            objectId: nodeId,
                            id: threadId,
                        }}
                        info="Add a comment to the main thread"
                    />
                </Box>
            </Container>
        </Box>
    );
}
