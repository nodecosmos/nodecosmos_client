import ContributionRequestDescription from './ContributionRequestDescription';
import ContributionRequestMainThreadComments from './ContributionRequestMainThreadComments';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectThread } from '../../comments/comments.selectors';
import { ThreadObjectType, ThreadLocation } from '../../comments/comments.types';
import CommentEditor from '../../comments/components/CommentEditor';
import InsertCommentPlaceholder from '../../comments/components/CommentInsertPlaceholder';
import { faCodePullRequest, faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Divider, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const PADDING = {
    xs: 2,
    md: 4,
};

const DIVIDER_SX = {
    ml: 1,
    backgroundColor: 'borders.4',
    flexGrow: 1,
};

export default function ContributionRequestMainThread() {
    const { originalId: rootId, branchId } = useBranchContext();
    // main Cr Thread has same id as branchId
    const mainThread = useSelector(selectThread(branchId as UUID));
    const [insertComment, setInsertComment, removeInsertComment] = useBooleanStateValue(false);
    const mainThreadCommentEditor = React.useMemo(() => {
        if (mainThread) {
            return (
                <CommentEditor
                    autoFocus={false}
                    threadPk={{
                        branchId,
                        objectId: branchId,
                        id: branchId,
                    }}
                    onClose={removeInsertComment}
                    info="Add a comment to the main thread"
                />
            );
        }

        return (
            <CommentEditor
                autoFocus={false}
                newThread={{
                    rootId,
                    title: 'Contribution Request Thread',
                    branchId,
                    objectId: branchId,
                    objectType: ThreadObjectType.ContributionRequest,
                    threadLocation: ThreadLocation.ContributionRequestMainThread,
                }}
                onClose={removeInsertComment}
                info="Start a conversation about this contribution request"
            />
        );
    }, [branchId, mainThread, removeInsertComment, rootId]);

    return (
        <Box
            className="background-6"
            p={PADDING}
            borderRadius={2}
            borderColor="borders.4"
        >
            <Box display="flex" alignItems="center">
                <Typography color="texts.secondary" variant="body1" fontWeight="bold">
                    <Box component="span" color="texts.tertiary">
                        <FontAwesomeIcon icon={faCodePullRequest} />
                    </Box>
                    <Box component="span" ml={1}>
                       Description
                    </Box>
                </Typography>
                <Divider sx={DIVIDER_SX} />
            </Box>
            <ContributionRequestDescription />
            <Box display="flex" alignItems="center" mb={4}>
                <Typography color="texts.secondary" variant="body1" fontWeight="bold">
                    <Box component="span" color="texts.tertiary">
                        <FontAwesomeIcon icon={faComments} />
                    </Box>
                    <Box component="span" ml={1}>
                    Comments
                    </Box>
                </Typography>
                <Divider sx={DIVIDER_SX} />
            </Box>
            <ContributionRequestMainThreadComments />
            <Box mt={2} borderRadius={1.25} className="overflow-hidden">
                {
                    insertComment ? mainThreadCommentEditor
                        : (
                            <InsertCommentPlaceholder onClick={setInsertComment} title={null}>
                                Add a comment
                            </InsertCommentPlaceholder>
                        )
                }
            </Box>
        </Box>
    );
}
