import CommentEditor from './CommentEditor';
import { useCommentCommands, useCommentContext } from '../hooks/useCommentContext';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface CommentContentProps {
    isLast?: boolean;
}
export default function CommentContent({ isLast }: CommentContentProps) {
    const {
        objectId, threadId, id, content, editorOpen, branchId,
    } = useCommentContext();
    const { closeEditor } = useCommentCommands();
    const comment = useMemo(() => ({
        branchId,
        objectId,
        threadId,
        id,
        content,
    }), [branchId, content, id, objectId, threadId]);

    const innerHTML = useMemo(() => ({ __html: content as TrustedHTML }), [content]);

    const commentContent = editorOpen
        ? <CommentEditor
            comment={comment}
            onClose={closeEditor}
        />
        : (
            <div>
                <Box
                    fontSize="1.05rem"
                    borderRadius={2}
                    className="DescriptionHTML"
                    fontWeight={500}
                    maxWidth={780}
                    dangerouslySetInnerHTML={innerHTML} />
            </div>
        );

    return (
        <Box
            minHeight={60}
            pl={4.25}
            py={2}
            pr={0}
            borderLeft={isLast ? 0 : 3}
            borderColor="borders.3"
        >
            {commentContent}
        </Box>
    );
}
