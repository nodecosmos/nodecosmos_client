import CommentEditor from './CommentEditor';
import InsertCommentPlaceholder from './CommentInsertPlaceholder';
import { CommentThreadProps } from './CommentThread';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { selectThread } from '../comments.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CommentReply({ id }: CommentThreadProps) {
    const thread = useSelector(selectThread(id));
    const [insertComment, setInsertComment, removeInsertComment] = useBooleanStateValue(false);

    return insertComment ? <CommentEditor
        threadPk={
            {
                objectId: thread.objectId,
                threadId: thread.id,
            }
        }
        onClose={removeInsertComment} /> : <InsertCommentPlaceholder onClick={setInsertComment} />;
}
