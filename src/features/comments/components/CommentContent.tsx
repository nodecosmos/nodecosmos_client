import CommentEditor from './CommentEditor';
import useCommentCommands from '../hooks/useCommentCommands';
import { useCommentContext } from '../hooks/useCommentContext';
import { Box } from '@mui/material';
import React from 'react';

export default function CommentContent() {
    const {
        objectId, threadId, id, content, editorOpen,
    } = useCommentContext();
    const { closeEditor } = useCommentCommands();

    const commentContent = editorOpen
        ? <CommentEditor
            comment={{
                objectId,
                threadId,
                id,
                content,
            }}
            onClose={closeEditor}
        />
        : <div className="DescriptionHTML" dangerouslySetInnerHTML={{ __html: content as TrustedHTML }} />;

    return (
        <Box p={1} pl="51px">
            {commentContent}
        </Box>
    );
}
