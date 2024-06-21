import CommentEditor from './CommentEditor';
import { useCommentCommands, useCommentContext } from '../hooks/useCommentContext';
import { Box, Chip } from '@mui/material';
import React, { useMemo } from 'react';

interface CommentContentProps {
    isLast?: boolean;
}
export default function CommentContent({ isLast }: CommentContentProps) {
    const {
        objectId, threadId, id, content, editorOpen, branchId, isEdited,
    } = useCommentContext();
    const { closeEditor } = useCommentCommands();
    const comment = useMemo(() => ({
        branchId,
        objectId,
        threadId,
        id,
        content,
    }), [branchId, content, id, objectId, threadId]);

    const commentContent = editorOpen
        ? <CommentEditor
            comment={comment}
            onClose={closeEditor}
        />
        : (
            <div>
                {
                    isEdited
                    && <Chip
                        color="secondary"
                        variant="outlined"
                        sx={{
                            float: 'right',
                            mr: 2,
                            mt: 2,
                        }}
                        className="ToolbarChip"
                        size="small"
                        label="Edited"
                    />
                }
                {/*@ts-expect-error backgroundColor is valid prop*/}
                <Box
                    p={2}
                    backgroundColor="background.5"
                    borderRadius={3}
                    className="DescriptionHTML"
                    dangerouslySetInnerHTML={{ __html: content as TrustedHTML }} />
            </div>
        );

    return (
        <Box
            py={2}
            px={{
                xs: 2,
                md: 4,
            }}
            borderLeft={isLast ? 0 : 3}
            borderColor="borders.3">
            {commentContent}
        </Box>
    );
}
