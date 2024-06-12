import Comments from './comments/Comments';
import { ObjectType, UUID } from '../../../../../types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { selectMainObjectThreadByObjectId } from '../../../../comments/comments.selectors';
import { CommentObjectType, ThreadType } from '../../../../comments/comments.types';
import CommentEditor from '../../../../comments/components/CommentEditor';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function PaneComments() {
    const { branchId, nodeId } = useBranchContext();
    const { objectId, objectType } = usePaneContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, objectId));

    const threadType = useMemo(() => {
        switch (objectType) {
        case ObjectType.Node:
            return ThreadType.ContributionRequestNode;
        case ObjectType.Flow:
            return ThreadType.ContributionRequestFlow;
        case ObjectType.FlowStep:
            return ThreadType.ContributionRequestFlowStep;
        case ObjectType.Io:
            return ThreadType.ContributionRequestInputOutput;
        default:
            throw new Error(`Unsupported object type: ${objectType}`);
        }
    }, [objectType]);

    const mainThreadCommentEditor = React.useMemo(() => {
        if (threadId) {
            return (
                <CommentEditor
                    autoFocus={false}
                    threadPk={{
                        objectId: branchId,
                        threadId: objectId,
                    }}
                    info="Add a comment to the thread"
                />
            );
        }

        return (
            <CommentEditor
                autoFocus={false}
                newThread={{
                    title: 'CR Object Thread',
                    id: objectId,
                    objectId: branchId,
                    threadObjectId: objectId,
                    objectType: CommentObjectType.ContributionRequest,
                    objectNodeId: nodeId as UUID,
                    threadType,
                }}
                info="Start a conversation about this object"
            />
        );
    }, [branchId, nodeId, objectId, threadId, threadType]);

    return (
        <Box sx={{
            width: 1,
            p: 4,
        }}>
            <Box>
                <Container>
                    <Typography variant="h5" color="text.secondary">
                        <FontAwesomeIcon icon={faComments} />
                        <Box component="span" ml={2}>Conversation</Box>
                    </Typography>
                </Container>
                <Container sx={{
                    backgroundColor: 'background.1',
                    border: 1,
                    borderColor: 'borders.4',
                    borderRadius: 2,
                    p: 4,
                    mt: 4,
                }}>
                    <Comments />
                    {mainThreadCommentEditor}
                </Container>
            </Box>
        </Box>
    );
}
