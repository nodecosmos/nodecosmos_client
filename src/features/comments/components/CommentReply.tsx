import CommentEditor from './CommentEditor';
import InsertCommentPlaceholder from './CommentInsertPlaceholder';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import { selectThread } from '../comments.selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function CommentReply({ threadId }: { threadId: UUID }) {
    const thread = useSelector(selectThread(threadId));
    const [insertComment, setInsertComment, removeInsertComment] = useBooleanStateValue(false);
    const threadPk = useMemo(() => ({
        branchId: thread.branchId,
        objectId: thread.objectId,
        id: threadId,
    }), [threadId, thread.branchId, thread.objectId]);

    return insertComment ? <CommentEditor
        withThreadBlock
        threadPk={threadPk}
        onClose={removeInsertComment} /> : <InsertCommentPlaceholder onClick={setInsertComment} />;
}
