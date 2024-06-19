import ContributionRequestMainThreadComments from './ContributionRequestMainThreadComments';
import { UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectThread } from '../../comments/comments.selectors';
import { ThreadObjectType, ThreadLocation } from '../../comments/comments.types';
import CommentEditor from '../../comments/components/CommentEditor';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ContributionRequestMainThread() {
    const { originalId: rootId, branchId } = useBranchContext();
    // main Cr Thread has same id as branchId
    const mainThread = useSelector(selectThread(branchId as UUID));
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
                info="Start a conversation about this contribution request"
            />
        );
    }, [branchId, mainThread, rootId]);

    return (
        <Box p={2} borderRadius={2} border={1} borderColor="borders.4" sx={{ backgroundColor: 'background.5' }}>
            <ContributionRequestMainThreadComments />
            {mainThreadCommentEditor}
        </Box>
    );
}
