import Alert from '../../common/components/Alert';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import { setHeaderContent } from '../../features/app/appSlice';
import { P_XS_2_MD_4_SX } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { selectThread, selectThreadCommentIds } from '../../features/comments/comments.selectors';
import { showThread } from '../../features/comments/comments.thunks';
import { setCurrentThread } from '../../features/comments/commentsSlice';
import Comment from '../../features/comments/components/Comment';
import CommentEditor from '../../features/comments/components/CommentEditor';
import { NodecosmosDispatch } from '../../store';
import { UUID } from '../../types';
import { faMessageBot } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Show() {
    const { threadId } = useParams();
    const {
        originalId: rootId, branchId, nodeId,
    } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const thread = useSelector(selectThread(threadId as UUID));
    const mainThreadCommentIds = useSelector(selectThreadCommentIds(threadId as UUID));
    const commentCount = mainThreadCommentIds?.length;
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    if (!threadId) {
        throw new Error('Thread ID is required');
    }

    useEffect(() => {
        if (!rootId) return;

        if (fetched) {
            dispatch(setHeaderContent('ThreadShowHeader'));
        } else {
            dispatch(showThread({
                rootId,
                threadId,
                objectId: nodeId,
                branchId,
            })).then(() => setFetched());
        }

        return () => {
            if (fetched) {
                dispatch(setHeaderContent(''));
                dispatch(setCurrentThread(null));
            }
        };
    }, [branchId, dispatch, fetched, nodeId, rootId, setFetched, threadId, unsetFetched]);

    const threadPk = useMemo(() => ({
        branchId,
        objectId: nodeId,
        id: threadId,
    }), [branchId, nodeId, threadId]);

    if (fetched && !thread) {
        return <Box m={4}> <Typography variant="h5">Thread not found</Typography> </Box>;
    }

    if (!thread) {
        return <div />;
    }

    return (
        <Box my={4}>
            <Container>
                <Alert position="relative" mb={2} />
                <Typography variant="h5" color="text.secondary" mb={2} mx={2}>
                    <FontAwesomeIcon icon={faMessageBot} />
                    <Box component="span" ml={2}>{thread.title}</Box>
                </Typography>
                <Box
                    className="background-5"
                    component="div"
                    border={1}
                    borderColor="borders.3"
                    borderRadius={3}
                    p={P_XS_2_MD_4_SX}
                    boxSizing="border-box"
                >
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
                        threadPk={threadPk}
                        info="Add a comment to the main thread"
                    />
                </Box>
            </Container>
        </Box>
    );
}
