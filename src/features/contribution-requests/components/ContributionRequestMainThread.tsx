import ContributionRequestMainThreadComments from './ContributionRequestMainThreadComments';
import { UUID } from '../../../types';
import { selectThread } from '../../comments/comments.selectors';
import { CommentObjectType, ThreadType } from '../../comments/comments.types';
import CommentEditor from '../../comments/components/CommentEditor';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestMainThread() {
    const { id: nodeId, branchId: id } = useParams();
    const mainThread = useSelector(selectThread(id as UUID));
    const mainThreadCommentEditor = React.useMemo(() => {
        if (mainThread) {
            return (
                <CommentEditor
                    autoFocus={false}
                    threadPk={{
                        objectId: id as UUID,
                        threadId: id as UUID,
                    }}
                    info="Add a comment to the main thread"
                />
            );
        }

        return (
            <CommentEditor
                autoFocus={false}
                newThread={{
                    title: 'Contribution Request Thread',
                    id: id as UUID,
                    objectId: id as UUID,
                    objectType: CommentObjectType.ContributionRequest,
                    objectNodeId: nodeId as UUID,
                    threadType: ThreadType.ContributionRequestMainThread,
                }}
                info="Start a conversation about this contribution request"
            />
        );
    }, [id, mainThread, nodeId]);

    return (
        <Box p={2} borderRadius={2} border={1} borderColor="borders.4" sx={{ backgroundColor: 'background.5' }}>
            <ContributionRequestMainThreadComments />
            {mainThreadCommentEditor}
        </Box>
    );
}
