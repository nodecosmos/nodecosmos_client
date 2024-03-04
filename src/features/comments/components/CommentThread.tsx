import Comment from './Comment';
import CommentEditor from './CommentEditor';
import InsertCommentPlaceholder from './CommentInsertPlaceholder';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import { selectThread, selectThreadCommentIds } from '../comments.selectors';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface CommentThreadProps {
    id: UUID;
}

export default function CommentThread(props: CommentThreadProps) {
    const { id } = props;
    const thread = useSelector(selectThread(id));
    const commentIds = useSelector(selectThreadCommentIds(id));
    const [insertComment, setInsertComment, removeInsertComment] = useBooleanStateValue(false);

    const insertCommentBlock = insertComment ? <CommentEditor
        threadPk={
            {
                objectId: thread.objectId,
                threadId: thread.id,
            }
        }
        onClose={removeInsertComment} /> : <InsertCommentPlaceholder onClick={setInsertComment} />;

    return (
        <Box
            border={1}
            borderColor="borders.4"
            p={1}
            sx={{ backgroundColor: 'background.1' }}
            boxSizing="border-box">
            <Box
                overflow="hidden"
                maxWidth={MAX_COMMENT_WIDTH}
                border={1}
                borderRadius={1.5}
                borderColor="borders.4">
                {commentIds.map((commentId) => <Comment key={commentId} id={commentId} />)}
                {insertCommentBlock}
            </Box>
        </Box>
    );
}
