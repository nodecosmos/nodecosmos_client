import Comments from './comments/Comments';
import { ObjectType } from '../../../../../types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { selectMainObjectThreadByObjectId } from '../../../../comments/comments.selectors';
import { ThreadObjectType, ThreadLocation } from '../../../../comments/comments.types';
import CommentEditor from '../../../../comments/components/CommentEditor';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { faComments } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const PANE_SX = {
    width: 1,
    p: {
        xs: 2,
        md: 4,
    },
};

const CONTAINER_SX = {
    backgroundColor: 'backgrounds.1',
    borderColor: 'borders.4',
    borderRadius: 2,
    p: {
        xs: 2,
        md: 4,
    },
};

export default function PaneComments() {
    const { originalId: rootId, branchId } = useBranchContext();
    const { objectId, objectType } = usePaneContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, objectId));

    const threadLocation = useMemo(() => {
        switch (objectType) {
        case ObjectType.Node:
            return ThreadLocation.ContributionRequestNode;
        case ObjectType.Flow:
            return ThreadLocation.ContributionRequestFlow;
        case ObjectType.FlowStep:
            return ThreadLocation.ContributionRequestFlowStep;
        case ObjectType.Io:
            return ThreadLocation.ContributionRequestInputOutput;
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
                        branchId,
                        objectId,
                        id: threadId,
                    }}
                    info="Add a comment to the thread"
                />
            );
        }

        return (
            <CommentEditor
                autoFocus={false}
                newThread={{
                    rootId,
                    title: 'CR Object Thread',
                    branchId,
                    objectId,
                    objectType: ThreadObjectType.ContributionRequest,
                    threadLocation,
                }}
                info="Start a conversation about this object"
            />
        );
    }, [branchId, objectId, rootId, threadId, threadLocation]);

    return (
        <Box sx={PANE_SX}>
            <Container>
                <Typography variant="h5" color="texts.secondary" mb={3}>
                    <Box component="span" color="tree.hashtag"><FontAwesomeIcon icon={faComments} /></Box>
                    <Box component="span" ml={2}>Comments</Box>
                </Typography>
            </Container>
            <Container sx={CONTAINER_SX}>
                <Comments />
                <Box mt={4}>
                    {mainThreadCommentEditor}
                </Box>
            </Container>
        </Box>
    );
}
