import ContributionRequestMainThreadComments from './ContributionRequestMainThreadComments';
import { UUID } from '../../../types';
import { mainCrThread } from '../../comments/comments.selectors';
import { ObjectType, ThreadType } from '../../comments/comments.types';
import CommentEditor from '../../comments/components/CommentEditor';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestMainThread() {
    const { id: nodeId, contributionRequestId: id } = useParams();
    const mainThread = useSelector(mainCrThread(id as UUID));
    const mainThreadCreated = Boolean(mainThread);
    const mainThreadCommentEditor = React.useMemo(() => {
        if (mainThreadCreated) {
            return (
                <CommentEditor
                    autoFocus={false}
                    threadPk={{
                        objectId: id as UUID,
                        threadId: id as UUID,
                    }} />
            );
        }

        return (
            <CommentEditor
                autoFocus={false}
                newThread={{
                    id: id as UUID,
                    objectId: id as UUID,
                    objectType: ObjectType.ContributionRequest,
                    objectNodeId: nodeId as UUID,
                    threadType: ThreadType.ContributionRequestMainThread,
                }} />
        );
    }, [id, mainThreadCreated, nodeId]);

    return (
        <Box p={2} borderRadius={2} border={1} borderColor="borders.4" sx={{ backgroundColor: 'background.5' }}>
            <ContributionRequestMainThreadComments />
            {mainThreadCommentEditor}
        </Box>
    );
}
