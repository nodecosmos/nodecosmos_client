import { UUID } from '../../../types';
import { selectThreadCommentIds } from '../../comments/comments.selectors';
import Comment from '../../comments/components/Comment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestMainThreadComments() {
    const { branchId: id } = useParams();
    const mainThreadCommentIds = useSelector(selectThreadCommentIds(id as UUID));
    const commentCount = mainThreadCommentIds?.length;

    return mainThreadCommentIds?.map(
        (commentId, index) => {
            return (
                <Comment
                    key={commentId}
                    id={commentId}
                    isLast={commentCount === index + 1} />
            );
        },
    );
}
