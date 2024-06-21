import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import { selectMainObjectThreadByObjectId, selectThreadCommentIds } from '../../../../../comments/comments.selectors';
import Comment from '../../../../../comments/components/Comment';
import { usePaneContext } from '../../../../hooks/pane/usePaneContext';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Comments() {
    const { branchId } = useBranchContext();
    const { objectId } = usePaneContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, objectId));
    const mainThreadCommentIds = useSelector(selectThreadCommentIds(threadId));

    return mainThreadCommentIds?.map(
        (commentId, index) => {
            return (
                <Comment
                    key={commentId}
                    id={commentId}
                    isLast={mainThreadCommentIds?.length === index + 1} />
            );
        },
    );
}
