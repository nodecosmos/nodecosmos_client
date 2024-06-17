import CommentEditor from './CommentEditor';
import { useCommentCommands, useCommentContext } from '../hooks/useCommentContext';
import { Box } from '@mui/material';
import React from 'react';

interface CommentContentProps {
    isLast?: boolean;
}
export default function CommentContent({ isLast }: CommentContentProps) {
    const {
        objectId, threadId, id, content, editorOpen, branchId,
    } = useCommentContext();
    const { closeEditor } = useCommentCommands();

    const commentContent = editorOpen
        ? <CommentEditor
            comment={{
                branchId,
                objectId,
                threadId,
                id,
                content,
            }}
            onClose={closeEditor}
        />
        : <div className="DescriptionHTML" dangerouslySetInnerHTML={{ __html: content as TrustedHTML }} />;

    return (
        <Box
            py={5}
            px="26px"
            mt={-4}
            mb={isLast ? 0 : -5}
            borderLeft={isLast ? 0 : 3}
            borderColor="borders.3">
            {commentContent}
        </Box>
    );
}
