import useCommentInsertWidget from '../hooks/description/useCommentInsertWidget';
import useCommentThreadsWidget from '../hooks/description/useCommentThreadsWidget';
import { EditorView } from '@uiw/react-codemirror';
import React from 'react';

export const EMPTY_LINE_PLACEHOLDER = 'EMPTY_LINE_PLACEHOLDER';

interface DescriptionCommentsProps {
    view: EditorView;
}

function DescriptionComments({ view }: DescriptionCommentsProps) {
    const insertCommentPortal = useCommentInsertWidget(view);
    const commentThreadsPortal = useCommentThreadsWidget(view);

    return (
        <div>
            {insertCommentPortal}
            {commentThreadsPortal}
        </div>
    );
}

export default React.memo(DescriptionComments);
